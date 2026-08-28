import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We visit your space, understand how you live, and map every requirement — from layout to lifestyle.',
  },
  {
    num: '02',
    title: '3D Design & Material Selection',
    desc: 'You see your kitchen or wardrobe in 3D before we cut a single board. Materials, finishes, and hardware chosen together.',
  },
  {
    num: '03',
    title: 'Fabrication',
    desc: 'Modules are built in our workshop with BMR-grade ply, edge-banded panels, and soft-close hardware — precision off-site means speed on-site.',
  },
  {
    num: '04',
    title: 'On-site Installation',
    desc: 'Pre-finished modules arrive ready to assemble. Clean, fast, minimal disruption to your home.',
  },
  {
    num: '05',
    title: 'Handover',
    desc: 'Final detailing, quality check, and walkthrough. A 2BHK completed in 13 days — that is our standard.',
  },
];

const PROCESS_IMG =
  'https://images.pexels.com/photos/7031211/pexels-photo-7031211.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&dpr=1';

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.1, y: 40 },
        {
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      const steps = stepsRef.current?.querySelectorAll('.step-item');
      steps?.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              end: 'bottom 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

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
      id="process"
      ref={sectionRef}
      className="relative mood-blueprint py-24 md:py-40 overflow-hidden"
    >
      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        03 · How We Build
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="relative h-[60vh] lg:h-[80vh] overflow-hidden order-2 lg:order-1 vignette float-card">
          <div
            ref={imgRef}
            className="absolute inset-0 will-change-transform graded-img"
            style={{
              backgroundImage: `url(${PROCESS_IMG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,26,31,0.7) 0%, transparent 50%)' }} />
          {/* Blueprint grid accent */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(58,72,88,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(58,72,88,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div ref={stepsRef} className="order-1 lg:order-2">
          <h2 className="display text-cream text-5xl md:text-6xl mb-12 relative">
            Five steps.
            <br />
            <span className="italic text-brass-light glow-brass">Zero surprises.</span>
          </h2>
          <div className="space-y-10">
            {STEPS.map((step) => (
              <div key={step.num} className="step-item will-change-transform">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="section-label">{step.num}</span>
                  <h3 className="display text-cream text-2xl md:text-3xl">{step.title}</h3>
                </div>
                <p className="text-cream/55 text-sm md:text-base leading-relaxed max-w-md pl-0 md:pl-12">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
