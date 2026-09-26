globalThis.self = globalThis;
import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Read glb file buffer
const buffer = fs.readFileSync('public/vedika-M1.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  console.log('BOX MIN:', JSON.stringify(box.min));
  console.log('BOX MAX:', JSON.stringify(box.max));
  console.log('SIZE:', JSON.stringify(size));
  console.log('CENTER:', JSON.stringify(center));
}, (err) => {
  console.error(err);
});
