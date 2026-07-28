import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../../data/profile';
import styles from './EasterEgg.module.css';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function EasterEgg() {
  const [unlocked, setUnlocked] = useState(false);

  // Console banner (subtle recruiter easter egg)
  useEffect(() => {
    const style =
      'color:#00f5ff;font-family:monospace;font-size:13px;font-weight:bold';
    console.log(`%c
   ╔══════════════════════════════════════╗
   ║   ${profile.name.toUpperCase()} · SYSTEM ONLINE
   ║   ¿Inspeccionando el código? 👀
   ║   Hablemos: ${profile.email}
   ║   Pista: prueba el código Konami ↑↑↓↓←→←→BA
   ╚══════════════════════════════════════╝`, style);
  }, []);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setUnlocked(true);
          document.documentElement.classList.add('konami');
          setTimeout(() => {
            setUnlocked(false);
            document.documentElement.classList.remove('konami');
          }, 6000);
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
        >
          <span className={styles.title}>⚡ CHEAT CODE ACTIVADO</span>
          <span className={styles.sub}>God Mode · +9999 XP · ¡Buen ojo!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
