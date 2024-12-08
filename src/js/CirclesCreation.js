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
console.log(`canvas width: ${canvasWidth}, canvas height: ${canvasHeight}`)

renderer.domElement.addEventListener("mousemove", (e) => {
    // normalized coorindates
    // xNorm = (e.clientX / window.innerWidth) * 2 - 1;
    // xNorm = (e.clientX / window.innerWidth) * 2 - 1;
    // yNorm = -(e.clientY / window.innerHeight) * 2 + 1;

    // Origin point
    let x = e.clientX;
    let y = e.clientY;

    console.log(`x: ${x}, y: ${y}`);

    console.log(xNorm);

    // console.log(`ClientX: ${e.clientX}, xNormalized: ${xNorm}`);


    // xNorm = (e.clientX) / 30;
    // yNorm = (e.clientY / 30);

    // console.log(xNorm, yNorm)
})

window.addEventListener('click', (e) =>
{
    // normalized coorindates
    // const xNorm = (e.clientX / window.innerWidth) * 5.7 - 1;
    // const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;

    // Create vector to use normalized coordinate values
    const vector = new THREE.Vector3(xNorm, yNorm, depth);

    // Create geometry, set its position attirbute, and create the point mesh
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([vector.x, vector.y, vector.z]), 3));
    const point = new THREE.Points(geometry, material);
    // console.log(`Point placement: ${point.geometry.attributes.position.array}`)

    scene.add(point);

    // console.log(scene);
});


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();