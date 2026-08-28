import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: visible ? 0 : -100,
      opacity: visible ? 1 : 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [visible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[150] px-6 md:px-12 py-5 flex items-center justify-between"
      style={{ opacity: 0, transform: 'translateY(-100px)' }}
    >
      <a
        href="#hero"
        data-cursor="hover"
        className="display text-xl text-cream tracking-wide"
      >
        Sri Sana
      </a>
      <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-cream/70">
        <a data-cursor="hover" href="#work" className="hover:text-brass-light transition-colors duration-300">Work</a>
        <a data-cursor="hover" href="#process" className="hover:text-brass-light transition-colors duration-300">Process</a>
        <a data-cursor="hover" href="#materials" className="hover:text-brass-light transition-colors duration-300">Materials</a>
        <a data-cursor="hover" href="#contact" className="hover:text-brass-light transition-colors duration-300">Contact</a>
      </div>
      <a
        href="tel:+919381422231"
        data-cursor="hover"
        className="text-xs tracking-widest uppercase text-brass-light border border-brass/40 px-4 py-2 hover:bg-brass/10 transition-colors duration-300"
      >
        +91 93814 22231
      </a>
    </nav>
  );
}
