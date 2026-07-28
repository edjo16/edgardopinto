import { Suspense, lazy, useEffect, useRef } from 'react';
import { FiArrowDownRight, FiSend } from 'react-icons/fi';
import { gsap } from '../../lib/gsap';
import { profile } from '../../data/profile';
import { Button } from '../../components/Button/Button';
import { scrollToId } from '../../lib/scroll';
import { prefersReducedMotion } from '../../lib/utils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './Hero.module.css';

const ParticleField = lazy(() => import('../../components/ParticleField/ParticleField'));

/** Split a string into animatable letter spans. */
function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className="hero-letter" data-letter>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  // Only load the heavy 3D particle chunk on capable desktop pointers without
  // a reduced-motion preference — keeps mobile fast and Lighthouse high.
  const enable3D = useMediaQuery(
    '(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)'
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-eyebrow]', { opacity: 0, y: 20, duration: 0.6 })
        .from(
          '[data-letter]',
          { opacity: 0, yPercent: 110, rotateX: -90, stagger: 0.03, duration: 0.8 },
          '-=0.2'
        )
        .from(
          '[data-hero-sub]',
          { opacity: 0, y: 30, duration: 0.7 },
          '-=0.4'
        )
        .from(
          '[data-hero-stack] > *',
          { opacity: 0, y: 20, stagger: 0.08, duration: 0.5 },
          '-=0.3'
        )
        .from(
          '[data-hero-cta]',
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },
          '-=0.2'
        )
        .from('[data-hero-aside]', { opacity: 0, x: 40, duration: 0.8 }, '-=0.8');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="home" ref={root}>
      <div className={styles.bg} aria-hidden>
        {enable3D && (
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        )}
        <div className={styles.glowOrbs} />
        <div className={styles.scanline} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <span className="eyebrow" data-hero-eyebrow>
            SYSTEM ONLINE · v1.0
          </span>

          <h1 className={styles.title}>
            <span className={styles.line}>
              <Letters text="SOFTWARE" />
            </span>
            <span className={`${styles.line} ${styles.lineAccent}`}>
              <Letters text="ENGINEER" />
            </span>
          </h1>

          <p className={styles.sub} data-hero-sub>
            {profile.subRole} · construyendo plataformas escalables y experiencias
            de alto rendimiento.
          </p>

          <div className={styles.stack} data-hero-stack>
            {profile.stack.map((t) => (
              <span key={t} className={styles.chip}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.ctas}>
            <span data-hero-cta>
              <Button
                onClick={() => scrollToId('projects')}
                icon={<FiArrowDownRight />}
              >
                View Projects
              </Button>
            </span>
            <span data-hero-cta>
              <Button
                variant="ghost"
                onClick={() => scrollToId('contact')}
                icon={<FiSend />}
              >
                Contact Me
              </Button>
            </span>
          </div>
        </div>

        <aside className={styles.aside} data-hero-aside>
          <div className={styles.portrait}>
            <img src={profile.avatar} alt={profile.name} loading="eager" />
            <div className={styles.portraitFrame} aria-hidden />
            <div className={styles.hud}>
              <span>LVL {profile.level}</span>
              <span className={styles.hudDot} />
              <span>{profile.role.toUpperCase()}</span>
            </div>
          </div>
        </aside>
      </div>

      <button
        className={styles.scroll}
        onClick={() => scrollToId('about')}
        aria-label="Scroll down"
      >
        <span>SCROLL</span>
        <span className={styles.mouse} aria-hidden />
      </button>
    </section>
  );
}
