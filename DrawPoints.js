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
planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x33ff99});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
// scene.add(plane);

// Point
const vectorA = new THREE.Vector3(0, 0, 0);
const pointGeometry = new THREE.BufferGeometry();
pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vectorA, 3));
const pointMaterial = new THREE.PointsMaterial({ size: 0.5, color: 0x00ff00 });
const point = new THREE.Points(pointGeometry, pointMaterial);
scene.add(point);



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



