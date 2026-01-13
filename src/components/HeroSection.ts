import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function createHeroSection(): HTMLElement {
  const section = document.createElement("section");
  section.className =
    "w-full h-full flex justify-center items-center relative overflow-hidden bg-black";

  section.innerHTML = `
    <div class="noise"></div>
    <div id="three-container" class="fixed top-0 left-0 w-full h-full z-0"></div>

    <div class="w-full h-full z-10 bg-linear-to-b from-black/60 via-transparent to-black/80 fixed top-0 left-0 pointer-events-none"></div>

    <!-- Éléments de design décoratifs -->
    <div class="fixed inset-0 z-15 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      <div class="absolute top-0 left-12 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent"></div>
      <div class="absolute top-0 right-12 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent"></div>
      
      <div class="absolute bottom-8 left-8 text-[10px] text-white/30 font-poppins uppercase tracking-[0.2em]">
        Status: Active // Sector: Void // 00.0000° N, 00.0000° E
      </div>
    </div>

    <div class="absolute right-12 top-1/2 -translate-y-1/2 z-20 text-right flex flex-col items-end justify-center animate-fade-in-up">
      <div class="mb-4 overflow-hidden">
        <span class="text-xs text-white/80 font-bold tracking-[0.5em] uppercase block mb-2 opacity-70">Monochrome Protocol</span>
        <div class="h-px w-full bg-white/20"></div>
      </div>
      
      <h2 class="text-6xl md:text-8xl text-white font-poppins uppercase font-black mb-2 tracking-tighter leading-none" data-text="Ziak - La Forge">
        La Forge
      </h2>
      
      <p class="text-white/40 text-xl font-poppins font-light tracking-[0.4em] mt-4">13.01.2026</p>
      
      <div class="mt-8 flex flex-col items-end gap-2 group cursor-pointer">
        <div class="flex gap-4 items-center">
            <div class="w-12 h-px bg-white/50 transition-all group-hover:w-20 group-hover:bg-white"></div>
            <a href="#" class="text-white/70 text-sm font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors">Enter the Void</a>
        </div>
        <span class="text-[9px] text-white/20 uppercase tracking-widest">System stabilized // No signal</span>
      </div>
    </div>

    <!-- Loader progress -->
    <div id="loader-progress" class="fixed bottom-0 left-0 h-1 bg-white z-50 transition-all duration-300" style="width: 0%"></div>
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

  const backLight = new THREE.PointLight(0xffffff, 2);
  backLight.position.set(5, -2, 2);
  scene.add(backLight);

  const rimLight = new THREE.PointLight(0xffffff, 3);
  rimLight.position.set(0, 0, -5);
  scene.add(rimLight);

  const loader = new GLTFLoader();
  let model: THREE.Group;

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

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.012,
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (model) {
      // Fixed rotation looking towards the left
      model.rotation.y = -1.5;
      model.rotation.x = 0;

      // Gentle floating animation
      model.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

      // Simulate flickering light (flame effect)
      whiteSpotlight.intensity = 6 + Math.sin(elapsedTime * 10) * 2;
    }

    // Particles animation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener("resize", updateSize);

  const resizeObserver = new ResizeObserver(() => {
    updateSize();
  });
  resizeObserver.observe(container);

  return section;
}
