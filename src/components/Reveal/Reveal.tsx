import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, viewportOnce } from '../../lib/motion';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
};

/** Scroll-triggered reveal wrapper using Framer Motion. */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
