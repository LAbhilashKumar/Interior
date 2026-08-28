import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: 'The 3D planning was meticulous — we saw exactly what we were getting before a single board was cut. Our 2BHK was done in 13 days, and the finish quality was superb.',
    author: 'Ravi Kumar',
    role: '2BHK · Kukatpally',
  },
  {
    quote: 'Premium look at an honest price. Krishna and his team understood our budget and still delivered something that feels far more expensive than what we paid.',
    author: 'Sneha Reddy',
    role: 'Full Home · Nizampet',
  },
  {
    quote: 'Fast, clean, and professional. They finished our modular kitchen without a single day of delay. The soft-close hardware and edge banding are flawless.',
    author: 'Murali Krishna',
    role: 'Modular Kitchen · Pragathi Nagar',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mood-jewel py-24 md:py-40 overflow-hidden"
    >
      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        07 · Voices
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center min-h-[40vh] flex flex-col items-center justify-center">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="absolute transition-all duration-1000"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? 'translateY(0)' : 'translateY(30px)',
              pointerEvents: active === i ? 'auto' : 'none',
            }}
          >
            <blockquote className="display text-cream text-3xl md:text-5xl leading-tight mb-8 italic">
              "{t.quote}"
            </blockquote>
            <div>
              <p className="text-brass-light text-sm tracking-widest uppercase">{t.author}</p>
              <p className="text-cream/40 text-xs tracking-wide mt-1">{t.role}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="hover"
              className="w-8 h-px transition-all duration-500"
              style={{
                background: active === i ? 'var(--color-brass-light)' : 'rgba(245,241,234,0.2)',
                height: active === i ? '2px' : '1px',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
