// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const BEFORE_IMG =
//   'https://images.pexels.com/photos/8146158/pexels-photo-8146158.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=1';
// const AFTER_IMG =
//   'https://images.pexels.com/photos/8146334/pexels-photo-8146334.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=1';

// export default function BeforeAfter() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const labelRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [pos, setPos] = useState(50);
//   const dragging = useRef(false);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         headingRef.current,
//         { opacity: 0, y: 60 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 70%',
//           },
//         }
//       );
//       gsap.fromTo(
//         labelRef.current,
//         { opacity: 0, x: -20 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 80%',
//           },
//         }
//       );
//     }, sectionRef);
//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const update = (clientX: number) => {
//       const rect = container.getBoundingClientRect();
//       const pct = ((clientX - rect.left) / rect.width) * 100;
//       setPos(Math.max(0, Math.min(100, pct)));
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       if (dragging.current) update(e.clientX);
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       if (dragging.current && e.touches[0]) update(e.touches[0].clientX);
//     };
//     const stop = () => { dragging.current = false; };

//     window.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('mouseup', stop);
//     window.addEventListener('touchmove', onTouchMove);
//     window.addEventListener('touchend', stop);

//     return () => {
//       window.removeEventListener('mousemove', onMouseMove);
//       window.removeEventListener('mouseup', stop);
//       window.removeEventListener('touchmove', onTouchMove);
//       window.removeEventListener('touchend', stop);
//     };
//   }, []);

//   return (
//     <section
//       id="transformation"
//       ref={sectionRef}
//       className="relative mood-ember py-24 md:py-40 overflow-hidden"
//     >
//       <div
//         ref={labelRef}
//         className="absolute top-8 left-6 md:left-12 z-20 section-label"
//       >
//         05 · Transformation
//       </div>

//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <h2 ref={headingRef} className="display text-cream text-5xl md:text-7xl mb-16 max-w-3xl">
//           From bare walls to
//           <br />
//           <span className="italic text-brass-light glow-brass">finished home.</span>
//         </h2>

//         <div
//           ref={containerRef}
//           className="relative w-full aspect-[16/10] overflow-hidden select-none vignette float-card"
//           onMouseDown={() => { dragging.current = true; }}
//           onTouchStart={() => { dragging.current = true; }}
//           data-cursor="hover"
//         >
//           <div
//             className="absolute inset-0 graded-img"
//             style={{
//               backgroundImage: `url(${AFTER_IMG})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />
//           <div
//             className="absolute inset-0 overflow-hidden"
//             style={{ width: `${pos}%` }}
//           >
//             <div
//               className="absolute inset-0 graded-img"
//               style={{
//                 backgroundImage: `url(${BEFORE_IMG})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 width: `${100 / (pos / 100)}%`,
//                 maxWidth: 'none',
//               }}
//             />
//           </div>

//           <div className="ba-handle" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
//             <div className="ba-handle-grip">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                 <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
//               </svg>
//             </div>
//           </div>

//           <span className="absolute top-6 left-6 section-label text-cream/70">Before</span>
//           <span className="absolute top-6 right-6 section-label text-cream/70">After</span>
//         </div>
//         <p className="text-cream/40 text-xs tracking-widest mt-4 text-center">Drag to compare</p>
//       </div>
//     </section>
//   );
// }



import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BEFORE_IMG from '../assets/transformation/before.jpg';
import AFTER_IMG from '../assets/transformation/after.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, pct)));
    };

    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) update(e.touches[0].clientX);
    };
    const stop = () => { dragging.current = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative mood-ember py-24 md:py-40 overflow-hidden"
    >
      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        05 · Transformation
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 ref={headingRef} className="display text-cream text-5xl md:text-7xl mb-16 max-w-3xl">
          From bare walls to
          <br />
          <span className="italic text-brass-light glow-brass">finished home.</span>
        </h2>

        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] overflow-hidden select-none vignette float-card"
          onMouseDown={() => { dragging.current = true; }}
          onTouchStart={() => { dragging.current = true; }}
          data-cursor="hover"
        >
          <div
            className="absolute inset-0 graded-img"
            style={{
              backgroundImage: `url(${AFTER_IMG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <div
              className="absolute inset-0 graded-img"
              style={{
                backgroundImage: `url(${BEFORE_IMG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: `${100 / (pos / 100)}%`,
                maxWidth: 'none',
              }}
            />
          </div>

          <div className="ba-handle" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
            <div className="ba-handle-grip">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          <span className="absolute top-6 left-6 section-label text-cream/70">Before</span>
          <span className="absolute top-6 right-6 section-label text-cream/70">After</span>
        </div>
        <p className="text-cream/40 text-xs tracking-widest mt-4 text-center">Drag to compare</p>
      </div>
    </section>
  );
}
