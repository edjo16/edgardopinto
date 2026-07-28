import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { profile } from '../../data/profile';
import { navItems } from '../../data/navigation';
import { scrollToId } from '../../lib/scroll';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.mark}>EP</span>
          <div>
            <h3 className={styles.name}>{profile.name}</h3>
            <p className={styles.role}>{profile.role}</p>
          </div>
        </div>

        <nav className={styles.links}>
          {navItems.map((n) => (
            <button key={n.id} onClick={() => scrollToId(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className={styles.socials}>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.
        </span>
        <span className={styles.built}>Built with React · GSAP · Three.js</span>
      </div>
    </footer>
  );
}
