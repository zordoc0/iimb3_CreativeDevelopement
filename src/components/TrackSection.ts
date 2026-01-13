// Section Track : création DOM à la main comme les autres components
export function createTrackSection(title: string, producer: string, studio: string): HTMLElement {
  const section = document.createElement('section');
  
  /*section.className =
    'track-section w-full max-w-5xl my-8 p-8 rounded-xl text-white flex flex-col ' +
    (align === 'right' ? 'ml-auto items-end' : 'mr-auto items-start');
    section.innerHTML = `
    <h3 class="text-5xl font-mono font-bold mb-2 font-poppins">${title}</h3>
    <p class="text-lg mb-1 font-poppins">Prod. ${producer}</p>
    <p class="text-md font-poppins italic">Studio: ${studio}</p>
    `;*/

  section.className = 'w-full p-8 text-white flex flex-col justify-center items-center pb-52 pt-52 bg-black/90 relative'; 
  section.innerHTML = `
    <h3 class="text-[8rem] w-6xl text-center font-mono font-bold mb-2 font-poppins">${title}</h3>
    <p class="text-lg mb-1 font-poppins">Prod. ${producer}</p>
    <p class="text-md font-poppins italic">Studio: ${studio}</p>
    `;

  return section;
}