import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true);
        setTimeout(onDone, 50);
      },
    });

    tl.fromTo(
      lettersRef.current,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
    )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
        '-=0.3'
      )
      .to(lettersRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.in',
        delay: 0.3,
      })
      .to(
        rootRef.current,
        { yPercent: -100, duration: 0.8, ease: 'power3.inOut' },
        '-=0.2'
      );
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal"
    >
      <div className="overflow-hidden">
        <h1 className="display text-5xl md:text-7xl text-cream flex">
          {'SRI SANA'.split('').map((ch, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>
      </div>
      <div className="mt-8 h-px w-48 overflow-hidden bg-cream/10">
        <div ref={barRef} className="loader-bar h-full w-full origin-left" />
      </div>
      <p className="section-label mt-6">Modular Interior Designers</p>
    </div>
  );
}
