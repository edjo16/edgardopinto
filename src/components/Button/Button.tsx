import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/utils';
import { useAudio } from '../../hooks/useAudio';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost' | 'accent';

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never };
type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', children, className, icon, ...rest } = props;
  const { play } = useAudio();
  const cls = cx(styles.btn, styles[variant], className);

  const handlers = {
    onMouseEnter: () => play('hover'),
    onClick: () => play('click'),
  };

  if (props.as === 'a') {
    const { as: _as, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      as?: string;
    };
    void _as;
    return (
      <a className={cls} {...handlers} {...anchorRest}>
        <span className={styles.label}>{children}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.scan} aria-hidden />
      </a>
    );
  }

  const { as: _as, ...btnRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: string;
  };
  void _as;
  return (
    <button className={cls} {...handlers} {...btnRest}>
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.scan} aria-hidden />
    </button>
  );
}
