export function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "w-full py-12 mt-16 border-t border-white/10 bg-black/50";
  footer.innerHTML = `
    <div class="w-11/12 max-w-7xl mx-auto">
      <!-- Navigation principale -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <!-- Logo / Marque -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-2xl font-bold tracking-wider">ZIAK</h3>
          <p class="text-white/50 text-sm font-poppins leading-relaxed">
            La musique qui transcende les frontières. Découvrez l'univers unique de ZIAK.
          </p>
        </div>

        <!-- Navigation -->
        <div class="flex flex-col gap-3">
          <h4 class="text-white text-sm font-bold uppercase tracking-widest mb-2">Navigation</h4>
          <a href="#home" class="relative w-fit text-white/60 hover:text-white transition text-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Accueil</a>
          <a href="#tracklist" class="relative w-fit text-white/60 hover:text-white transition text-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Discographie</a>
          <a href="#cover" class="relative w-fit text-white/60 hover:text-white transition text-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Concerts</a>
        </div>

        <!-- Réseaux sociaux -->
        <div class="flex flex-col gap-3">
          <h4 class="text-white text-sm font-bold uppercase tracking-widest mb-2">Réseaux</h4>
          <a href="https://www.instagram.com/ziakimbo/" target="_blank" rel="noopener" class="relative w-fit text-white/60 hover:text-white transition text-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Instagram</a>
          <a href="http://youtube.com/@ZiakCC" target="_blank" rel="noopener" class="relative w-fit text-white/60 hover:text-white transition text-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">YouTube</a>
          <a href="https://open.spotify.com/intl-fr/artist/2ubn2zwyYaLdHOCKnTouU2" target="_blank" rel="noopener" class="relative w-fit text-white/60 hover:text-white transition text-sm after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Spotify</a>
        </div>

        <!-- Contact -->
        <div class="flex flex-col gap-3">
          <h4 class="text-white text-sm font-bold uppercase tracking-widest mb-2">Contact</h4>
          <p class="text-white/60 text-sm">contact@laforge.com</p>
          <p class="text-white/60 text-sm">Grigny, France</p>
          <p class="text-white/60 text-sm">Management : 17sx@laforge.com</p>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/40 text-xs uppercase font-poppins tracking-widest">
          &copy; 2024 LA FORGE | ZIAK. Tous droits réservés.
        </p>
        <div class="flex gap-6">
          <a href="#mentions" class="relative w-fit text-white/40 hover:text-white/60 transition text-xs after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full">Mentions légales</a>
          <a href="#privacy" class="relative w-fit text-white/40 hover:text-white/60 transition text-xs after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full">Confidentialité</a>
        </div>
      </div>
    </div>
  `;
  return footer;
}