
import * as THREE from "three";
//import THREE from "three"; // avoid: Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/three.js?v=54f9873b' does not provide an export named 'default' (at threejs1.ts:2:8)

export {} // avoid ts(1208)

const appElement = <HTMLCanvasElement> document.getElementById('app');

// sample from : https://threejs.org/docs/#manual/ko/introduction/Creating-a-scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}

animate();