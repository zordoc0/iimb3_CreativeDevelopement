import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function createHeader(): HTMLElement {
  const header = document.createElement("header");
  header.className = "fixed top-0 left-0 w-full z-30 px-8 py-4";

  header.innerHTML = `
    <nav class="grid grid-cols-3 items-center w-full">
      <div class="flex justify-start">
        <h1 class="text-white/50 text-[10px] md:text-xs leading-none font-poppins uppercase font-bold tracking-[0.2em]">LA FORGE | ZIAK</h1>
      </div>
      
      <div class="flex justify-center h-12 relative">
        <div id="header-mask-container" class="w-20 h-20 absolute -top-4 cursor-pointer "></div>
      </div>

      <div class="flex justify-end gap-4 md:gap-8">
        <a href="#" class="text-white/40 text-[9px] uppercase font-poppins tracking-widest hover:text-white transition-colors">Tracklist</a>
        <a href="#" class="text-white/40 text-[9px] uppercase font-poppins tracking-widest hover:text-white transition-colors">Cover</a>
      </div>
    </nav>
  `;

  const container = header.querySelector("#header-mask-container") as HTMLElement;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 2.5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(80, 80);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.position.set(2, 2, 2);
  scene.add(pointLight);

  const loader = new GLTFLoader();
  let maskModel: THREE.Group;

  loader.load(
    "/ziak_mask.glb",
    (gltf) => {
      maskModel = gltf.scene;
      
      const box = new THREE.Box3().setFromObject(maskModel);
      const center = box.getCenter(new THREE.Vector3());
      maskModel.position.sub(center);
      
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.2 / maxDim;
      maskModel.scale.set(scale, scale, scale);
      
      scene.add(maskModel);
      
      maskModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.metalness = 1;
            mesh.material.roughness = 0.2;
            mesh.material.color.set(0xffffff);
          }
        }
      });
    },
    undefined,
    (error) => console.error("erreryeruezureur", error)
  );

  function animate() {
    requestAnimationFrame(animate);
    if (maskModel) {
      maskModel.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }
  animate();

  return header;
}
