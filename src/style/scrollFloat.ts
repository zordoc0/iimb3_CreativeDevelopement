import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createScrollFloatText(
  text: string,
  tag: string = 'h3',
  className: string = ''
): HTMLElement {
  const el = document.createElement(tag);
  el.className = `scroll-float ${className}`;
  el.style.overflow = 'hidden';

  const span = document.createElement('span');
  span.className = 'scroll-float-text';
  for (const char of text) {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = char === ' ' ? '\u00A0' : char;
    span.appendChild(s);
  }
  el.appendChild(span);

  gsap.fromTo(
    el.querySelectorAll('.char'),
    {
      willChange: 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%',
    },
    {
      duration: 1,
      ease: 'back.inOut(2)',
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: 0.03,
      scrollTrigger: {
        trigger: el,
        start: 'center bottom+=50%',
        end: 'bottom bottom-=40%',
        scrub: true,
      },
    }
  );

  return el;
}