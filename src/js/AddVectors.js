import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, cubeGeo, planeGeo;
const webglCanvas = document.querySelector('.webgl');

// ------------------------- SET UP ------------------------//
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, 500
);
camera.position.z = 10;

// Renderer
renderer = new THREE.WebGLRenderer(
  { antialias: true,
    canvas: webglCanvas }
);
renderer.setSize(window.innerWidth, window.innerHeight);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

// Plane
// planeGeo = new THREE.PlaneGeometry(20, 20);
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x33ff99});
// const plane = new THREE.Mesh(planeGeo, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.position.y = -1;
// // scene.add(plane);

// // Point
// const vectorA = new THREE.Vector3(0, 0, 0);
// const pointGeometry = new THREE.BufferGeometry();
// pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vectorA, 3));
// const pointMaterial = new THREE.PointsMaterial({ size: 0.5, color: 0x00ff00 });
// const point = new THREE.Points(pointGeometry, pointMaterial);
// scene.add(point);

// // Move point with a new Vector
// const vectorB = new THREE.Vector3(3, 2, 0);
// const vectorC = new THREE.Vector3(vectorA.x + vectorB.x, vectorA.y + vectorB.y, vectorA.z + vectorB.z);
// point.position.set(vectorC.x, vectorC.y, vectorC.z);


// // Cube
// const cubeGeometry = new THREE.BoxGeometry(1.25, 1.25, 1.25);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa22});
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// // Negative - negated vector - vector b
// const vector_b = new THREE.Vector3(4, 8, 0);

// // Calculate subtraction vector
// const vector_c = new THREE.Vector3(vectorC.x + (-vector_b.x), vectorC.y + (-vector_b.y), vectorC.z + (-vector_b.z));
// point.position.set(vector_c.x, vector_c.y, vector_c.z);
// console.log(vector_c) // works
// console.log(point.geometry.attributes.position);
 // why showing 0, 0, 0 and not -1, -6, 0? ASK

/**Hard to move a cube with vectors, need matrices to complete the tasks? */

// Cube's position
// const cubeVector = cubeGeometry.fromBufferAttribute('position', 0);
// console.log(cubeGeometry.attributes.position)


// Create vector A and B:
const vectorA = new THREE.Vector3(1, 2, 3);
const vectorB = new THREE.Vector3(4, 5, 6);

// Add vector A and B
const vectorC = new THREE.Vector3(vectorA.x + vectorB.x, vectorA.y + vectorB.y, vectorA.z + vectorB.z);
console.log(vectorC) // works




// Window resize event listener
window.addEventListener('resize', () => {
  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Update camera aspect and re-calculate projection matrix
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


// ----------------------------- SET UP ENDED ----------------------------------//


// Animation Loop
const animate = () =>
{
  requestAnimationFrame(animate);

  // controls.update();

  renderer.render(scene, camera);
}

animate();



