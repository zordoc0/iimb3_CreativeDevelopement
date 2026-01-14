import { createTrackSection } from './TrackSection';

export function createTracklistSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'w-full min-h-screen flex flex-col items-center bg-black relative';

  const tracks = [
    { title: "1.L'ENNEMI", producer: 'RosalieDu38', studio: 'Studio Empire' },
    { title: '2.LA FORGE', producer: 'Seezy', studio: 'Studio Empire' },
    { title: "3.LA REUSSITE OU L'OUBLI", producer: 'Flem', studio: 'Studio Empire' },
    { title: '4.UN VRAI COUTEAU', producer: 'Hologram Lo', studio: 'Studio Empire' },
    { title: '5.OUTRO', producer: 'Kant', studio: 'Studio Empire' },
  ];

  tracks.forEach((track) => {
    const trackElem = createTrackSection(track.title, track.producer, track.studio);
    section.appendChild(trackElem);
  });

  return section;
}
