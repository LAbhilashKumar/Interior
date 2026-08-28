import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WorkGallery from '@/components/WorkGallery';
import Process from '@/components/Process';
import Materials from '@/components/Materials';
import BeforeAfter from '@/components/BeforeAfter';
import Numbers from '@/components/Numbers';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const dotRef = useCustomCursor();
  const glowRef = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const glow = glowRef.current;
    if (!glow) return;
    const xTo = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3' });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 200);
      yTo(e.clientY - 200);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [loaded]);

  return (
    <>
      <div className="grain-overlay" />
      <div ref={glowRef} className="cursor-glow" />
      <CustomCursor dotRef={dotRef} />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Nav />
      <main>
        <Hero />
        <WorkGallery />
        <Process />
        <Materials />
        <BeforeAfter />
        <Numbers />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
