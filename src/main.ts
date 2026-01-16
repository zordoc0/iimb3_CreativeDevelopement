import "./style.css";
import { createLoader } from "./components/Loader";
import { createHeader } from "./components/Header";
import { createHeroSection } from "./components/HeroSection";
import { createTracklistSection } from "./components/TracklistSection";
import { createCoverSection } from "./components/CoverSection";
import { createFooter } from "./components/Footer";

const loader = createLoader();
document.body.appendChild(loader);

const header = createHeader();
const heroSection = createHeroSection();
const tracklistSection = createTracklistSection();
const coverSection = createCoverSection();
const footer = createFooter();

document.body.appendChild(header);
document.body.appendChild(heroSection);
document.body.appendChild(tracklistSection);
document.body.appendChild(coverSection);
document.body.appendChild(footer);
