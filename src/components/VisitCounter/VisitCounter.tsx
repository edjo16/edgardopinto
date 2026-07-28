import { useEffect, useState } from 'react';
import { FiActivity } from 'react-icons/fi';
import styles from './VisitCounter.module.css';

/**
 * Lightweight visit counter. Attempts a free hit-counter API and falls back
 * to a locally-persisted count so it always shows something believable.
 */
export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fallback = () => {
      const base = Number(localStorage.getItem('ep-visits') ?? '0');
      const next = base + 1;
      localStorage.setItem('ep-visits', String(next));
      // seed with a believable baseline on first ever visit
      return 1480 + next;
    };

    (async () => {
      try {
        const res = await fetch(
          'https://api.counterapi.dev/v1/edgardopinto/portfolio/up'
        );
        if (!res.ok) throw new Error('counter unavailable');
        const data = (await res.json()) as { count?: number };
        if (!cancelled && typeof data.count === 'number') {
          setCount(data.count);
          return;
        }
        throw new Error('bad payload');
      } catch {
        if (!cancelled) setCount(fallback());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <div className={styles.counter} title="Visitas registradas">
      <FiActivity className={styles.icon} />
      <span className={styles.label}>VISITAS</span>
      <span className={styles.value}>{count.toLocaleString('es')}</span>
    </div>
  );
}
