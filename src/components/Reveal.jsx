
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Reveal({ children, className = '' }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: "0px 0px -50px 0px"
  });

  return (
    <div
      ref={ref}
      className={`reveal ${isIntersecting ? 'reveal-active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
