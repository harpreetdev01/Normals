import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import Shaders
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from "../shaders/fragment.glsl";

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls( camera, renderer.domElement );

// Sphere
const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
const sphereMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();