import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { value: 120, suffix: '+', label: 'Homes completed' },
  { value: 13, suffix: ' days', label: 'Avg. delivery time' },
  { value: 4.9, suffix: '★', label: 'Client rating', decimals: 1 },
  { value: 8, suffix: ' yrs', label: 'Craftsmanship' },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const numsRef = useRef<HTMLDivElement[]>([]);

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

      numsRef.current.forEach((el, i) => {
        const stat = STATS[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.5,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          onUpdate: () => {
            if (el) {
              const formatted = stat.decimals
                ? obj.val.toFixed(stat.decimals)
                : Math.round(obj.val).toString();
              el.textContent = formatted + stat.suffix;
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mood-ember py-24 md:py-36 overflow-hidden"
    >
      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        06 · Numbers
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-cream/10 border-y border-cream/10">
          {STATS.map((stat, i) => (
            <div key={i} className="py-12 md:py-16 px-4 md:px-8 text-center">
              <div
                ref={(el) => {
                  if (el) numsRef.current[i] = el;
                }}
                className="display text-cream text-5xl md:text-7xl mb-3 stat-glow"
              >
                0{stat.suffix}
              </div>
              <p className="text-cream/50 text-xs tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
