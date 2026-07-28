import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { FiVolume2, FiVolumeX, FiMoon, FiSun } from 'react-icons/fi';
import { navItems } from '../../data/navigation';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useAudio } from '../../hooks/useAudio';
import { useTheme } from '../../hooks/useTheme';
import { scrollToId } from '../../lib/scroll';
import { cx } from '../../lib/utils';
import styles from './Navbar.module.css';

export function Navbar() {
  const ids = useMemo(() => navItems.map((n) => n.id), []);
  const active = useScrollSpy(ids);
  const [open, setOpen] = useState(false);
  const { enabled, toggle, play } = useAudio();
  const { theme, toggle: toggleTheme } = useTheme();

  const handleNav = (id: string) => {
    play('whoosh');
    scrollToId(id);
    setOpen(false);
  };

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      className={cx(styles.header, 'glass')}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {open && (
        <button
          className={styles.backdrop}
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />
      )}
      <nav className={styles.nav}>
        <button className={styles.logo} onClick={() => handleNav('home')}>
          <span className={styles.logoMark}>EP</span>
          <span className={styles.logoText}>EDGARDO_PINTO</span>
        </button>

        <ul className={cx(styles.list, open && styles.listOpen)}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={cx(styles.link, active === item.id && styles.linkActive)}
                onClick={() => handleNav(item.id)}
                onMouseEnter={() => play('hover')}
              >
                <span className={styles.linkIndex}>{item.index}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => {
              play('click');
              toggleTheme();
            }}
            aria-label={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
            data-cursor="hover"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button
            className={styles.iconBtn}
            onClick={toggle}
            aria-label={enabled ? 'Desactivar sonido' : 'Activar sonido'}
            data-cursor="hover"
          >
            {enabled ? <FiVolume2 /> : <FiVolumeX />}
          </button>
          <button
            className={cx(styles.iconBtn, styles.burger)}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
