// ============================================================
// Custom Cursor Component — GSAP driven
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    // Lag ring slightly for fluid feel
    const raf = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      requestAnimationFrame(raf);
    };

    const onEnterVideo = () => {
      ringEl.classList.add('play-state');
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveVideo = () => {
      ringEl.classList.remove('play-state');
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onEnterLink = () => {
      gsap.to(ringEl, { scale: 1.5, opacity: 0.6, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(ringEl, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);
    requestAnimationFrame(raf);

    // Attach to video cards and buttons
    const attachHovers = () => {
      document.querySelectorAll('[data-cursor="play"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterVideo);
        el.addEventListener('mouseleave', onLeaveVideo);
      });
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    // Re-attach after DOM settles
    setTimeout(attachHovers, 1000);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div id="cursor">
        <div id="cursor-dot" ref={dotRef} />
      </div>
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

