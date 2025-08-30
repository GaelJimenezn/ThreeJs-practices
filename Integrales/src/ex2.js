import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function f(x, y) {
    return Math.sin(x) * Math.cos(y) + 2;
}

function calcularIntegral(a, b, c, d, nx = 40, ny = 40) {
    const dx = (b - a) / nx;
    const dy = (d - c) / ny;
    let suma = 0;
    for (let i = 0; i <= nx; i++) {
        const x = a + i * dx;
        for (let j = 0; j <= ny; j++) {
            const y = c + j * dy;
            suma += f(x, y) * dx * dy;
        }
    }
    return suma;
}

export function initEx2(renderer, aspect) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    const camera = new THREE.PerspectiveCamera(
        60,
        aspect,
        0.1,
        100
    );
    camera.position.set(0, 5, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI - 0.1;

    const width = 5, height = 5, seg = 50;
    const geometry = new THREE.PlaneGeometry(width, height, seg, seg);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    const colors = [];
    let minZ = Infinity, maxZ = -Infinity;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) - width / 2;
        const y = pos.getZ(i) - height / 2;
        const z = f(x, y);
        pos.setY(i, z);
        minZ = Math.min(minZ, z);
        maxZ = Math.max(maxZ, z);
    }
    for (let i = 0; i < pos.count; i++) {
        const z = pos.getY(i);
        const t = (z - minZ) / (maxZ - minZ);
        colors.push(t, 0.2, 1 - t);
    }
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);

    const valor = calcularIntegral(-2.5, 2.5, -2.5, 2.5).toFixed(4);

    return { scene, camera, controls, value: valor };
}
