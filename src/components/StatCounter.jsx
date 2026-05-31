import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function StatCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (!isIntersecting) return;

    let startTimestamp = null;
    const endValue = parseInt(target, 10);
    if (isNaN(endValue)) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isIntersecting, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-[2.5rem] font-bold text-electric-blue tracking-tight block drop-shadow-[0_0_15px_rgba(0,163,255,0.3)] mb-1 font-heading">
      {count}{suffix}
    </span>
  );
}
