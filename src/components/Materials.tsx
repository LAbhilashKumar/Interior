import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Swatch {
  name: string;
  type: string;
  img: string;
}

const SWATCHES: Swatch[] = [
  { name: 'Walnut Veneer', type: 'Natural veneer', img: 'https://images.pexels.com/photos/314071/pexels-photo-314071.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1' },
  { name: 'Oak Laminate', type: 'High-pressure laminate', img: 'https://images.pexels.com/photos/5034050/pexels-photo-5034050.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1' },
  { name: 'Teak Finish', type: 'Wood-grain laminate', img: 'https://images.pexels.com/photos/6568684/pexels-photo-6568684.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1' },
  { name: 'Charcoal Matte', type: 'Acrylic finish', img: 'https://images.pexels.com/photos/4097160/pexels-photo-4097160.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1' },
  { name: 'Walnut Veneer', type: 'Natural veneer', img: 'https://images.pexels.com/photos/314071/pexels-photo-314071.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1' },
  { name: 'Oak Laminate', type: 'High-pressure laminate', img: 'https://images.pexels.com/photos/5034050/pexels-photo-5034050.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1' },
];

export default function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stripRef.current,
        { x: 200 },
        {
          x: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="relative mood-jewel py-24 md:py-40 overflow-hidden"
    >
      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        04 · Materials
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <h2 ref={headingRef} className="display text-cream text-5xl md:text-7xl max-w-2xl relative">
          What your home
          <br />
          is <span className="italic text-brass-light glow-brass">made of.</span>
        </h2>
      </div>

      <div className="overflow-hidden">
        <div ref={stripRef} className="flex gap-6 will-change-transform">
          {SWATCHES.map((s, i) => (
            <div
              key={i}
              className="swatch-card flex-shrink-0 w-[260px] md:w-[340px] h-[420px] md:h-[520px] relative overflow-hidden group"
              data-cursor="hover"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${s.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="section-label mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{s.type}</p>
                <h3 className="display text-cream text-2xl">{s.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
