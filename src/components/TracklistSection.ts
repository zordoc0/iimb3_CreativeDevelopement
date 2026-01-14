import { createTrackSection } from "./TrackSection";

export function createTracklistSection(): HTMLElement {
  const section = document.createElement("section");
  section.id = "tracklist";
  section.className = "w-full min-h-screen bg-black py-32 px-8";

  const header = document.createElement("div");
  header.className = "w-full max-w-[1400px] mx-auto mb-32 relative";
  header.innerHTML = `


    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
      <img 
        src="/glockdither.png" 
        alt="Decoration" 
        class="w-full h-full object-contain mix-blend-screen"
      />
    </div>

    <div class="relative z-10">
      <h2 class="bold text-[15vw] md:text-[12rem] font-anton uppercase text-white leading-none tracking-tighter">
        TRACKS
      </h2>
    </div>
  `;
  section.appendChild(header);

  const tracksContainer = document.createElement("div");
  tracksContainer.className = "w-full max-w-[1400px] mx-auto space-y-0";

  const tracks = [
    { title: "L'ENNEMI", producer: "RosalieDu38", videoUrl: "/1.mp4" },

    { title: "LA FORGE", producer: "Seezy", videoUrl: "/2.mp4" },
    {
      title: "LA REUSSITE OU L'OUBLI",
      producer: "Flem",
      videoUrl: "/3.mp4",
    },
    {
      title: "UN VRAI COUTEAU",
      producer: "Hologram Lo",
      videoUrl: "/4.mp4",
    },
    { title: "OUTRO", producer: "Flem", videoUrl: "/5.mp4" },
  ];

  tracks.forEach((track, i) => {
    const trackElem = createTrackSection(
      track.title,
      track.producer,
      i + 1,
      track.videoUrl
    );
    tracksContainer.appendChild(trackElem);
  });

  section.appendChild(tracksContainer);

  return section;
}
