// Système de gestion du chargement global
class LoadingManager {
private static instance: LoadingManager;
private totalAssets: number = 0;
private loadedAssets: number = 0;
private callbacks: ((progress: number) => void)[] = [];
private completeCallbacks: (() => void)[] = [];
private isComplete: boolean = false;
private startTime: number = Date.now();
private readonly MIN_DISPLAY_TIME: number = 100;

static getInstance(): LoadingManager {
    if (!LoadingManager.instance) {
    LoadingManager.instance = new LoadingManager();
    }
    return LoadingManager.instance;
}

registerAsset(): void {
    this.totalAssets++;
}

assetLoaded(): void {
    this.loadedAssets++;
    const progress =
    this.totalAssets > 0 ? (this.loadedAssets / this.totalAssets) * 100 : 0;
    this.callbacks.forEach((cb) => cb(progress));

    if (this.loadedAssets >= this.totalAssets && !this.isComplete) {
    this.isComplete = true;
    const elapsedTime = Date.now() - this.startTime;
    const remainingTime = Math.max(0, this.MIN_DISPLAY_TIME - elapsedTime);

    setTimeout(() => {
        this.completeCallbacks.forEach((cb) => cb());
    }, remainingTime + 300);
    }
}

onProgress(callback: (progress: number) => void): void {
    this.callbacks.push(callback);
}

onComplete(callback: () => void): void {
    this.completeCallbacks.push(callback);
}

getProgress(): number {
    return this.totalAssets > 0
    ? (this.loadedAssets / this.totalAssets) * 100
    : 0;
}

reset(): void {
    this.startTime = Date.now();
}
}

export const loadingManager = LoadingManager.getInstance();

export function createLoader(): HTMLElement {
document.body.style.overflow = "hidden";

const loader = document.createElement("div");
loader.id = "forge-loader";
loader.className =
    "fixed inset-0 z-[9999] flex items-center justify-center bg-black";

loader.innerHTML = `
    <div class="relative z-10 flex flex-col items-center">
    
    <div class="relative mb-16">
        <h1 class="font-black text-white text-6xl md:text-8xl font-anton uppercase tracking-tighter leading-none">
        LA FORGE
        </h1>
    </div>
    
    <div class="relative w-48 md:w-64">
        <div class="h-px bg-white/10 w-full">
        <div id="progress-bar" class="h-full bg-white w-0 transition-all duration-200 ease-out"></div>
        </div>
    
        <div class="flex justify-end mt-4">
        <span id="progress-percent" class="text-white/60 text-xs font-mono tracking-widest">0%</span>
        </div>

        <div class="w-full flex items-center justify-between mt-4 gap-2 pt-4">
            <p class="text-white/80 text-s font-poppins tracking-widest">ZIAK</p>   
            <p class="text-white/80 text-s font-poppins tracking-widest">-</p>   
            <p class="text-white/80 text-s font-poppins tracking-widest">17/01/2026</p>
        </div>
    </div>
    
    </div>
    
    <div class="absolute bottom-8 left-8 text-white/20 text-[9px] font-mono uppercase tracking-[0.3em] loader-fade-minimal" style="--delay: 0.8s">
    ZIAK
    </div>
    
    <div class="absolute bottom-8 right-8 text-white/20 text-[9px] font-mono uppercase tracking-[0.3em] loader-fade-minimal" style="--delay: 1s">
    17.01.2026
    </div>
`;

const progressBar = loader.querySelector("#progress-bar") as HTMLElement;
const progressPercent = loader.querySelector(
    "#progress-percent"
) as HTMLElement;

function updateProgress(progress: number) {
    const clampedProgress = Math.min(100, Math.max(0, progress));
    progressBar.style.width = `${clampedProgress}%`;
    progressPercent.textContent = `${Math.round(clampedProgress)}%`;
}

function hideLoader() {
    loader.classList.add("loader-exit-minimal");
    setTimeout(() => {
    loader.remove();
    document.body.style.overflow = "";
    }, 800);
}

loadingManager.reset();

let displayProgress = 0;
let isClosing = false;

const progressInterval = setInterval(() => {
    if (isClosing) return;

    const actualProgress = loadingManager.getProgress();

    if (displayProgress < actualProgress) {
    displayProgress += Math.min(5, (actualProgress - displayProgress) * 0.3);
    }

    if (actualProgress === 0 && displayProgress < 85) {
    displayProgress += Math.random() * 2;
    }

    updateProgress(Math.min(displayProgress, 99));
}, 50);

function closeLoader() {
    if (isClosing) return;
    isClosing = true;
    clearInterval(progressInterval);
    updateProgress(100);
    setTimeout(hideLoader, 400);
}

loadingManager.onComplete(() => {
    closeLoader();
});

setTimeout(() => {
    if (loadingManager.getProgress() === 0) {
    closeLoader();
    }
}, 3000);

return loader;
}
