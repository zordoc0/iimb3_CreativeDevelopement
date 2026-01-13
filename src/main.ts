import "./style.css";
import { createHeader } from "./components/Header";
import { createHeroSection } from "./components/HeroSection";

const header = createHeader();
const heroSection = createHeroSection();

document.body.appendChild(header);
document.body.appendChild(heroSection);
