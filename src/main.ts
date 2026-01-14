import "./style.css";
import { createHeader } from "./components/Header";
import { createHeroSection } from "./components/HeroSection";
import { createTracklistSection } from "./components/TracklistSection";
import { createCoverSection } from "./components/CoverSection";

const header = createHeader();
const heroSection = createHeroSection();
const tracklistSection = createTracklistSection();
const coverSection = createCoverSection();

document.body.appendChild(header);
document.body.appendChild(heroSection);
document.body.appendChild(tracklistSection);
document.body.appendChild(coverSection);
