import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../lib/motion';
import styles from './SectionHeading.module.css';

type Props = {
  eyebrow: string;
  title: string;
  index?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, index, align = 'center' }: Props) {
  return (
    <motion.header
      className={styles.heading}
      data-align={align}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {index && <span className={styles.index}>{index}</span>}
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
    </motion.header>
  );
}
