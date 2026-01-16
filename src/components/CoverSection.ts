import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { loadingManager } from "./Loader";

type Preset = {
  name: string;
  bgType: string;
  bgColor1: string;
  bgColor2: string;
  gradientAngle: number;
  textColor: string;
  textOpacity: number;
  rotation: number;
  positionX: number;
  positionY: number;
  scale: number;
  metalness: number;
  roughness: number;
  mask: string;
};

const PRESETS: Record<string, Preset> = {
  akimbo: {
    name: "AKIMBO",
    bgType: "flux",
    bgColor1: "#000000",
    bgColor2: "#ffffff",
    gradientAngle: 0,
    textColor: "#ffffff",
    textOpacity: 1,
    rotation: 90,
    positionX: 0,
    positionY: 0,
    scale: 1.25,
    metalness: 1,
    roughness: 0,
    mask: "/ziak_mask.glb",
  },
  neant: {
    name: "NÉANT",
    bgType: "abstract",
    bgColor1: "#000000",
    bgColor2: "#050505",
    gradientAngle: 315,
    textColor: "#444444",
    textOpacity: 1,
    rotation: 180,
    positionX: 0.4,
    positionY: -0.3,
    scale: 1.35,
    metalness: 0.8,
    roughness: 0.4,
    mask: "/zzz.glb",
  },
  chrome: {
    name: "CHROME",
    bgType: "brushed",
    bgColor1: "#000000",
    bgColor2: "#ffffff",
    gradientAngle: 180,
    textColor: "#ffffff",
    textOpacity: 0.8,
    rotation: 45,
    positionX: 0.2,
    positionY: -0.1,
    scale: 1.5,
    metalness: 1,
    roughness: 0.05,
    mask: "/ziak_mask.glb",
  },
  vague: {
    name: "VAGUE",
    bgType: "wave",
    bgColor1: "#000000",
    bgColor2: "#ffffff",
    gradientAngle: 0,
    textColor: "#ffffff",
    textOpacity: 0.9,
    rotation: 45,
    positionX: 0.2,
    positionY: -0.1,
    scale: 1.4,
    metalness: 1,
    roughness: 0,
    mask: "/ziak_mask.glb",
  },
};

const COLOR_PALETTES = [
  { bg1: "#1a0000", bg2: "#4a0000", text: "#ff4444" },
  { bg1: "#0a0a1a", bg2: "#1a1a3a", text: "#6699cc" },
  { bg1: "#2a2a00", bg2: "#4a4a00", text: "#ffdd00" },
  { bg1: "#000000", bg2: "#1a1a1a", text: "#cccccc" },
  { bg1: "#0a1a0a", bg2: "#1a3a1a", text: "#66cc66" },
  { bg1: "#1a0a1a", bg2: "#3a1a3a", text: "#cc66cc" },
  { bg1: "#0a1a2a", bg2: "#1a2a3a", text: "#aaddff" },
  { bg1: "#2a1a0a", bg2: "#4a3a1a", text: "#ffaa66" },
];

export function createCoverSection(): HTMLElement {
  loadingManager.registerAsset();

  const section = document.createElement("section");
  section.id = "cover";
  section.className =
    "w-full min-h-screen flex justify-center items-center relative overflow-hidden bg-black py-20";

  section.innerHTML = `
    <div id="cover-section-container" class="w-full max-w-7xl mx-auto px-8 z-10 relative">
      <div class="mb-12 text-center relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-15 pointer-events-none">
          <img 
            src="/dither_anvil.png" 
            alt="Decoration" 
            class="w-full h-full object-contain mix-blend-screen animate-pulse-slow"
          />
        </div>
        <div class="relative z-10">
          <div class="text-white/40 text-xs uppercase tracking-[0.5em] mb-4 font-poppins">Générateur de Cover</div>
          <h2 class="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter font-anton">LA FORGE.</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        <div class="lg:col-span-3">
          <div class="relative aspect-square bg-black border border-white/10 overflow-hidden group">
            <div id="cover-canvas-container" class="w-full h-full"></div>
            
            <div class="absolute bottom-4 left-4 z-20 w-8 h-8 opacity-40 mix-blend-screen grayscale">
              <img src="/masque1.png" alt="Logo" class="w-full h-full object-contain">
            </div>
            
            <div class="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div class="text-white/60 text-[10px] font-mono uppercase tracking-wider">3000x3000px</div>
              <div class="text-white/60 text-[10px] font-mono uppercase tracking-wider">Chrome Edition</div>
            </div>

            <div id="composition-grid" class="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300">
              <div class="w-full h-full grid grid-cols-3 grid-rows-3">
                <div class="border-r border-b border-white/10"></div>
                <div class="border-r border-b border-white/10"></div>
                <div class="border-b border-white/10"></div>
                <div class="border-r border-b border-white/10"></div>
                <div class="border-r border-b border-white/10"></div>
                <div class="border-b border-white/10"></div>
                <div class="border-r border-white/10"></div>
                <div class="border-r border-white/10"></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div id="presets-container" class="lg:col-span-2 space-y-4">
          
          <div class="border border-white/10 bg-white/2 p-6">
            <label class="text-white/80 text-xs uppercase tracking-wider font-bold mb-3 block">Presets</label>
            <p class="text-white/40 text-[11px] tracking-wider mb-4">Un preset permet de générer une cover avec des options prédéfinies.</p>
            <div class="grid grid-cols-2 gap-2 mb-4">
              <button data-preset="akimbo" class="preset-btn px-4 py-3 border border-white/20 text-white/60 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white transition-all">
                Akimbo
              </button>
              <button data-preset="neant" class="preset-btn px-4 py-3 border border-white/20 text-white/60 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white transition-all">
                Néant
              </button>
              <button data-preset="chrome" class="preset-btn px-4 py-3 border border-white/20 text-white/60 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white transition-all">
                Chrome
              </button>
              <button data-preset="vague" class="preset-btn px-4 py-3 border border-white/20 text-white/60 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white transition-all">
                Vague
              </button>
            </div>
            <button id="randomize" class="w-full px-6 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white/90 transition-all">
              Aléatoire
            </button>
          </div>

          <div class="flex gap-2">
            <button id="download-cover" class="flex-1 px-4 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/90 transition-all">
              Télécharger
            </button>
            <button id="toggle-grid" class="px-4 py-3 border border-white/20 text-white/60 font-bold uppercase text-[10px] tracking-[0.2em] hover:border-white/40 hover:text-white transition-all">
              Grille
            </button>
          </div>

          <button id="show-advanced-content" class="w-full px-6 py-3 border border-white/20 text-white/60 font-bold uppercase text-[10px] tracking-[0.3em] hover:border-white/40 hover:text-white transition-all">
            Options avancées ⏷
          </button>

          <div id="presets-container-advanced" class="border border-white/10 bg-white/2" style="display: none;">
            <div class="flex border-b border-white/10">
              <button id="tab-quick" class="flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white bg-white/10 border-b-2 border-white transition-all">
                Rapide
              </button>
              <button id="tab-advanced" class="flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white/40 hover:text-white/60 transition-all">
                Avancé
              </button>
            </div>

            <div id="tab-content-quick" class="p-6 space-y-4">
              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Modèle</label>
                <div class="grid grid-cols-2 gap-2">
                  <button id="mask-ziak" class="px-4 py-3 border border-white/40 bg-white/10 text-white/90 text-[10px] uppercase tracking-wider font-bold hover:bg-white/20 transition-all">
                    Masque1
                  </button>
                  <button id="mask-zzz" class="px-4 py-3 border border-white/20 text-white/40 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white/60 transition-all">
                    Masque2
                  </button>
                </div>
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Rotation <span class="text-white/40 font-mono" id="rotation-value">0°</span></label>
                <input type="range" id="rotation-control" min="0" max="360" value="0" step="45"
                       class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Échelle <span class="text-white/40 font-mono" id="scale-value">1.2</span></label>
                <input type="range" id="scale-control" min="0.8" max="1.5" step="0.1" value="1.2" 
                       class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
              </div>
            </div>

            <div id="tab-content-advanced" class="p-6 space-y-4" style="display: none;">
              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Type de Fond</label>
                <select id="background-type" class="w-full bg-black border border-white/20 text-white p-2 text-[10px] uppercase tracking-wider">
                  <option value="aura">Aura Prestige</option>
                  <option value="concrete">Béton Brut</option>
                  <option value="carbon">Trame Carbone</option>
                  <option value="flux">Flux Organique</option>
                  <option value="wave">Vagues Chrome</option>
                  <option value="brushed">Acier Brossé</option>
                </select> 
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Couleur 1</label>
                  <input type="color" id="bg-color1" value="#000000" class="w-full h-10 bg-transparent border border-white/20 cursor-pointer">
                </div>

                <div id="color2-container" style="display: none;">
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Couleur 2</label>
                  <input type="color" id="bg-color2" value="#1a1a1a" class="w-full h-10 bg-transparent border border-white/20 cursor-pointer">
                </div>
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Couleur Texte</label>
                <input type="color" id="text-color" value="#ffffff" class="w-full h-10 bg-transparent border border-white/20 cursor-pointer">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Position X <span class="text-white/40 font-mono" id="position-x-value">0.5</span></label>
                  <input type="range" id="position-x-control" min="-0.5" max="0.5" step="0.1" value="0" 
                         class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
                </div>

                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Position Y <span class="text-white/40 font-mono" id="position-y-value">0.0</span></label>
                  <input type="range" id="position-y-control" min="-0.5" max="0.5" step="0.1" value="0" 
                         class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Chrome <span class="text-white/40 font-mono" id="metalness-value">1.00</span></label>
                  <input type="range" id="metalness-control" min="0" max="1" step="0.05" value="1" 
                         class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
                </div>

                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Rugosité <span class="text-white/40 font-mono" id="roughness-value">0.20</span></label>
                  <input type="range" id="roughness-control" min="0" max="1" step="0.05" value="0.2" 
                         class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  const container = section.querySelector(
    "#cover-canvas-container"
  ) as HTMLElement;

  const scene = new THREE.Scene();

  const bgCanvas = document.createElement("canvas");
  bgCanvas.width = 2048;
  bgCanvas.height = 2048;
  const bgCtx = bgCanvas.getContext("2d")!;

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
  });

  const updateSize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.left = -1;
    camera.right = 1;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  updateSize();
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(2, 3, 4);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
  rimLight.position.set(-2, -1, -2);
  scene.add(rimLight);

  const topLight = new THREE.PointLight(0xffffff, 1);
  topLight.position.set(0, 5, 2);
  scene.add(topLight);

  const accentLight = new THREE.PointLight(0x4488ff, 0.3);
  accentLight.position.set(-3, 0, 1);
  scene.add(accentLight);

  const bgTexture = new THREE.CanvasTexture(bgCanvas);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
  const bgGeometry = new THREE.PlaneGeometry(2, 2);
  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  bgMesh.position.z = -5;
  scene.add(bgMesh);

  function generateBackground(type: string, color1: string, color2: string) {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    const w = bgCanvas.width;
    const h = bgCanvas.height;

    const applyDither = (opacity: number = 0.2, density: number = 1) => {
      const ditherSize = 4;
      const ditherCanvas = document.createElement("canvas");
      ditherCanvas.width = ditherSize;
      ditherCanvas.height = ditherSize;
      const ditherCtx = ditherCanvas.getContext("2d")!;

      ditherCtx.fillStyle = `rgba(0,0,0,${opacity})`;
      if (density > 0.5) ditherCtx.fillRect(0, 0, 1, 1);
      if (density > 0.8) ditherCtx.fillRect(2, 2, 1, 1);
      ditherCtx.fillStyle = `rgba(255,255,255,${opacity * 0.5})`;
      ditherCtx.fillRect(1, 1, 1, 1);

      const pattern = bgCtx.createPattern(ditherCanvas, "repeat");
      if (pattern) {
        bgCtx.save();
        bgCtx.globalCompositeOperation = "overlay";
        bgCtx.fillStyle = pattern;
        bgCtx.fillRect(0, 0, w, h);
        bgCtx.restore();
      }
    };

    switch (type) {
      case "flux":
        bgCtx.fillStyle = "#000000";
        bgCtx.fillRect(0, 0, w, h);

        const layers = 8;
        for (let l = 0; l < layers; l++) {
          bgCtx.beginPath();
          const yBase = (h / layers) * l + h / layers / 2;

          bgCtx.moveTo(-100, h + 100);
          bgCtx.lineTo(-100, yBase);

          for (let x = 0; x <= w + 100; x += 20) {
            const freq = 0.003;
            const amp = 80 + l * 40;
            const phase = l * 0.8;
            const y =
              yBase +
              Math.sin(x * freq + phase) * amp +
              Math.cos(x * 0.002 - phase) * (amp / 2);
            bgCtx.lineTo(x, y);
          }

          bgCtx.lineTo(w + 100, h + 100);
          bgCtx.closePath();

          const grad = bgCtx.createLinearGradient(
            0,
            yBase - 100,
            0,
            yBase + 200
          );
          grad.addColorStop(0, l % 2 === 0 ? color2 : color1);
          grad.addColorStop(0.5, "#000000");
          grad.addColorStop(1, "#000000");

          bgCtx.fillStyle = grad;
          bgCtx.globalAlpha = 0.8;
          bgCtx.fill();

          bgCtx.strokeStyle = "rgba(255,255,255,0.15)";
          bgCtx.lineWidth = 1;
          bgCtx.stroke();
        }
        bgCtx.globalAlpha = 1;
        applyDither(0.5, 1);
        break;

      case "wave":
        bgCtx.fillStyle = "#000000";
        bgCtx.fillRect(0, 0, w, h);
        const waveCount = 15;
        for (let i = 0; i < waveCount; i++) {
          bgCtx.beginPath();
          bgCtx.lineWidth = 2;
          const alpha = (1 - i / waveCount) * 0.4;
          bgCtx.strokeStyle = `${color2}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`;
          const yOffset = (h / waveCount) * i;
          bgCtx.moveTo(0, yOffset);
          for (let x = 0; x < w; x += 10) {
            const distortion = Math.sin(x * 0.004 + i * 0.4) * 60;
            bgCtx.lineTo(x, yOffset + distortion);
          }
          bgCtx.stroke();
        }
        applyDither(0.1);
        break;

      case "aura":
        bgCtx.fillStyle = "#000000";
        bgCtx.fillRect(0, 0, w, h);
        const auraGrad = bgCtx.createRadialGradient(
          w / 2,
          h / 2,
          0,
          w / 2,
          h / 2,
          w * 0.8
        );
        auraGrad.addColorStop(0, color2 + "44");
        auraGrad.addColorStop(0.5, color1);
        auraGrad.addColorStop(1, "#000000");
        bgCtx.fillStyle = auraGrad;
        bgCtx.fillRect(0, 0, w, h);
        applyDither(0.12);
        break;

      case "concrete":
        bgCtx.fillStyle = color1;
        bgCtx.fillRect(0, 0, w, h);
        for (let i = 0; i < 2000; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const size = Math.random() * 2;
          const shade = Math.random() * 25;
          bgCtx.fillStyle = `rgba(${shade},${shade},${shade},0.3)`;
          bgCtx.fillRect(x, y, size, size);
        }
        applyDither(0.1);
        break;

      case "carbon":
        bgCtx.fillStyle = "#050505";
        bgCtx.fillRect(0, 0, w, h);
        const patternSize = 8;
        for (let y = 0; y < h; y += patternSize) {
          for (let x = 0; x < w; x += patternSize) {
            bgCtx.fillStyle =
              (x + y) % (patternSize * 2) === 0 ? "#111" : "#050505";
            bgCtx.fillRect(x, y, patternSize, patternSize);
          }
        }
        applyDither(0.05);
        break;

      case "brushed":
        bgCtx.fillStyle = color1;
        bgCtx.fillRect(0, 0, w, h);
        for (let i = 0; i < h; i += 2) {
          bgCtx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
          bgCtx.beginPath();
          bgCtx.moveTo(0, i);
          bgCtx.lineTo(w, i);
          bgCtx.stroke();
        }
        applyDither(0.06);
        break;
    }

    bgTexture.needsUpdate = true;
  }

  generateBackground("solid", "#000000", "#1a1a1a");

  let maskModel: THREE.Group;
  let maskMaterial: THREE.MeshStandardMaterial;
  const loader = new GLTFLoader();
  let isInitialLoad = true;

  function loadMask(
    maskPath: string,
    activeBtn: HTMLButtonElement,
    inactiveBtn: HTMLButtonElement
  ) {
    if (maskModel) {
      scene.remove(maskModel);
      maskModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    }

    activeBtn.className =
      "px-4 py-3 border border-white/40 bg-white/10 text-white/90 text-[10px] uppercase tracking-wider font-bold hover:bg-white/20 transition-all";
    inactiveBtn.className =
      "px-4 py-3 border border-white/20 text-white/40 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white/60 transition-all";

    const baseRotation = maskPath.includes("ziak_mask") ? 0 : 270;
    rotationControl.value = baseRotation.toString();
    rotationValue.textContent = `${baseRotation}°`;

    loader.load(
      maskPath,
      (gltf) => {
        maskModel = gltf.scene;

        const box = new THREE.Box3().setFromObject(maskModel);
        const center = box.getCenter(new THREE.Vector3());
        maskModel.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = parseFloat(scaleControl.value) / maxDim;
        maskModel.scale.set(scale, scale, scale);

        maskModel.position.x = parseFloat(positionXControl.value);
        maskModel.position.y = parseFloat(positionYControl.value);
        maskModel.position.z = -1;
        maskModel.rotation.y = (baseRotation * Math.PI) / 180;

        scene.add(maskModel);

        maskModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            maskMaterial = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              metalness: parseFloat(metalnessControl.value),
              roughness: parseFloat(roughnessControl.value),
              envMapIntensity: 1.5,
            });
            mesh.material = maskMaterial;
          }
        });

        // Signaler au loading manager que le modèle initial est chargé
        if (isInitialLoad) {
          loadingManager.assetLoaded();
          isInitialLoad = false;
        }
      },
      undefined,
      (error) => {
        console.error("Erreur chargement masque:", error);
        if (isInitialLoad) {
          loadingManager.assetLoaded();
          isInitialLoad = false;
        }
      }
    );
  }

  const textCanvas = document.createElement("canvas");
  textCanvas.width = 512;
  textCanvas.height = 2048;
  const textCtx = textCanvas.getContext("2d")!;

  let textMesh: THREE.Mesh;

  function updateMainText(text: string, opacity: number, color: string) {
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

    textCtx.save();
    textCtx.translate(textCanvas.width / 2, textCanvas.height / 2);
    textCtx.rotate(-Math.PI / 2);

    textCtx.fillStyle = color;
    textCtx.font = "bold 180px Anton, sans-serif";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.fillText(text, 0, 0);

    textCtx.restore();

    const textTexture = new THREE.CanvasTexture(textCanvas);

    if (textMesh) {
      (textMesh.material as THREE.MeshBasicMaterial).map = textTexture;
      (textMesh.material as THREE.MeshBasicMaterial).opacity = opacity;
      (textMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
    } else {
      const textMaterial = new THREE.MeshBasicMaterial({
        map: textTexture,
        transparent: true,
        opacity: opacity,
      });
      const textGeometry = new THREE.PlaneGeometry(0.4, 1.6);
      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-0.75, 0, 4);
      scene.add(textMesh);
    }
  }

  const ziakCanvas = document.createElement("canvas");
  ziakCanvas.width = 512;
  ziakCanvas.height = 128;
  const ziakCtx = ziakCanvas.getContext("2d")!;

  let ziakMesh: THREE.Mesh;

  function updateSecondaryText(text: string, opacity: number, color: string) {
    ziakCtx.clearRect(0, 0, ziakCanvas.width, ziakCanvas.height);

    ziakCtx.fillStyle = color;
    ziakCtx.font = "bold 80px Anton, sans-serif";
    ziakCtx.textAlign = "right";
    ziakCtx.textBaseline = "middle";
    ziakCtx.fillText(text, ziakCanvas.width - 20, ziakCanvas.height / 2);

    const ziakTexture = new THREE.CanvasTexture(ziakCanvas);

    if (ziakMesh) {
      (ziakMesh.material as THREE.MeshBasicMaterial).map = ziakTexture;
      (ziakMesh.material as THREE.MeshBasicMaterial).opacity = opacity;
      (ziakMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
    } else {
      const ziakMaterial = new THREE.MeshBasicMaterial({
        map: ziakTexture,
        transparent: true,
        opacity: opacity,
      });
      const ziakGeometry = new THREE.PlaneGeometry(0.5, 0.125);
      ziakMesh = new THREE.Mesh(ziakGeometry, ziakMaterial);
      ziakMesh.position.set(0.65, -0.85, 4);
      scene.add(ziakMesh);
    }
  }

  updateMainText("LA FORGE", 0.95, "#ffffff");
  updateSecondaryText("ZIAK", 0.95, "#ffffff");

  const rotationControl = section.querySelector(
    "#rotation-control"
  ) as HTMLInputElement;
  const rotationValue = section.querySelector("#rotation-value") as HTMLElement;
  const positionXControl = section.querySelector(
    "#position-x-control"
  ) as HTMLInputElement;
  const positionXValue = section.querySelector(
    "#position-x-value"
  ) as HTMLElement;
  const positionYControl = section.querySelector(
    "#position-y-control"
  ) as HTMLInputElement;
  const positionYValue = section.querySelector(
    "#position-y-value"
  ) as HTMLElement;
  const scaleControl = section.querySelector(
    "#scale-control"
  ) as HTMLInputElement;
  const scaleValue = section.querySelector("#scale-value") as HTMLElement;
  const metalnessControl = section.querySelector(
    "#metalness-control"
  ) as HTMLInputElement;
  const metalnessValue = section.querySelector(
    "#metalness-value"
  ) as HTMLElement;
  const roughnessControl = section.querySelector(
    "#roughness-control"
  ) as HTMLInputElement;
  const roughnessValue = section.querySelector(
    "#roughness-value"
  ) as HTMLElement;

  const bgTypeSelect = section.querySelector(
    "#background-type"
  ) as HTMLSelectElement;
  const bgColor1Input = section.querySelector("#bg-color1") as HTMLInputElement;
  const bgColor2Input = section.querySelector("#bg-color2") as HTMLInputElement;
  const color2Container = section.querySelector(
    "#color2-container"
  ) as HTMLElement;

  const textColorInput = section.querySelector(
    "#text-color"
  ) as HTMLInputElement;

  bgTypeSelect.addEventListener("change", (e) => {
    const type = (e.target as HTMLSelectElement).value;

    if (type === "gradient" || type === "grid") {
      color2Container.style.display = "block";
    } else {
      color2Container.style.display = "none";
    }

    generateBackground(type, bgColor1Input.value, bgColor2Input.value);
  });

  bgColor1Input.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    generateBackground(bgTypeSelect.value, value, bgColor2Input.value);
  });

  bgColor2Input.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    generateBackground(bgTypeSelect.value, bgColor1Input.value, value);
  });

  textColorInput.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    updateMainText("LA FORGE", 0.95, value);
    updateSecondaryText("ZIAK", 0.95, value);
  });

  rotationControl.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    rotationValue.textContent = `${value}°`;
    if (maskModel) {
      maskModel.rotation.y = (value * Math.PI) / 180;
    }
  });

  positionXControl.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    positionXValue.textContent = value.toFixed(1);
    if (maskModel) {
      maskModel.position.x = value;
    }
  });

  positionYControl.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    positionYValue.textContent = value.toFixed(1);
    if (maskModel) {
      maskModel.position.y = value;
    }
  });

  scaleControl.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    scaleValue.textContent = value.toFixed(1);
    if (maskModel) {
      const box = new THREE.Box3().setFromObject(maskModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = 1.2 / maxDim;
      maskModel.scale.set(
        baseScale * value,
        baseScale * value,
        baseScale * value
      );
    }
  });

  metalnessControl.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    metalnessValue.textContent = value.toFixed(2);
    if (maskMaterial) {
      maskMaterial.metalness = value;
    }
  });

  roughnessControl.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    roughnessValue.textContent = value.toFixed(2);
    if (maskMaterial) {
      maskMaterial.roughness = value;
    }
  });

  const maskZiakBtn = section.querySelector("#mask-ziak") as HTMLButtonElement;
  const maskZzzBtn = section.querySelector("#mask-zzz") as HTMLButtonElement;

  maskZiakBtn.addEventListener("click", () => {
    loadMask("/ziak_mask.glb", maskZiakBtn, maskZzzBtn);
  });

  maskZzzBtn.addEventListener("click", () => {
    loadMask("/zzz.glb", maskZzzBtn, maskZiakBtn);
  });

  loadMask("/ziak_mask.glb", maskZiakBtn, maskZzzBtn);

  const tabQuick = section.querySelector("#tab-quick") as HTMLButtonElement;
  const tabAdvanced = section.querySelector(
    "#tab-advanced"
  ) as HTMLButtonElement;
  const tabContentQuick = section.querySelector(
    "#tab-content-quick"
  ) as HTMLElement;
  const tabContentAdvanced = section.querySelector(
    "#tab-content-advanced"
  ) as HTMLElement;

  function switchTab(
    activeTab: HTMLButtonElement,
    activeContent: HTMLElement,
    inactiveTab: HTMLButtonElement,
    inactiveContent: HTMLElement
  ) {
    inactiveTab.className =
      "flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white/40 hover:text-white/60 transition-all";
    activeTab.className =
      "flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white bg-white/10 border-b-2 border-white transition-all";

    inactiveContent.style.display = "none";
    activeContent.style.display = "block";
  }

  tabQuick.addEventListener("click", () =>
    switchTab(tabQuick, tabContentQuick, tabAdvanced, tabContentAdvanced)
  );
  tabAdvanced.addEventListener("click", () =>
    switchTab(tabAdvanced, tabContentAdvanced, tabQuick, tabContentQuick)
  );

  function applyPreset(preset: Preset) {
    bgTypeSelect.value = preset.bgType;
    bgColor1Input.value = preset.bgColor1;
    bgColor2Input.value = preset.bgColor2;
    textColorInput.value = preset.textColor;
    rotationControl.value = preset.rotation.toString();
    positionXControl.value = preset.positionX.toString();
    positionYControl.value = preset.positionY.toString();
    scaleControl.value = preset.scale.toString();
    metalnessControl.value = preset.metalness.toString();
    roughnessControl.value = preset.roughness.toString();

    bgTypeSelect.dispatchEvent(new Event("change"));
    generateBackground(preset.bgType, preset.bgColor1, preset.bgColor2);
    updateMainText("LA FORGE", preset.textOpacity, preset.textColor);
    updateSecondaryText("ZIAK", preset.textOpacity, preset.textColor);

    rotationValue.textContent = `${preset.rotation}°`;
    positionXValue.textContent = preset.positionX.toFixed(1);
    positionYValue.textContent = preset.positionY.toFixed(1);
    scaleValue.textContent = preset.scale.toFixed(1);
    metalnessValue.textContent = preset.metalness.toFixed(2);
    roughnessValue.textContent = preset.roughness.toFixed(2);

    if (maskModel) {
      maskModel.rotation.y = (preset.rotation * Math.PI) / 180;
      maskModel.position.x = preset.positionX;
      maskModel.position.y = preset.positionY;

      const box = new THREE.Box3().setFromObject(maskModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = 1.2 / maxDim;
      maskModel.scale.set(
        baseScale * preset.scale,
        baseScale * preset.scale,
        baseScale * preset.scale
      );
    }

    if (maskMaterial) {
      maskMaterial.metalness = preset.metalness;
      maskMaterial.roughness = preset.roughness;
    }

    const targetBtn = preset.mask.includes("ziak") ? maskZiakBtn : maskZzzBtn;
    const otherBtn = preset.mask.includes("ziak") ? maskZzzBtn : maskZiakBtn;
    if (
      preset.mask !==
      (maskModel
        ? maskZiakBtn.className.includes("bg-white/10")
          ? "/ziak_mask.glb"
          : "/zzz.glb"
        : "/ziak_mask.glb")
    ) {
      loadMask(preset.mask, targetBtn, otherBtn);
    }
  }

  const presetButtons = section.querySelectorAll(".preset-btn");
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const presetName = (btn as HTMLElement).dataset.preset!;
      applyPreset(PRESETS[presetName]);
    });
  });

  const randomizeBtn = section.querySelector("#randomize") as HTMLButtonElement;
  randomizeBtn.addEventListener("click", () => {
    const palette =
      COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    const types = ["aura", "concrete", "carbon", "wave", "flux", "brushed"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const randomRotation = [0, 45, 90, 135, 180, 225, 270, 315][
      Math.floor(Math.random() * 8)
    ];
    const randomX = Math.random() * 0.6 - 0.3;
    const randomY = Math.random() * 0.6 - 0.3;
    const randomScale = 0.9 + Math.random() * 0.5;
    const randomMetal = 0.8 + Math.random() * 0.2;
    const randomRough = Math.random() * 0.3;

    bgTypeSelect.value = randomType;
    bgColor1Input.value = palette.bg1;
    bgColor2Input.value = palette.bg2;
    textColorInput.value = palette.text;
    rotationControl.value = randomRotation.toString();
    positionXControl.value = randomX.toFixed(1);
    positionYControl.value = randomY.toFixed(1);
    scaleControl.value = randomScale.toFixed(1);
    metalnessControl.value = randomMetal.toFixed(2);
    roughnessControl.value = randomRough.toFixed(2);

    bgTypeSelect.dispatchEvent(new Event("change"));
    generateBackground(randomType, palette.bg1, palette.bg2);
    updateMainText("LA FORGE", 1, palette.text);
    updateSecondaryText("ZIAK", 1, palette.text);

    rotationValue.textContent = `${randomRotation}°`;
    positionXValue.textContent = randomX.toFixed(1);
    positionYValue.textContent = randomY.toFixed(1);
    scaleValue.textContent = randomScale.toFixed(1);
    metalnessValue.textContent = randomMetal.toFixed(2);
    roughnessValue.textContent = randomRough.toFixed(2);

    if (maskModel) {
      maskModel.rotation.y = (randomRotation * Math.PI) / 180;
      maskModel.position.x = randomX;
      maskModel.position.y = randomY;
      const box = new THREE.Box3().setFromObject(maskModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = 1.2 / maxDim;
      maskModel.scale.set(
        baseScale * randomScale,
        baseScale * randomScale,
        baseScale * randomScale
      );
    }

    if (maskMaterial) {
      maskMaterial.metalness = randomMetal;
      maskMaterial.roughness = randomRough;
    }
  });

  const downloadBtn = section.querySelector(
    "#download-cover"
  ) as HTMLButtonElement;
  downloadBtn.addEventListener("click", () => {
    const originalSize = {
      width: renderer.domElement.width,
      height: renderer.domElement.height,
    };
    renderer.setSize(3000, 3000);
    renderer.render(scene, camera);

    const dataURL = renderer.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "la-forge-cover.png";
    link.href = dataURL;
    link.click();

    renderer.setSize(originalSize.width, originalSize.height);
  });

  const toggleGridBtn = section.querySelector(
    "#toggle-grid"
  ) as HTMLButtonElement;
  const grid = section.querySelector("#composition-grid") as HTMLElement;
  let gridVisible = false;

  toggleGridBtn.addEventListener("click", () => {
    gridVisible = !gridVisible;
    grid.style.opacity = gridVisible ? "1" : "0";
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", updateSize);
  const resizeObserver = new ResizeObserver(() => updateSize());
  resizeObserver.observe(container);

  const presetsContainerAdvanced = section.querySelector(
    "#presets-container-advanced"
  ) as HTMLElement;
  const showAdvancedContentBtn = section.querySelector(
    "#show-advanced-content"
  ) as HTMLButtonElement;
  let advancedContentVisible = false;

  showAdvancedContentBtn.addEventListener("click", () => {
    advancedContentVisible = !advancedContentVisible;
    showAdvancedContentBtn.textContent = advancedContentVisible
      ? "Options avancées ⏶"
      : "Options avancées ⏷";
    presetsContainerAdvanced.style.display = advancedContentVisible
      ? "block"
      : "none";
  });

  return section;
}
