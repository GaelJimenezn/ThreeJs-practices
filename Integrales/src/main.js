import * as THREE from "three";
import { initEx1 } from "./ex1.js";
import { initEx2 } from "./ex2.js";
import { initEx3 } from "./ex3.js";

let renderer, scene, camera, controls, currentAnimation;

const ejercicios = [
  {
    title: "Ejercicio 1: Superficie de Revolución",
    desc: "Visualiza la superficie generada al girar la curva f(x) = sin(x)+2 en el intervalo [0, π] alrededor del eje y.",
    formula: "Área = 2π ∫₀^π f(x)·√(1+f'(x)²) dx",
    prop: "Propiedad: Área superficial de revolución"
  },
  {
    title: "Ejercicio 2: Integral Doble (Volumen)",
    desc: "Visualiza la gráfica z = sin(x)·cos(y)+2 y calcula el volumen bajo la superficie en x∈[-2.5,2.5], y∈[-2.5,2.5].",
    formula: "Volumen = ∬ f(x,y) dx dy",
    prop: "Propiedad: Volumen bajo la superficie"
  },
  {
    title: "Ejercicio 3: Campo Vectorial",
    desc: "Visualiza el campo F(x, y, z) = (yz, xz, xy) y la integral de línea a lo largo de una trayectoria.",
    formula: "∫ₙ F · dr",
    prop: "Propiedad: Integral de línea en campo 3D"
  }
];

// 🟦 Utilidad: obtener tamaño real del canvas
function getViewerSize() {
  const container = document.getElementById("viewer");
  const style = getComputedStyle(container);
  const width = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  const height = container.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
  return { width, height };
}

function setInfo(idx, valor = "") {
  document.getElementById("info-title").textContent = ejercicios[idx].title;
  document.getElementById("info-desc").textContent = ejercicios[idx].desc;
  document.getElementById("info-formula").textContent = ejercicios[idx].formula;
  document.getElementById("info-value").textContent = valor;
  document.getElementById("info-prop").textContent = ejercicios[idx].prop;
}

function initRenderer() {
  const canvas = document.querySelector("#app");
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const { width, height } = getViewerSize();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
}

function resetScene() {
  if (currentAnimation) cancelAnimationFrame(currentAnimation);
  if (scene) while (scene.children.length) scene.remove(scene.children[0]);
}

function startExercise(initFunc, idx) {
  resetScene();

  // Calcula el tamaño para la cámara
  const { width, height } = getViewerSize();
  // Llama al ejercicio pasándole el aspecto
  const { scene: s, camera: c, controls: ctrls, value } = initFunc(renderer, width / height);
  scene = s; camera = c; controls = ctrls;

  setInfo(idx, value ? `Valor: ${value}` : "");

  function animate() {
    currentAnimation = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

// Botones
document.getElementById("btn1").addEventListener("click", () => startExercise(initEx1, 0));
document.getElementById("btn2").addEventListener("click", () => startExercise(initEx2, 1));
document.getElementById("btn3").addEventListener("click", () => startExercise(initEx3, 2));

// Resize real y dinámico
window.addEventListener("resize", () => {
  if (!camera || !renderer) return;
  const { width, height } = getViewerSize();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

initRenderer();
startExercise(initEx1, 0);
