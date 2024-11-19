import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create material for the point
const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });

window.addEventListener('click', (e) =>
{
    // normalized coorindates
    const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
    const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;

    // Create vector to use normalized coordinate values
    const vector = new THREE.Vector3(xNorm, yNorm, 0);

    // Create geometry, set its position attirbute, and create the point mesh
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([vector.x, vector.y, vector.z]), 3));
    const point = new THREE.Points(geometry, material);


    scene.add(point);

    console.log(scene);
});


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();