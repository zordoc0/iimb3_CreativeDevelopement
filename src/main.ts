import "./style.css";
import { createHeader } from "./components/Header";
import { createHeroSection } from "./components/HeroSection";
import { createTracklistSection } from "./components/TracklistSection";

const header = createHeader();
const heroSection = createHeroSection();
const tracklistSection = createTracklistSection();


document.body.appendChild(header);
document.body.appendChild(heroSection);
document.body.appendChild(tracklistSection);