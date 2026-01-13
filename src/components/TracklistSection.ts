import { createTrackSection } from './TrackSection';

export function createTracklistSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'w-full min-h-screen flex flex-col items-center bg-black relative';
  section.innerHTML = `
    <video autoplay muted loop playsinline class="fixed top-0 left-0 w-full h-full object-cover z-0 scale-150">
      <source src="/bg-video.mp4" type="video/mp4" class="w-full h-full object-cover ">
    </video>
    `;

  // Exemple de données de tracks
  const tracks = [
    { title: "1.L'ENNEMI", producer: 'RosalieDu38', studio: 'Studio Empire' },
    { title: '2.LA FORGE', producer: 'Seezy', studio: 'Studio Empire' },
    { title: "3.LA REUSSITE OU L'OUBLI", producer: 'Flem', studio: 'Studio Empire' },
    { title: '4.UN VRAI COUTEAU', producer: 'Hologram Lo', studio: 'Studio Empire' },
    { title: '5.OUTRO', producer: 'Kant', studio: 'Studio Empire' },
  ];

  tracks.forEach((track, i) => {
    const align = i % 2 === 0 ? 'left' : 'right';
    const trackElem = createTrackSection(track.title, track.producer, track.studio, align);
    section.appendChild(trackElem);
  });

  return section;
}
