import { createTrackSection } from './TrackSection';

export function createTracklistSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'w-full min-h-screen flex flex-col items-center bg-black relative';

  const tracks = [
    { title: "L'ENNEMI", producer: 'RosalieDu38', studio: 'Studio Empire' },
    { title: 'LA FORGE', producer: 'Seezy', studio: 'Studio Empire' },
    { title: "LA REUSSITE OU L'OUBLI", producer: 'Flem', studio: 'Studio Empire' },
    { title: 'UN VRAI COUTEAU', producer: 'Hologram Lo', studio: 'Studio Empire' },
    { title: 'OUTRO', producer: 'Flem', studio: 'Studio Empire' },
  ];

    tracks.forEach((track, i) => {
    const align = i % 2 === 0 ? 'left' : 'right';
    const trackElem = createTrackSection(track.title, track.producer, track.studio, align, i + 1);
    section.appendChild(trackElem);
  });

  return section;
}
