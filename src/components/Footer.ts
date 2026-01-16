export function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "w-full py-16 mt-16 relative overflow-hidden";
  footer.innerHTML = `
    <!-- Background animé -->
    <div class="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-black to-black"></div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
    
    <div class="relative z-10 w-11/12 max-w-6xl mx-auto">
      <!-- Message créatif principal -->
      <div class="text-center mb-12">
        <p class="text-white/30 text-sm uppercase tracking-[0.3em] mb-4">ZIAK</p>
        <h3 class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-6">
          LA FORGE🔥
        </h3>
        <p class="text-white/50 text-lg font-light max-w-md mx-auto">
          Nouvel album disponible le 17 Janvier.
        </p>
      </div>

      <!-- Réseaux sociaux stylisés -->
      <div class="flex justify-center gap-6 mb-12">
        <a href="https://www.instagram.com/ziakimbo/" target="_blank" rel="noopener" 
           class="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600/30 hover:border-purple-500/50 hover:scale-110 transition-all duration-300">
          <svg class="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <img src="/instagram-icon.svg" alt="Instagram" />
          </svg>
        </a>
        <a href="http://youtube.com/@ZiakCC" target="_blank" rel="noopener"
           class="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600/30 hover:border-red-500/50 hover:scale-110 transition-all duration-300">
          <svg class="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <img src="/youtube-icon.svg" alt="YouTube"/>
          </svg>
        </a>
        <a href="https://open.spotify.com/intl-fr/artist/2ubn2zwyYaLdHOCKnTouU2" target="_blank" rel="noopener"
           class="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-600/30 hover:border-green-500/50 hover:scale-110 transition-all duration-300">
          <svg class="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <img src="/spotify-icon.svg" alt="Spotify"/>
          </svg>
        </a>
      </div>

      <!-- Texte défilant -->
      <div class="overflow-hidden py-4 mb-8 border-y border-white/5">
        <div class="flex animate-marquee whitespace-nowrap">
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">ZIAK</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">L'ENNEMI</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">LA FORGE</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">LA REUSSITE OU L'OUBLI</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">UN VRAI COUTEAU</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">OUTRO</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">LA FORGE</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
          <span class="text-white/10 text-xl font-black uppercase tracking-widest mx-8">AKIMBO</span>
          <span class="text-purple-500/30 text-xl mx-4">✦</span>
        </div>
      </div>

      <!-- Footer minimal -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p class="text-white/30 text-xs">
          For the culture
        </p>
        <p class="text-white/20 text-xs">
          &copy; 2024 ZIAK × LA FORGE — UHEH
        </p>
      </div>
    </div>
  `;
  return footer;
}