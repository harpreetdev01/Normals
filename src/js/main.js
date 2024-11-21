import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, cubeGeo, cube, planeGeo;
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

// Cube
cubeGeo = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
cube = new THREE.Mesh(cubeGeo, cubeMaterial);
scene.add(cube);

// Plane
planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x33ff99});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

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

// ----------------------------- PLANE BOUNDARIES ------------------------------//

const planeWidth = 20;
const planeHeight = 0;

const minX = -planeWidth / 2;
const maxX = planeWidth / 2;
const minY = -planeHeight / 2;
const maxY = planeHeight / 2;

// ----------------------------- PLANE BOUNDARIES ENDED ------------------------------//

// ----------------------------- MOUSE EVENTS ----------------------------------//

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isDragging = false;
let selectedObject = null;

// Event listeners
webglCanvas.addEventListener('mousedown', onMouseDown, false);
webglCanvas.addEventListener('mousemove', onMouseMove, false);
webglCanvas.addEventListener('mouseup', onMouseUp, false);

// Event listener functions
function onMouseDown(e)
{
  // Normalize mouse coordinates
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = -( e.clientY / window.innerHeight ) * 2 + 1;

  // Set raycaster from camera to mouse coordinates
  raycaster.setFromCamera(mouse, camera);

  // Check if the ray intersects the cube
  const intersects = raycaster.intersectObjects([cube]);
  if(intersects.length > 0){
    isDragging = true;
    selectedObject = intersects[0].object;
  }
}

function onMouseMove(e)
{
  if(isDragging && selectedObject){

    // Update mouse position in NDC
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster for the new mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find where the ray intersects the plane that the object lies on
    const planeIntersect = raycaster.intersectObject(plane);

    if(planeIntersect.length > 0){

      const intersectPoint = planeIntersect[0].point;

      // Clamp the intersection point to stay within plane boundaries
      intersectPoint.x = THREE.MathUtils.clamp(intersectPoint.x, minX, maxX);
      intersectPoint.y = THREE.MathUtils.clamp(intersectPoint.y, minY, maxY);

      selectedObject.position.copy(intersectPoint);
    }

  }
}

function onMouseUp(){
  isDragging = false;
  selectedObject = null;
}

// ----------------------------- MOUSE EVENTS ENDED ----------------------------------//


// Animation Loop
const animate = () =>
{
  requestAnimationFrame(animate);

  // controls.update();

  renderer.render(scene, camera);
}

animate();



