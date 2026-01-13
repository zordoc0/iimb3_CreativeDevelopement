export function createHeroSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'w-full h-full flex justify-center items-center relative';
  
  section.innerHTML = `
    <video autoplay muted loop playsinline class="fixed top-0 left-0 w-full h-full object-cover z-0 scale-150">
      <source src="/bg-video.mp4" type="video/mp4" class="w-full h-full object-cover ">
    </video>

    <div class="w-full h-full z-10 bg-black opacity-80 fixed top-0 left-0"></div>

    <div class="text-right bg-red-500 h-full flex justify-center items-center relative">
      <h2 class="text-white text-4xl font-poppins uppercase font-bold mb-2">Ziak - La Forge</h2>
      <p class="text-white text-lg font-poppins">13/01/2026</p>
    </div>
  `;
  
  return section;
}
