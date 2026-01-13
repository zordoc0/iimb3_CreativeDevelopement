export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 w-full z-20 px-8 py-6';
  
  header.innerHTML = `
    <nav class="flex justify-between items-center">
      <h1 class="text-white text-xl leading-none font-poppins uppercase font-bold">La Forge</h1>
      <div class="flex gap-6">
        <a href="#" class="text-red-500 text-sm uppercase font-poppins">Accueil</a>
        <a href="#" class="text-red-500 text-sm uppercase font-poppins">Cover</a>
        <a href="#" class="text-red-500 text-sm uppercase font-poppins">Tracklist</a>
      </div>
    </nav>
  `;
  
  return header;
}
