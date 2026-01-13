export function createHeader(): HTMLElement {
  const header = document.createElement("header");
  header.className = "fixed top-0 left-0 w-full z-20 px-8 py-6";

  header.innerHTML = `
    <nav class="flex justify-between items-center">
      <h1 class="text-white text-xl leading-none font-poppins uppercase font-bold tracking-[0.2em]">Void</h1>
      <div class="flex gap-8">
        <a href="#" class="text-white/60 text-[10px] uppercase font-poppins tracking-widest hover:text-white transition-colors">Accueill</a>
        <a href="#" class="text-white/60 text-[10px] uppercase font-poppins tracking-widest hover:text-white transition-colors">Tracklist</a>
        <a href="#" class="text-white/60 text-[10px] uppercase font-poppins tracking-widest hover:text-white transition-colors">Cover</a>
      </div>
    </nav>
  `;

  return header;
}
