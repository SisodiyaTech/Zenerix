import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver({ threshold = 0, rootMargin = '0px', triggerOnce = false } = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && triggerOnce) {
        observer.unobserve(element);
      }
    }, { threshold, rootMargin });

    observer.observe(element);
    return () => {
      if (element && !triggerOnce) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting];
}
