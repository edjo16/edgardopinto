import { motion } from 'framer-motion';
import { viewportOnce } from '../../lib/motion';
import { levelToPercent, type SkillLevel } from '../../data/levels';
import styles from './StatBar.module.css';

type Props = {
  label: string;
  level: SkillLevel;
  delay?: number;
};

export function StatBar({ label, level, delay = 0 }: Props) {
  const width = levelToPercent[level];
  return (
    <div className={styles.row}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value} data-level={level}>
          {level}
        </span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        >
          <span className={styles.glow} aria-hidden />
        </motion.div>
      </div>
    </div>
  );
}
