import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Parámetros de integración
const a = 0;
const b = 2;
const steps = 100;
const dx = (b - a) / steps;

// Función f(x)
function f(x) {
    return Math.sin(x) + 1.5;
}

// Derivada f'(x) (numérica)
function df(x) {
    const h = 1e-5;
    return (f(x + h) - f(x - h)) / (2 * h);
}

// Cálculo numérico de la integral de superficie
function calcularSuperficie() {
    let suma = 0;
    for (let i = 0; i < steps; i++) {
        const x = a + i * dx;
        const fx = f(x);
        const dfx = df(x);
        suma += fx * Math.sqrt(1 + dfx ** 2) * dx;
    }
    return 2 * Math.PI * suma;
}

export function initEx1(renderer, aspect) {
    // Crear vértices de perfil 2D
    const points = [];
    for (let i = 0; i <= steps; i++) {
        const x = a + i * dx;
        points.push(new THREE.Vector2(f(x), x));
    }

    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeaeaea); // Fondo claro

    // Cámara
    const camera = new THREE.PerspectiveCamera(
        60, aspect, 0.1, 100
    );
    camera.position.set(4, 3, 10);

    // Controles orbitales
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    // Geometría y material (azul fuerte, sin gradiente)
    const geometry = new THREE.LatheGeometry(points, 200);
    const material = new THREE.MeshStandardMaterial({
        color: 0x0044cc,         // Azul fuerte
        metalness: 0.2,
        roughness: 0.3,
        side: THREE.DoubleSide   // Color visible por dentro y fuera
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Luz direccional principal
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Luz ambiental suave
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Piso claro
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0xf5f5f5 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Calcular área
    const valor = calcularSuperficie().toFixed(6);

    return { scene, camera, controls, value: valor };
}
