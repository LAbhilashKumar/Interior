import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  num: string;
  name: string;
  detail: string;
  img: string;
}

const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'Modular Kitchens',
    detail: 'L-shaped & parallel layouts · BMR-grade ply · Soft-close hardware',
    img: 'https://images.pexels.com/photos/7515855/pexels-photo-7515855.png?auto=compress&cs=tinysrgb&w=1400&h=1000&dpr=1',
  },
  {
    num: '02',
    name: 'Wardrobes & Storage',
    detail: 'Sliding & hinged · Loft storage · Custom internal accessories',
    img: 'https://images.pexels.com/photos/6580395/pexels-photo-6580395.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1000&dpr=1',
  },
  {
    num: '03',
    name: 'TV Units',
    detail: 'Wall-mounted & floor-standing · Cable-managed · Ambient lighting',
    img: 'https://images.pexels.com/photos/6020432/pexels-photo-6020432.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1000&dpr=1',
  },
  {
    num: '04',
    name: 'Full Home Interiors',
    detail: '2BHK delivered in 13 days · Hyderabad · Turnkey execution',
    img: 'https://images.pexels.com/photos/7587806/pexels-photo-7587806.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1000&dpr=1',
  },
  {
    num: '05',
    name: 'Woodwork & Detailing',
    detail: 'Doors · Paneling · False ceilings · Custom furniture',
    img: 'https://images.pexels.com/photos/7148841/pexels-photo-7148841.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1000&dpr=1',
  },
  {
    num: '06',
    name: 'Commercial Fit-outs',
    detail: 'Community pharmacy · Retail counters · Storage systems',
    img: 'https://images.pexels.com/photos/8657368/pexels-photo-8657368.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1000&dpr=1',
  },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const cards = track.querySelectorAll('.work-card');

      const totalScroll = track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card) => {
        const img = card.querySelector('.work-img');
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'left center',
              end: 'right center',
              scrub: 1,
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
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative mood-jewel overflow-hidden"
    >
      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        01 · Residences &amp; Spaces
      </div>

      <div className="flex items-center h-screen">
        <div ref={trackRef} className="flex gap-8 md:gap-16 pl-6 md:pl-12 will-change-transform">
          {PROJECTS.map((p) => (
            <div
              key={p.num}
              className="work-card flex-shrink-0 w-[80vw] md:w-[55vw] lg:w-[45vw] h-[72vh] relative group work-card-shadow rounded-sm overflow-hidden"
              data-cursor="hover"
            >
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="work-img absolute inset-0 will-change-transform graded-img"
                  style={{
                    backgroundImage: `url(${p.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="section-label block mb-3">{p.num}</span>
                <h3 className="display text-cream text-4xl md:text-5xl mb-2">{p.name}</h3>
                <p className="text-cream/60 text-sm tracking-wide">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
