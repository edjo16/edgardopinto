import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../../data/profile';
import styles from './Loader.module.css';

const BOOT_LINES = [
  'INITIALIZING KERNEL...',
  'LOADING ASSETS...',
  'COMPILING SHADERS...',
  'ESTABLISHING UPLINK...',
  'SYSTEM READY',
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const line = BOOT_LINES[Math.min(Math.floor(progress / 20), BOOT_LINES.length - 1)];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 450);
      }
      setProgress(Math.floor(current));
    }, 130);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className={styles.loader}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className={styles.scanlines} aria-hidden />
          <div className={styles.inner}>
            <motion.div
              className={styles.logo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.mark}>EP</span>
              <span className={styles.name}>{profile.name}</span>
            </motion.div>

            <div className={styles.bootline}>
              <span className={styles.prompt}>&gt;</span> {line}
            </div>

            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.percent}>
              {String(progress).padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
