import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function createHeroSection(): HTMLElement {
  const section = document.createElement("section");
  section.className =
    "w-full min-h-screen flex justify-center items-center relative overflow-hidden bg-black";

  section.innerHTML = `
    <div class="absolute inset-0 z-1 pointer-events-none opacity-10" 
         style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 30px 30px;">
    </div>
    <div id="three-container" class="absolute inset-0 w-full h-full z-0"></div>

    <div class="w-full h-full z-10 bg-linear-to-b from-black/80 via-transparent to-black/90 absolute inset-0 pointer-events-none"></div>


      <div class="absolute bottom-12 left-12 group z-20">
        <div class="text-[40px] font-black text-white/70 font-poppins leading-none mb-[-10px] tracking-tighter uppercase">Forge</div>
        <div class="text-[10px] text-white/70 font-mono tracking-[0.5em] uppercase border-t border-white/10 pt-2">
          LA FORGE
        </div>
      </div>

      <div class="absolute right-12 bottom-12 flex flex-col items-end gap-2">
        <div class="flex gap-1">
          <div class="w-1 h-4 bg-white/40 animate-pulse"></div>
          <div class="w-1 h-4 bg-white/30 animate-pulse delay-75"></div>
          <div class="w-1 h-4 bg-white/20 animate-pulse delay-150"></div>
          <div class="w-1 h-4 bg-white/10 animate-pulse delay-300"></div>
        </div>
        <div class="text-[9px] text-white font-mono uppercase tracking-widest">17/01/2026</div>
      </div>
    </div>

    <div class="absolute right-12 top-1/2 -translate-y-1/2 z-20 text-right flex flex-col items-end justify-center">
      <div class="mb-4 overflow-hidden">
        <span class="text-xs text-white/80 font-bold tracking-[0.5em] uppercase block mb-2 opacity-70">NOUVELLE ALBUM</span>
        <div class="h-[2px] w-24 bg-white/40 ml-auto"></div>
      </div>
      
      <h2 class="text-white/90 text-6xl md:text-9xl font-poppins uppercase bold font-black mb-2 tracking-tighter leading-none">
        LA FORGE
      </h2>
      
      <p class="text-white/40 text-xl font-poppins font-light tracking-[0.4em] mt-4 italic">17/01/2026</p>
      <div class="mt-12 flex flex-col items-end gap-4 group cursor-pointer">
        <div class="relative px-8 py-3 border border-white/20 overflow-hidden transition-all group-hover:border-white group-hover:bg-white/5">
          <a href="#" class="text-white text-sm font-bold uppercase tracking-[0.4em] relative z-10">Entrez dans la forge</a>
          <div class="absolute top-0 left-0 w-1 h-1 bg-white"></div>
          <div class="absolute bottom-0 right-0 w-1 h-1 bg-white"></div>
        </div>
      </div>
    </div>
    <img src="/dither_cut1.png" alt="Masque" class="w-90 h-70 cursor-pointer absolute bottom-10 right-10  animate-float">

    

    <div id="loader-progress" class="absolute bottom-0 left-0 h-1 bg-white z-50 transition-all duration-300" style="width: 0%"></div>
  `;

  const container = section.querySelector("#three-container") as HTMLElement;
  const progressBar = section.querySelector("#loader-progress") as HTMLElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  const updateSize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  updateSize();
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 5;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 4);
  mainLight.position.set(-5, 5, 5);
  scene.add(mainLight);

  const whiteSpotlight = new THREE.SpotLight(0xffffff, 8);
  whiteSpotlight.position.set(-8, 5, 2);
  whiteSpotlight.angle = Math.PI / 4;
  whiteSpotlight.penumbra = 0.5;
  scene.add(whiteSpotlight);

  const backLight = new THREE.PointLight(0xff0000, 100);
  backLight.position.set(5, -2, 2);
  scene.add(backLight);

  const rimLight = new THREE.PointLight(0xffffff, 3);
  rimLight.position.set(0, 0, -5);
  scene.add(rimLight);

  const loader = new GLTFLoader();
  let model: THREE.Group;

  const targetRotation = { x: 0, y: 0 };

  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  loader.load(
    "/zzz.glb",
    (gltf) => {
      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5.0 / maxDim;
      model.scale.set(scale, scale, scale);

      model.position.x = -4;

      scene.add(model);

      model.rotation.y = Math.PI;
      progressBar.style.opacity = "0";

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.roughness = 0.05;
            mesh.material.metalness = 0.9;
            mesh.material.color.set(0xffffff);
          }
        }
      });
    },
    (xhr) => {
      const percent = (xhr.loaded / xhr.total) * 100;
      progressBar.style.width = `${percent}%`;
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  camera.position.z = 7;

  const ringGeometry = new THREE.RingGeometry(3.5, 4, 32);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.8,
    metalness: 1,
    side: THREE.DoubleSide,
  });
  const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.set(-4, -2, 0);
  scene.add(ringMesh);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();


    //souris
    if (model) {
      targetRotation.y = -1.5 + mouse.x * 0.15; 
      targetRotation.x = -mouse.y * 0.1; 

      model.rotation.y += (targetRotation.y - model.rotation.y) * 0.05;
      model.rotation.x += (targetRotation.x - model.rotation.x) * 0.05;

      model.position.y = Math.sin(elapsedTime * 0.3) * 0.05;
      whiteSpotlight.intensity = 10 + Math.sin(elapsedTime * 15) * 5;
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", updateSize);

  const resizeObserver = new ResizeObserver(() => {
    updateSize();
  });
  resizeObserver.observe(container);

  return section;
}
