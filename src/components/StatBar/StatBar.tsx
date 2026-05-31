import { motion } from 'framer-motion';
import { viewportOnce } from '../../lib/motion';
import styles from './StatBar.module.css';

type Props = {
  label: string;
  value: number; // 0-100
  delay?: number;
};

export function StatBar({ label, value, delay = 0 }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        >
          <span className={styles.glow} aria-hidden />
        </motion.div>
      </div>
    </div>
  );
}
