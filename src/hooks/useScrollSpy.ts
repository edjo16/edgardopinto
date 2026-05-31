import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in view.
 * Uses IntersectionObserver against the provided section ids.
 */
export function useScrollSpy(ids: string[], offset = 0.4): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`, threshold: 0 }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
