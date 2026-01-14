import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function createCoverSection(): HTMLElement {
  const section = document.createElement("section");
  section.id = "cover";
  section.className =
    "w-full min-h-screen flex justify-center items-center relative overflow-hidden bg-black py-20";

  section.innerHTML = `
    <div class="w-full max-w-7xl mx-auto px-8 z-10 relative">
      <div class="mb-12 text-center relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-15 pointer-events-none">
          <img 
            src="/dither_anvil.png" 
            alt="Decoration" 
            class="w-full h-full object-contain mix-blend-screen animate-pulse-slow"
          />
        </div>
        <div class="relative z-10">
          <div class="text-white/40 text-xs uppercase tracking-[0.5em] mb-4 font-poppins">Album Cover Generator</div>
          <h2 class="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter font-anton">LA FORGE</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        <div class="lg:col-span-3">
          <div class="relative aspect-square bg-black border border-white/10 overflow-hidden group">
            <div id="cover-canvas-container" class="w-full h-full"></div>
            
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

          <div class="mt-4 flex gap-3 justify-center flex-wrap">
            <button id="download-cover" class="px-6 py-2.5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white/90 transition-all">
              Télécharger
            </button>
            <button id="toggle-grid" class="px-5 py-2.5 border border-white/20 text-white/70 font-bold uppercase text-[10px] tracking-[0.3em] hover:border-white hover:text-white transition-all">
              Grille
            </button>
            <button id="randomize" class="px-5 py-2.5 border border-white/20 text-white/70 font-bold uppercase text-[10px] tracking-[0.3em] hover:border-white hover:text-white transition-all">
              Aléatoire
            </button>
          </div>
        </div>

        <div class="lg:col-span-2">
          
          <div class="border border-white/10 bg-white/2 mb-4">
            <div class="flex border-b border-white/10">
              <button id="tab-background" class="flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white bg-white/10 border-b-2 border-white transition-all">
                Fond
              </button>
              <button id="tab-mask" class="flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white/40 hover:text-white/60 transition-all">
                Masque
              </button>
              <button id="tab-material" class="flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white/40 hover:text-white/60 transition-all">
                Matériau
              </button>
            </div>

            <div id="tab-content-background" class="p-6 space-y-4">
              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Type</label>
                <select id="background-type" class="w-full bg-black border border-white/20 text-white p-2 text-[10px] uppercase tracking-wider">
                  <option value="solid">Couleur Unie</option>
                  <option value="gradient">Dégradé</option>
                  <option value="noise">Bruit</option>
                  <option value="grid">Grille</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Couleur 1</label>
                  <div class="flex gap-2">
                    <input type="color" id="bg-color1" value="#000000" class="w-10 h-10 bg-transparent border border-white/20 cursor-pointer">
                    <input type="text" id="bg-color1-hex" value="#000000" class="flex-1 bg-black border border-white/20 text-white p-2 text-[10px] font-mono">
                  </div>
                </div>

                <div id="color2-container" style="display: none;">
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Couleur 2</label>
                  <div class="flex gap-2">
                    <input type="color" id="bg-color2" value="#1a1a1a" class="w-10 h-10 bg-transparent border border-white/20 cursor-pointer">
                    <input type="text" id="bg-color2-hex" value="#1a1a1a" class="flex-1 bg-black border border-white/20 text-white p-2 text-[10px] font-mono">
                  </div>
                </div>
              </div>

              <div id="gradient-angle-container" style="display: none;">
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Angle <span class="text-white/40 font-mono" id="gradient-angle-value">0°</span></label>
                <input type="range" id="gradient-angle" min="0" max="360" value="0" 
                       class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Couleur Texte</label>
                <div class="flex gap-2">
                  <input type="color" id="text-color" value="#ffffff" class="w-10 h-10 bg-transparent border border-white/20 cursor-pointer">
                  <input type="text" id="text-color-hex" value="#ffffff" class="flex-1 bg-black border border-white/20 text-white p-2 text-[10px] font-mono">
                </div>
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Opacité Texte <span class="text-white/40 font-mono" id="text-opacity-value">0.95</span></label>
                <input type="range" id="text-opacity" min="0" max="1" step="0.05" value="0.95" 
                       class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
              </div>
            </div>

            <div id="tab-content-mask" class="p-6 space-y-4" style="display: none;">
              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Modèle</label>
                <div class="grid grid-cols-2 gap-2">
                  <button id="mask-ziak" class="px-4 py-3 border border-white/40 bg-white/10 text-white/90 text-[10px] uppercase tracking-wider font-bold hover:bg-white/20 transition-all">
                    Ziak
                  </button>
                  <button id="mask-zzz" class="px-4 py-3 border border-white/20 text-white/40 text-[10px] uppercase tracking-wider font-bold hover:border-white/40 hover:text-white/60 transition-all">
                    ZZZ
                  </button>
                </div>
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Rotation <span class="text-white/40 font-mono" id="rotation-value">0°</span></label>
                <input type="range" id="rotation-control" min="0" max="360" value="0" 
                       class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Position X <span class="text-white/40 font-mono" id="position-x-value">0.5</span></label>
                  <input type="range" id="position-x-control" min="-1.5" max="1.5" step="0.1" value="0.5" 
                         class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
                </div>

                <div>
                  <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Position Y <span class="text-white/40 font-mono" id="position-y-value">0.0</span></label>
                  <input type="range" id="position-y-control" min="-1.5" max="1.5" step="0.1" value="0" 
                         class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
                </div>
              </div>

              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Échelle <span class="text-white/40 font-mono" id="scale-value">1.2</span></label>
                <input type="range" id="scale-control" min="0.5" max="1.8" step="0.1" value="1.2" 
                       class="w-full h-1 bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer">
              </div>
            </div>

            <div id="tab-content-material" class="p-6 space-y-4" style="display: none;">
              <div>
                <label class="text-white/80 text-[10px] uppercase tracking-wider font-bold mb-2 block">Intensité Chrome <span class="text-white/40 font-mono" id="metalness-value">1.00</span></label>
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

  function generateBackground(
    type: string,
    color1: string,
    color2: string,
    angle: number
  ) {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    switch (type) {
      case "solid":
        bgCtx.fillStyle = color1;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        break;

      case "gradient":
        const rad = (angle * Math.PI) / 180;
        const x1 = bgCanvas.width / 2 + Math.cos(rad) * bgCanvas.width;
        const y1 = bgCanvas.height / 2 + Math.sin(rad) * bgCanvas.height;
        const x2 = bgCanvas.width / 2 - Math.cos(rad) * bgCanvas.width;
        const y2 = bgCanvas.height / 2 - Math.sin(rad) * bgCanvas.height;

        const gradient = bgCtx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        break;

      case "noise":
        bgCtx.fillStyle = color1;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        const imageData = bgCtx.getImageData(
          0,
          0,
          bgCanvas.width,
          bgCanvas.height
        );
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 50 - 25;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
        bgCtx.putImageData(imageData, 0, 0);
        break;

      case "grid":
        bgCtx.fillStyle = color1;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        bgCtx.strokeStyle = color2;
        bgCtx.lineWidth = 2;
        const gridSize = 100;
        for (let x = 0; x < bgCanvas.width; x += gridSize) {
          bgCtx.beginPath();
          bgCtx.moveTo(x, 0);
          bgCtx.lineTo(x, bgCanvas.height);
          bgCtx.stroke();
        }
        for (let y = 0; y < bgCanvas.height; y += gridSize) {
          bgCtx.beginPath();
          bgCtx.moveTo(0, y);
          bgCtx.lineTo(bgCanvas.width, y);
          bgCtx.stroke();
        }
        break;
    }

    bgTexture.needsUpdate = true;
  }

  generateBackground("solid", "#000000", "#1a1a1a", 0);

  let maskModel: THREE.Group;
  let maskMaterial: THREE.MeshStandardMaterial;
  const loader = new GLTFLoader();

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
      "px-4 py-3 border border-white/40 bg-white/10 text-white/90 text-xs uppercase tracking-wider font-bold hover:bg-white/20 transition-all";
    inactiveBtn.className =
      "px-4 py-3 border border-white/20 text-white/40 text-xs uppercase tracking-wider font-bold hover:border-white/40 hover:text-white/60 transition-all";

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
      },
      undefined,
      (error) => console.error("Erreur chargement masque:", error)
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
  const bgColor1Hex = section.querySelector(
    "#bg-color1-hex"
  ) as HTMLInputElement;
  const bgColor2Input = section.querySelector("#bg-color2") as HTMLInputElement;
  const bgColor2Hex = section.querySelector(
    "#bg-color2-hex"
  ) as HTMLInputElement;
  const color2Container = section.querySelector(
    "#color2-container"
  ) as HTMLElement;
  const gradientAngleContainer = section.querySelector(
    "#gradient-angle-container"
  ) as HTMLElement;
  const gradientAngleInput = section.querySelector(
    "#gradient-angle"
  ) as HTMLInputElement;
  const gradientAngleValue = section.querySelector(
    "#gradient-angle-value"
  ) as HTMLElement;

  const textOpacityInput = section.querySelector(
    "#text-opacity"
  ) as HTMLInputElement;
  const textOpacityValue = section.querySelector(
    "#text-opacity-value"
  ) as HTMLElement;
  const textColorInput = section.querySelector(
    "#text-color"
  ) as HTMLInputElement;
  const textColorHex = section.querySelector(
    "#text-color-hex"
  ) as HTMLInputElement;

  bgTypeSelect.addEventListener("change", (e) => {
    const type = (e.target as HTMLSelectElement).value;

    if (type === "gradient") {
      color2Container.style.display = "block";
      gradientAngleContainer.style.display = "block";
    } else if (type === "grid") {
      color2Container.style.display = "block";
      gradientAngleContainer.style.display = "none";
    } else {
      color2Container.style.display = "none";
      gradientAngleContainer.style.display = "none";
    }

    generateBackground(
      type,
      bgColor1Input.value,
      bgColor2Input.value,
      parseFloat(gradientAngleInput.value)
    );
  });

  bgColor1Input.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    bgColor1Hex.value = value;
    generateBackground(
      bgTypeSelect.value,
      value,
      bgColor2Input.value,
      parseFloat(gradientAngleInput.value)
    );
  });

  bgColor1Hex.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      bgColor1Input.value = value;
      generateBackground(
        bgTypeSelect.value,
        value,
        bgColor2Input.value,
        parseFloat(gradientAngleInput.value)
      );
    }
  });

  bgColor2Input.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    bgColor2Hex.value = value;
    generateBackground(
      bgTypeSelect.value,
      bgColor1Input.value,
      value,
      parseFloat(gradientAngleInput.value)
    );
  });

  bgColor2Hex.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      bgColor2Input.value = value;
      generateBackground(
        bgTypeSelect.value,
        bgColor1Input.value,
        value,
        parseFloat(gradientAngleInput.value)
      );
    }
  });

  gradientAngleInput.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    gradientAngleValue.textContent = `${value}°`;
    generateBackground(
      bgTypeSelect.value,
      bgColor1Input.value,
      bgColor2Input.value,
      value
    );
  });

  textColorInput.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    textColorHex.value = value;
    updateMainText("LA FORGE", parseFloat(textOpacityInput.value), value);
    updateSecondaryText("ZIAK", parseFloat(textOpacityInput.value), value);
  });

  textColorHex.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).value;
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      textColorInput.value = value;
      updateMainText("LA FORGE", parseFloat(textOpacityInput.value), value);
      updateSecondaryText("ZIAK", parseFloat(textOpacityInput.value), value);
    }
  });

  textOpacityInput.addEventListener("input", (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    textOpacityValue.textContent = value.toFixed(2);
    updateMainText("LA FORGE", value, textColorInput.value);
    updateSecondaryText("ZIAK", value, textColorInput.value);
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

  const tabBackground = section.querySelector(
    "#tab-background"
  ) as HTMLButtonElement;
  const tabMask = section.querySelector("#tab-mask") as HTMLButtonElement;
  const tabMaterial = section.querySelector(
    "#tab-material"
  ) as HTMLButtonElement;

  const tabContentBackground = section.querySelector(
    "#tab-content-background"
  ) as HTMLElement;
  const tabContentMask = section.querySelector(
    "#tab-content-mask"
  ) as HTMLElement;
  const tabContentMaterial = section.querySelector(
    "#tab-content-material"
  ) as HTMLElement;

  function switchTab(activeTab: HTMLButtonElement, activeContent: HTMLElement) {
    [tabBackground, tabMask, tabMaterial].forEach((tab) => {
      tab.className =
        "flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white/40 hover:text-white/60 transition-all";
    });
    [tabContentBackground, tabContentMask, tabContentMaterial].forEach(
      (content) => {
        content.style.display = "none";
      }
    );

    activeTab.className =
      "flex-1 px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-white bg-white/10 border-b-2 border-white transition-all";
    activeContent.style.display = "block";
  }

  tabBackground.addEventListener("click", () =>
    switchTab(tabBackground, tabContentBackground)
  );
  tabMask.addEventListener("click", () => switchTab(tabMask, tabContentMask));
  tabMaterial.addEventListener("click", () =>
    switchTab(tabMaterial, tabContentMaterial)
  );

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

  const randomizeBtn = section.querySelector("#randomize") as HTMLButtonElement;
  randomizeBtn.addEventListener("click", () => {
    const randomRotation = Math.floor(Math.random() * 360);
    const randomX = Math.random() * 2.4 - 1.2;
    const randomY = Math.random() * 2.4 - 1.2;
    const randomScale = 0.7 + Math.random() * 1.0;

    rotationControl.value = randomRotation.toString();
    positionXControl.value = randomX.toFixed(1);
    positionYControl.value = randomY.toFixed(1);
    scaleControl.value = randomScale.toFixed(1);

    rotationControl.dispatchEvent(new Event("input"));
    positionXControl.dispatchEvent(new Event("input"));
    positionYControl.dispatchEvent(new Event("input"));
    scaleControl.dispatchEvent(new Event("input"));

    const types = ["solid", "gradient", "noise", "grid"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    bgTypeSelect.value = randomType;

    const generateDarkColor = () => {
      const r = Math.floor(Math.random() * 120);
      const g = Math.floor(Math.random() * 120);
      const b = Math.floor(Math.random() * 120);
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    };

    const randomColor1 = generateDarkColor();
    const randomColor2 = generateDarkColor();
    const randomAngle = Math.floor(Math.random() * 360);

    bgColor1Input.value = randomColor1;
    bgColor1Hex.value = randomColor1;
    bgColor2Input.value = randomColor2;
    bgColor2Hex.value = randomColor2;
    gradientAngleInput.value = randomAngle.toString();
    gradientAngleValue.textContent = `${randomAngle}°`;

    bgTypeSelect.dispatchEvent(new Event("change"));
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", updateSize);
  const resizeObserver = new ResizeObserver(() => updateSize());
  resizeObserver.observe(container);

  return section;
}
