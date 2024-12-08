import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create material for the point
const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
let xNorm = 6.25;
let yNorm = 0;
const depth = 0;

// Width and Height of the WebGL Canvas
const canvasWidth = canvas.scrollWidth;
const canvasHeight = canvas.scrollHeight;
// console.log(`canvas width: ${canvasWidth}, canvas height: ${canvasHeight}`)

let x = 0;
let y = 0;
let normalizedX = 0;
let normalizedY = 0;

let normalizedMatrix =
[
    0, 0, 0, x,
    0, 0, 0, y,
    0, 0, 0, 1,
    0, 0, 0, 1
];

let screenCoordinateValues = 
[
    x, 
    y, 
    1, 
    1
];

let tranlatedValues = [];

renderer.domElement.addEventListener("mousemove", (e) => {
   x = e.clientX;
   y = e.clientY;

   // JS Screen Coordinates
   screenCoordinateValues[0] = x;
   screenCoordinateValues[1] = y;

   // Normalized values
   normalizedX = (x / window.innerWidth) * 2 - 1;
   normalizedY = -(y / window.innerHeight) * 2 + 1;

   normalizedMatrix[3] = normalizedX;
   normalizedMatrix[7] = normalizedY;
});


window.addEventListener('click', (e) =>
{

    tranlatedValues = [
        (normalizedMatrix[0] * screenCoordinateValues[0]) + (normalizedMatrix[1] * screenCoordinateValues[1]) + (normalizedMatrix[2] * screenCoordinateValues[2]) + (normalizedMatrix[3] * screenCoordinateValues[3]), 
        (normalizedMatrix[4] * screenCoordinateValues[0]) + (normalizedMatrix[5] * screenCoordinateValues[1]) + (normalizedMatrix[6] * screenCoordinateValues[2]) + (normalizedMatrix[7] * screenCoordinateValues[3]), 
        (normalizedMatrix[8] * screenCoordinateValues[0]) + (normalizedMatrix[9] * screenCoordinateValues[1]) + (normalizedMatrix[10] * screenCoordinateValues[2]) + (normalizedMatrix[11] * screenCoordinateValues[3]), 
        (normalizedMatrix[12] * screenCoordinateValues[0]) + (normalizedMatrix[13] * screenCoordinateValues[1]) + (normalizedMatrix[14] * screenCoordinateValues[2]) + (normalizedMatrix[15] * screenCoordinateValues[3])
    ];

    // Create vector to use normalized coordinate values
    const vector = new THREE.Vector3(tranlatedValues[0], tranlatedValues[1], tranlatedValues[2]);

    // Create geometry, set its position attirbute, and create the point mesh
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([vector.x, vector.y, vector.z]), 3));
    const point = new THREE.Points(geometry, material);

    scene.add(point);
});


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();