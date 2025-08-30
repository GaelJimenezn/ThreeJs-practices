import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Campo vectorial F(x, y, z) = (yz, xz, xy)
function F(x, y, z) {
  return new THREE.Vector3(y * z, x * z, x * y);
}

// Trazo de trayectoria desde punto semilla
function trazarTrayectoria(semilla, pasos, h) {
  const puntos = [semilla.clone()];
  let p = semilla.clone();
  for (let i = 0; i < pasos; i++) {
    const v = F(p.x, p.y, p.z);
    v.normalize().multiplyScalar(h);
    p = p.clone().add(v);
    puntos.push(p.clone());
  }
  return puntos;
}

// Calcular integral de línea sobre trayectoria
function calcularIntegralLinea(puntos) {
  let suma = 0;
  for (let i = 0; i < puntos.length - 1; i++) {
    const p1 = puntos[i];
    const p2 = puntos[i + 1];
    const delta = new THREE.Vector3().subVectors(p2, p1);
    const Fp = F(p1.x, p1.y, p1.z);
    suma += Fp.dot(delta); // F · dr
  }
  return suma;
}

export function initEx3(renderer, aspect) {
  // Escena
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Cámara
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
  camera.position.set(5, 5, 5);

  // Render: manejado por main.js, aquí no se toca

  // Control orbital
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;

  // Dibujar flechas en una grilla 3D
  const gridMin = -1.5, gridMax = 1.5, step = 1.0;
  for (let x = gridMin; x <= gridMax; x += step) {
    for (let y = gridMin; y <= gridMax; y += step) {
      for (let z = gridMin; z <= gridMax; z += step) {
        const origen = new THREE.Vector3(x, y, z);
        const vector = F(x, y, z).normalize().multiplyScalar(0.4);
        const arrow = new THREE.ArrowHelper(vector.clone().normalize(), origen, vector.length(), 0x0044cc);
        scene.add(arrow);
      }
    }
  }

  // Trazo de trayectoria desde punto semilla
  const semilla = new THREE.Vector3(0.5, 0.5, 0.5);
  const puntos = trazarTrayectoria(semilla, 100, 0.05);

  // Dibujar línea
  const geometry = new THREE.BufferGeometry().setFromPoints(puntos);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const linea = new THREE.Line(geometry, material);
  scene.add(linea);

  // Calcular integral de línea
  const integral = calcularIntegralLinea(puntos);

  // Luces
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 10, 7);
  scene.add(light);

  // ¡Devolver el valor de la integral!
  return { scene, camera, controls, value: integral.toFixed(6) };
}
