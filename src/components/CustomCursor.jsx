// ============================================================
// Custom Cursor Component — Performance Optimized
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Disable completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    let isVisible = true;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    // Lag ring slightly with smooth interpolation
    const loop = () => {
      if (isVisible) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.15;
        ring.current.y += (pos.current.y - ring.current.y) * 0.15;
        gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      }
      rafId.current = requestAnimationFrame(loop);
    };

    const onEnterVideo = () => {
      ringEl.classList.add('play-state');
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveVideo = () => {
      ringEl.classList.remove('play-state');
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onEnterInteractive = () => {
      gsap.to(ringEl, { scale: 1.4, opacity: 0.6, duration: 0.25 });
    };

    const onLeaveInteractive = () => {
      gsap.to(ringEl, { scale: 1, opacity: 1, duration: 0.25 });
    };

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId.current = requestAnimationFrame(loop);

    // Event delegation on document to avoid repeatedly querying DOM
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="play"]');
      if (!target) return;
      if (target.matches('[data-cursor="play"]')) {
        onEnterVideo();
      } else {
        onEnterInteractive();
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="play"]');
      if (!target) return;
      if (target.matches('[data-cursor="play"]')) {
        onLeaveVideo();
      } else {
        onLeaveInteractive();
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div id="cursor" aria-hidden="true">
        <div id="cursor-dot" ref={dotRef} />
      </div>
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
