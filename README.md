# Three.js Practices

[English](#english) | [Español](#español)

## English

### Overview

Practice repository focused on **Three.js, WebGL-based 3D rendering, and mathematical visualization**. The main documented exercise is a small interactive 3D integral visualizer implemented with JavaScript, Three.js, and Vite.

This repository is primarily a learning/practice project rather than a production application.

### Project Focus

The `Integrales` project connects mathematical concepts with interactive 3D rendering:

- Surface of revolution and numerical surface-area calculation.
- Double integral visualization as a 3D surface and numerical volume approximation.
- 3D vector-field visualization and numerical line integration along a generated trajectory.
- Interactive camera control using `OrbitControls`.
- Dynamic rendering and viewport resizing through a shared Three.js renderer.

### Technical Implementation

The `Integrales/src` directory separates the three exercises into individual modules:

- `main.js` — creates the WebGL renderer, manages the active exercise, animation loop, UI information, and resize handling.
- `ex1.js` — generates a surface of revolution with `THREE.LatheGeometry` and approximates its surface area using numerical integration and a numerical derivative.
- `ex2.js` — builds a subdivided plane, deforms its vertices according to `f(x,y)`, assigns vertex colors from the resulting height, and approximates the double integral numerically.
- `ex3.js` — visualizes the vector field `F(x,y,z) = (yz, xz, xy)`, generates a trajectory from a seed point, and evaluates a line integral using `F · dr`.

The HTML interface provides buttons for switching between the three exercises and displays the corresponding formula and calculated value. fileciteturn6file0 fileciteturn10file0

### Technologies

- JavaScript (ES Modules)
- Three.js `0.178.0` (package dependency)
- Vite `7.0.4`
- WebGL through Three.js
- HTML5 / CSS3

The `Integrales` project is configured with Vite scripts for development, production build, and preview. fileciteturn2file0

### Project Structure

```text
ThreeJs-practices/
├── Integrales/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── ex1.js
│       ├── ex2.js
│       ├── ex3.js
│       ├── main.js
│       └── style.css
├── assets/
│   ├── Grenade.glb
│   └── background.jpg
└── threejs-demo/
    ├── package.json
    ├── public/
    └── src/
```

The repository also contains a separate `threejs-demo` directory and shared assets. Its current contents do not form a complete Three.js implementation, so it is intentionally not presented as a finished feature of the project.

### Key Technical Concepts

- Three.js scene, camera, renderer, geometry, materials, lights, and meshes.
- `OrbitControls` for interactive 3D navigation.
- `LatheGeometry` for procedural surface generation.
- Direct manipulation of `BufferGeometry` vertex positions and vertex colors.
- Numerical integration using discrete steps.
- Numerical derivative using a central-difference approximation.
- Vector-field representation with `ArrowHelper`.
- Line-integral approximation along a generated 3D trajectory.
- Modular exercise initialization through `initEx1`, `initEx2`, and `initEx3`. fileciteturn3file0 fileciteturn4file0 fileciteturn5file0

### Running the Main Exercise

```bash
cd Integrales
npm install
npm run dev
```

Then open the local URL provided by Vite.

For a production build:

```bash
npm run build
npm run preview
```

### Notes

- This repository should be considered **practice/study work**, not a production-ready 3D application.
- The strongest portfolio-relevant part is `Integrales`, because it demonstrates the combination of mathematical computation, modular JavaScript, and interactive 3D rendering.
- The current `Integrales/index.html` uses an import map pointing to Three.js `0.158.0`, while `package.json` declares `0.178.0`. This version mismatch should be cleaned up if the project is maintained further. fileciteturn10file0 fileciteturn2file0

---

## Español

### Descripción

Repositorio de prácticas enfocado en **Three.js, renderizado 3D basado en WebGL y visualización matemática**. La parte principal del repositorio es un visualizador interactivo de integrales 3D desarrollado con JavaScript, Three.js y Vite.

Es un proyecto de aprendizaje/práctica y no una aplicación de producción.

### Enfoque

El proyecto `Integrales` combina conceptos matemáticos con renderizado 3D interactivo:

- Superficie de revolución y cálculo numérico de área superficial.
- Visualización de una integral doble mediante una superficie 3D y aproximación numérica del volumen.
- Visualización de un campo vectorial 3D y cálculo numérico de una integral de línea sobre una trayectoria generada.
- Control interactivo de cámara mediante `OrbitControls`.
- Renderizado dinámico y actualización del viewport mediante un renderer compartido de Three.js.

### Implementación técnica

Los tres ejercicios están separados en módulos dentro de `Integrales/src`:

- `main.js` — administra el renderer WebGL, el ejercicio activo, el ciclo de animación, la información de la interfaz y el redimensionamiento.
- `ex1.js` — genera una superficie de revolución con `THREE.LatheGeometry` y aproxima su área mediante integración numérica y una derivada numérica.
- `ex2.js` — construye un plano subdividido, modifica sus vértices según `f(x,y)`, asigna colores por vértice según la altura y aproxima la integral doble numéricamente.
- `ex3.js` — representa el campo vectorial `F(x,y,z) = (yz, xz, xy)`, genera una trayectoria desde un punto semilla y calcula una aproximación de la integral de línea mediante `F · dr`.

La interfaz HTML permite cambiar entre los tres ejercicios y muestra la fórmula y el valor calculado correspondiente. fileciteturn6file0 fileciteturn10file0

### Tecnologías

- JavaScript (ES Modules)
- Three.js `0.178.0` (dependencia del proyecto)
- Vite `7.0.4`
- WebGL mediante Three.js
- HTML5 / CSS3

### Estado

Proyecto de práctica. La parte más relevante para el portafolio es `Integrales`, mientras que `threejs-demo` se mantiene como contenido experimental/incompleto y no se presenta como una aplicación Three.js terminada.

### Ejecución

```bash
cd Integrales
npm install
npm run dev
```

Para generar y previsualizar el build:

```bash
npm run build
npm run preview
```

### Notas de desarrollo

El repositorio no muestra secretos, API keys o tokens evidentes en el código revisado. No se realizaron cambios al código del proyecto; esta actualización únicamente añade documentación.