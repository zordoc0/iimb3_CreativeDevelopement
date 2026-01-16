export function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "w-full py-16 mt-16 relative overflow-hidden";
  footer.innerHTML = `
    <!-- Background animé -->
    <div class="absolute inset-0"></div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"></div>
    
    <div class="relative z-10 w-11/12 max-w-6xl mx-auto">
      <!-- Message créatif principal -->
      <div class="text-center mb-12">
        <p class="text-white/30 text-sm uppercase tracking-[0.3em] mb-4">ZIAK</p>
        <h3 class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r text-white mb-3 tracking-tighter">
          LA FORGE
        </h3>
        <p class="text-white/50 text-lg font-light max-w-md mx-auto">
          Nouvel album disponible le 17 Janvier.
        </p>
      </div>

      <!-- Footer minimal -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p class="text-white/30 text-xs">
          For the culture
        </p>
        <p class="text-white/20 text-xs">
          &copy; 2024 ZIAK × LA FORGE — 
        </p>
      </div>
    </div>
  `;
  return footer;
}