import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';


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
camera.position.z = 3;

// Renderer
renderer = new THREE.WebGLRenderer(
  { antialias: true,
    canvas: webglCanvas }
);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

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

// ----------------------------- CUSTOM TRIANGLE ------------------------------//

const v1 = new THREE.Vector3(0, 0, 0); // Point A: 
const v2 = new THREE.Vector3(1, 0, 0); // Point B:
const v3 = new THREE.Vector3(0, 1, 0); // Point C:

const geometry = new THREE.BufferGeometry();

// Create an array of vertex positions (each vertex has x, y, z)
const vertices = new Float32Array([
    v1.x, v1.y, v1.z,
    v2.x, v2.y, v2.z,
    v3.x, v3.y, v3.z
]);

// Add the vertex positions to the geometry
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// Calculate side vectors - Vector A and B
// Vector 
//const vectorA = new THREE.Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);
//const vectorB = new THREE.Vector3(v3.x - v1.x, v3.y - v1.y, v3.z - v1.z);
const vectorA = new THREE.Vector3().subVectors(v2, v1);
const vectorB = new THREE.Vector3().subVectors(v3, v1);
const normalVector = new THREE.Vector3().crossVectors(vectorA, vectorB).normalize();

// Cross Product calculation
// const normalVectorX = (vectorA.y * vectorB.z) - (vectorA.z * vectorB.y);
// const normalVectorY = (vectorA.z * vectorB.x) - (vectorA.x * vectorB.z);
// const normalVectorZ = (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);

// const normalVector = new THREE.Vector3(normalVectorX, normalVectorY, normalVectorZ);
// normalVector.normalize();

// Add the normalized normal vector for each vertex
const normals = new Float32Array([
    normalVector.x, normalVector.y, normalVector.z,
    normalVector.x, normalVector.y, normalVector.z,
    normalVector.x, normalVector.y, normalVector.z 
]);

geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

const geometryMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00, side: THREE.DoubleSide });

const triangle = new THREE.Mesh(geometry, geometryMaterial);
// triangle.rotation.z = 100;
// triangle.rotation.y = 100;
scene.add(triangle);

// ----------------------------- FIND NORMAL VECTOR ----------------------------------//


// Create a line - normal vector
// const points = [];
// points.push(new THREE.Vector3(0, 0, 0)); // Starting point
// points.push(normalVector); // Ending point

// const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000 });
// const line = new THREE.Line(lineGeo, lineMaterial);

// scene.add(line);

// Create own lines to see where normals are
const normalLength = 2.5;
const lineMaterial = new THREE.LineBasicMaterial({ color:0xFF007F});

// Get the positions and normals from the geometry
const positions   = geometry.attributes.position.array;
const normalArray = geometry.attributes.normal.array;

const normalLines = new THREE.Group();

for(let i = 0; i < 3; i++)
{
    const vertex = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    const normal = new THREE.Vector3(normalArray[i * 3], normalArray[i * 3 + 1], normalArray[i + 3 + 2]);
    console.log(`Vertex ${i}:`, vertex.toArray(), "Normal:", normal.toArray()); // Debug line
    const normalEnd = vertex.clone().add(normal.clone().multiplyScalar(normalLength));

    const normalGeometry = new THREE.BufferGeometry().setFromPoints([vertex, normalEnd]);
    const line = new THREE.Line(normalGeometry, lineMaterial);
    normalLines.add(line);
}

scene.add(normalLines);

// Check with Three.js where the normals are - if I did it right
// Assuming 'triangle' is your mesh object
// const vertexNormalsHelper = new VertexNormalsHelper(triangle, 0.5, 0xff0000);  // 0.5 length, red color
// scene.add(vertexNormalsHelper);



// Animation Loop
const animate = () =>
{
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();



