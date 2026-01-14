export function createTrackSection(
  title: string,
  producer: string,
  trackNumber: number,
  videoUrl: string = "/bg-video.mp4"
): HTMLElement {
  const section = document.createElement("section");

  section.className = `
    w-full border-t border-white/10 
    hover:border-white/40 
    transition-all duration-300
    group cursor-pointer
    relative overflow-hidden
  `;

  section.innerHTML = `
    <video 
      class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
      muted
      loop
      playsinline
    >
      <source src="${videoUrl}" type="video/mp4">
    </video>

    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div class="py-12 flex items-center justify-between gap-8 relative z-10">
      
      <div class="text-6xl md:text-8xl font-anton text-white/20 group-hover:text-white transition-all duration-500 min-w-[120px] md:min-w-[180px]">
        ${trackNumber.toString().padStart(2, "0")}
      </div>
      
      <div class="flex-1">
        <h3 class="text-4xl md:text-6xl lg:text-7xl font-anton uppercase text-white leading-none tracking-tighter group-hover:tracking-normal transition-all duration-500">
          ${title}
        </h3>
      </div>
      
      <div class="hidden md:flex flex-col items-end gap-2 min-w-[200px]">
        <p class="text-sm text-white/40 uppercase tracking-[0.3em] font-poppins group-hover:text-white/60 transition-colors">
          ${producer}
        </p>
        <div class="w-16 h-px bg-white/20 group-hover:w-24 group-hover:bg-white/60 transition-all duration-500"></div>
      </div>
      
      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  `;


  const video = section.querySelector("video") as HTMLVideoElement;

  section.addEventListener("mouseenter", () => {
    if (video) {
      video.currentTime = 0; 
      video.play().catch(() => {
      });
    }
  });

  section.addEventListener("mouseleave", () => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  return section;
}
