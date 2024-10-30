import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

let scene, camera, renderer, cubeGeo, cubeMaterial, cube, planeGeo, planeMaterial, plane;
const webglCanvas = document.querySelector('.webgl');

// ------------------------- SET UP ------------------------//
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, 500
);
camera.position.y = 1;
camera.position.z = 5;

// Renderer
renderer = new THREE.WebGLRenderer(
  { antialias: true,
    canvas: webglCanvas }
);
renderer.setSize(window.innerWidth, window.innerHeight);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);


// Plane
const planeWidth = 5;
const planeHeight = 5;
planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
plane = new THREE.Mesh(planeGeo, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Show plane's vertex normals
const vertexNormalsPlane = new VertexNormalsHelper(plane, 0.5, 0xff0000);
scene.add(vertexNormalsPlane);

// Cube
const cubeWidth = 1.5;
const cubeHeight = 1.5;
const cubeDepth = 1.5;
cubeGeo = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);
cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00faff });
cube = new THREE.Mesh(cubeGeo, cubeMaterial);
// cube.position.y = 0;
scene.add(cube);

// Show cube's vertex normals
const vertexNormalsCube = new VertexNormalsHelper(cube, 0.5, 0xff0000);
scene.add(vertexNormalsCube);

// Raycaster and mouse for detecting interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let isDragging = false;

// When mouse is pressed find the x and y mouse coordinates in normalized values
// Also, mouse is pressed shoot a ray at the cube
window.addEventListener('mousedown', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    if(intersects.length > 0){
        isDragging = true;
    }
});

// mousemove - drag the cube
window.addEventListener('mousemove', (e) => {
    if(isDragging){
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersect = raycaster.intersectObject(plane);

        if(intersect.length > 0){
            // Get the intersection point on the plane
            let intersectPoint = intersect[0].point;

            // Clamp intersectPoint within the boundaries of the plane
            const halfWidth = planeWidth / 2;
            const halfHeight = planeHeight / 2;
            const offsetWidth = cubeWidth / 2;
            const offsetHeight = cubeHeight / 2;

            intersectPoint.x = THREE.MathUtils.clamp(intersectPoint.x, -halfWidth + offsetWidth, halfWidth - offsetWidth);
            intersectPoint.y = THREE.MathUtils.clamp(intersectPoint.y, -halfHeight + offsetHeight, halfHeight - offsetHeight);

            // Move cube to clamped position
            cube.position.set(intersectPoint.x, intersectPoint.y, cube.position.z);
        }
    }
});


// mouse up - stop dragging
window.addEventListener('mouseup', (e) => {
    isDragging = false;
});


// Window resize event listener
window.addEventListener('resize', () => {
  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Update camera aspect and re-calculate projection matrix
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
// ----------------------------- SET UP ENDED ----------------------------------//
