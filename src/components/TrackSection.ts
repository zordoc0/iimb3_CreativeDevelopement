// Section Track : création DOM à la main comme les autres components
export function createTrackSection(title: string, producer: string, studio: string, align: 'left' | 'right' = 'left', trackNumber: number): HTMLElement {
  const section = document.createElement('section');
  
  /*section.className =
    'track-section w-full max-w-5xl my-8 p-8 rounded-xl text-white flex flex-col ' +
    (align === 'right' ? 'ml-auto items-end' : 'mr-auto items-start');
    section.innerHTML = `
    <h3 class="text-5xl font-mono font-bold mb-2 font-poppins">${title}</h3>
    <p class="text-lg mb-1 font-poppins">Prod. ${producer}</p>
    <p class="text-md font-poppins italic">Studio: ${studio}</p>
    `;*/
  const alignClass =
    align === 'right'
      ? 'items-end ml-auto text-right'
      : 'items-start mr-auto text-left';

    const divClass = 
        align === 'right'
            ? 'flex flex-row-reverse'
            : 'flex flex-row';

  section.className =
    `w-full text-white flex flex-col justify-center ${alignClass} bg-black/90 relative`;
  section.innerHTML = `
    <div class="${divClass} justify-between w-full mt-10 mb-2">
        <h3 class="text-[8rem] w-6xl ${align === 'right' ? 'text-right' : 'text-left'} font-extrabold font-poppins tracking-tighter leading-[0.8] mr-2">${title}</h3>
        <p class="text-[4rem] font-extrabold ${align === 'right' ? 'text-right' : 'text-left'} font-poppins ml-5 mr-5 tracking-tighter leading-none">${trackNumber}</p>
    </div>
    <p class="text-lg mb-1 mr-2 font-poppins">Prod. ${producer}</p>
    <p class="text-md font-poppins mr-2 italic">${studio}</p>
    <hr class="w-full border-t border-white mt-8" />
    `;

  return section;
}