import { motion } from 'framer-motion';
import { profile, attributes, stats } from '../../data/profile';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { StatBar } from '../../components/StatBar/StatBar';
import { Counter } from '../../components/Counter/Counter';
import { Button } from '../../components/Button/Button';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { scrollToId } from '../../lib/scroll';
import styles from './About.module.css';

export function About() {
  return (
    <section className="section container" id="about">
      <SectionHeading eyebrow="PLAYER PROFILE" title="Perfil del Ingeniero" index="02" />

      <div className={styles.grid}>
        {/* Left — identity card */}
        <motion.div
          className={`${styles.card} glass`}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className={styles.avatarWrap}>
            <img src={profile.avatar} alt={profile.name} loading="lazy" />
            <span className={styles.level}>LVL {profile.level}</span>
          </div>
          <h3 className={styles.playerName}>{profile.name}</h3>
          <p className={styles.class}>
            {profile.role} · {profile.subRole}
          </p>
          <div className={styles.meta}>
            <span>📍 {profile.location}</span>
            <span>🏢 {profile.company}</span>
            <span>🟢 Disponible</span>
          </div>
          <div className={styles.attrs}>
            {attributes.map((a, i) => (
              <StatBar key={a.label} label={a.label} value={a.value} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Right — bio + stats */}
        <div className={styles.right}>
          <motion.p
            className={styles.bio}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {profile.about}
          </motion.p>

          <motion.div
            className={styles.statGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {stats.map((s) => (
              <motion.div key={s.label} className={styles.stat} variants={fadeUp}>
                <span className={styles.statValue}>
                  <Counter end={s.value} suffix={s.suffix} />
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <Button onClick={() => scrollToId('contact')}>Contáctame</Button>
        </div>
      </div>
    </section>
  );
}
