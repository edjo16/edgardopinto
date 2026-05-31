import { motion } from 'framer-motion';
import { experience, education } from '../../data/experience';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHeading eyebrow="CAREER LOG" title="Trayectoria" index="05" />

      {/* Timeline */}
      <div className={styles.timeline}>
        <span className={styles.spine} aria-hidden />
        {experience.map((e, i) => (
          <motion.div
            key={e.period}
            className={styles.node}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={{ delay: i * 0.08 }}
          >
            <span className={styles.dot} aria-hidden />
            <div className={`${styles.entry} glass`}>
              <span className={styles.period}>{e.period}</span>
              <h3 className={styles.role}>{e.role}</h3>
              <span className={styles.company}>{e.company}</span>
              <p className={styles.desc}>{e.description}</p>
              <div className={styles.tags}>
                {e.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <h3 className={styles.eduHeading}>Educación & Certificaciones</h3>
      <motion.div
        className={styles.eduGrid}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {education.map((ed) => (
          <motion.article key={ed.title} className={styles.eduCard} variants={fadeUp} data-cursor="hover">
            <div className={styles.eduImg}>
              <img src={ed.image} alt={ed.title} loading="lazy" />
            </div>
            <h4 className={styles.eduTitle}>{ed.title}</h4>
            <ul className={styles.eduList}>
              {ed.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
