import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/utils';

/**
 * Counts from 0 to `end` once the element enters the viewport.
 * Returns a ref to attach and the current displayed value.
 */
export function useCountUp(end: number, duration = 1600) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = prefersReducedMotion();
  const [value, setValue] = useState(() => (reduced ? end : 0));
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setValue(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, reduced]);

  return { ref, value };
}
