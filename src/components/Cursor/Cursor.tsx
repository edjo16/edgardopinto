import { useEffect, useRef, useState } from 'react';
import { isTouchDevice } from '../../lib/utils';
import styles from './Cursor.module.css';

/**
 * Custom AAA-style cursor: a precise dot + a lagging ring that grows on
 * interactive elements. Disabled entirely on touch / coarse-pointer devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) return;
    document.documentElement.classList.add('custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      setHidden(false);
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const isInteractive = (el: Element | null) =>
      !!el?.closest('a, button, [data-cursor="hover"], input, textarea, label');

    const onOver = (e: MouseEvent) => setActive(isInteractive(e.target as Element));
    const onLeave = () => setHidden(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={styles.dot}
        data-hidden={hidden}
        data-active={active}
        aria-hidden
      />
      <div
        ref={ringRef}
        className={styles.ring}
        data-hidden={hidden}
        data-active={active}
        aria-hidden
      />
    </>
  );
}
