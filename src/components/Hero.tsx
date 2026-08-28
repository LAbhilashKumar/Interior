import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KitchenScene = lazy(() => import('@/components/KitchenScene'));

const HERO_IMG =
  'https://images.pexels.com/photos/6920446/pexels-photo-6920446.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1.2,
          pin: true,
        },
      });

      tl.to(imgRef.current, {
        scale: 1.25,
        ease: 'none',
      }, 0)
        .to(overlayRef.current, {
          opacity: 0.85,
          ease: 'none',
        }, 0)
        .to(titleRef.current, {
          yPercent: -30,
          opacity: 0,
          ease: 'power3.in',
        }, 0.15)
        .to(subRef.current, {
          yPercent: -20,
          opacity: 0,
          ease: 'power3.in',
        }, 0.1)
        .to(cueRef.current, {
          opacity: 0,
          ease: 'none',
        }, 0)
        .to(labelRef.current, {
          opacity: 0,
          ease: 'none',
        }, 0.4)
        .to(sceneRef.current, {
          opacity: 0,
          ease: 'none',
        }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden mood-amber vignette"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform graded-img"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.05)',
        }}
      />
      {/* Amber color grade overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(26,23,20,0.35) 0%, rgba(184,100,40,0.08) 30%, rgba(26,23,20,0.6) 100%)',
        }}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(26,23,20,0.5) 0%, rgba(26,23,20,0.3) 40%, rgba(26,23,20,0.75) 100%)',
          opacity: 0.55,
        }}
      />

      {/* 3D kitchen scene overlay */}
      <div
        ref={sceneRef}
        className="absolute inset-0 z-[5] opacity-40 pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      >
        <Suspense fallback={null}>
          <KitchenScene />
        </Suspense>
      </div>

      {/* Glow mesh behind text */}
      <div className="mesh-glow" />

      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-10 section-label"
      >
        00 · Composing the Space
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="display text-cream text-6xl md:text-8xl lg:text-9xl max-w-5xl"
        >
          Spaces, Engineered
          <br />
          <span className="italic text-brass-light glow-brass">Beautifully</span>
        </h1>
        <p
          ref={subRef}
          className="mt-8 text-cream/70 text-sm md:text-base tracking-[0.3em] uppercase font-light"
        >
          Modular Interior Design &amp; Execution · Hyderabad
        </p>
      </div>

      <div
        ref={cueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="section-label text-cream/50">Scroll</span>
        <div className="scroll-cue" />
      </div>
    </section>
  );
}
