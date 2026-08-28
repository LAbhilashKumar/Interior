import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia('(max-width: 768px)').matches) {
      dot.classList.add('hidden');
      return;
    }

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnter = () => dot.classList.add('expanded');
    const onLeave = () => dot.classList.remove('expanded');

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return dotRef;
}
