import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, planeGeo;
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

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Plane
planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x33ff99});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
scene.add(plane);

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// const pointMaterial = new THREE.PointsMaterial({size: 2, color: 0xffff00 });

let count = 1;
let points = [];
const proximityThreshold = 0.5; // Adjust this as needed


window.addEventListener('click', (e) =>
{
    // Normalize mouse coordinates
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane);


    if(intersects.length > 0)
    {
    //    const intersect = intersects[0];
    //    console.log(intersect); 

    //    intersect.point.z = 0;

    //    const pointGeometry = new THREE.BufferGeometry();
    // //    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute([mouse.x, mouse.y, 0], 3));
    //    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(intersect.point.toArray(), 3));
    //    const pointMaterial = new THREE.PointsMaterial({ size: 4.5, color: 0xff0000 });
    //    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    //    point.name = 'point'+count;
    //    scene.add(point);

    const intersect = intersects[0];

    intersect.point.z = 0;

    // If there are existing points, check if the new point is close to the first point
    if (points.length > 0) {
        const distanceToFirstPoint = intersect.point.distanceTo(points[0]);
        
        // If close to the first point, connect to the first point and finish
        if (distanceToFirstPoint < proximityThreshold) {
            const closingLineGeometry = new THREE.BufferGeometry().setFromPoints([points[points.length - 1], points[0]]);
            const closingLine = new THREE.Line(closingLineGeometry, new THREE.LineBasicMaterial({ color: 0xff0000 }));
            scene.add(closingLine);
            
            console.log("Closed loop by connecting to the first point.");
            points = []; // Reset the points array for a new shape if needed
            return; // Exit the function to stop adding more points
        }

        // const extrudeSettings = {
        //     steps: 1, // Number of subdivisions in depth
        //     depth: 1, // Extrusion depth
        //     bevelEnabled: false // Disable bevel for a clean extrusion
        //   };
          
        //   // Step 3: Create extrude geometry
        //   // const geometry = new THREE.ExtrudeGeometry(points, extrudeSettings);
          
        //   // Step 4: Create a mesh with the geometry and material
        //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        //   const mesh = new THREE.Mesh(geometry, material);

          // scene.add(mesh);
    }

    points.push(intersect.point.clone())

    // // Set y-coordinate to a small positive value
    // const pointPosition = intersect.point.clone();
    // pointPosition.z = 0.1;

    // Create a small sphere at the intersection point
    const pointGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    // Position the sphere at the modified intersection point
    point.position.copy(intersect.point);

    console.log(points.length)

    scene.add(point);

     // If there are at least two points, create a line between the last two points
        if (points.length > 1) {
            console.log(point.position)
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([points[points.length - 2], points[points.length - 1]]);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            const line = new THREE.Line(lineGeometry, lineMaterial);

            scene.add(line);

       count++;
    }
}

})

// Point
// const vectorA = new THREE.Vector3(0, 0, 0);
// const pointGeometry = new THREE.BufferGeometry();
// pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vectorA, 3));
// const pointMaterial = new THREE.PointsMaterial({ size: 0.5, color: 0x00ff00 });
// const point = new THREE.Points(pointGeometry, pointMaterial);
// scene.add(point);



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



