import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiX, FiGithub, FiZap } from 'react-icons/fi';
import { projects, projectFilters, type Project } from '../../data/projects';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { fadeUp, viewportOnce } from '../../lib/motion';
import { IoTMockup } from './IoTMockup';
import { useAudio } from '../../hooks/useAudio';
import styles from './Projects.module.css';

export function Projects() {
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const { play } = useAudio();

  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter(
    (p) => !p.featured && (filter === 'all' || p.category === filter)
  );

  return (
    <section className="section container" id="projects">
      <SectionHeading eyebrow="MISSION LOG" title="Misiones & Proyectos" index="04" />

      {/* ---------- Featured project ---------- */}
      <motion.article
        className={styles.featured}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className={styles.featuredInfo}>
          <span className={styles.codename}>
            <FiZap /> {featured.codename}
          </span>
          <h3 className={styles.featuredTitle}>{featured.title}</h3>
          <p className={styles.featuredDesc}>{featured.description}</p>

          <ul className={styles.highlights}>
            {featured.highlights.slice(0, 4).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {featured.impact && (
            <div className={styles.impact}>
              {featured.impact.map((i) => (
                <span key={i} className={styles.impactTag}>
                  {i}
                </span>
              ))}
            </div>
          )}

          <div className={styles.stackRow}>
            {featured.stack.map((s) => (
              <span key={s} className={styles.stackChip}>
                {s}
              </span>
            ))}
          </div>

          <button
            className={styles.detailsBtn}
            onClick={() => {
              play('click');
              setSelected(featured);
            }}
          >
            Ver detalles de la misión <FiArrowUpRight />
          </button>
        </div>

        <div className={styles.featuredMockup}>
          <span className={styles.legendary}>★ LEGENDARY</span>
          <IoTMockup />
        </div>
      </motion.article>

      {/* ---------- Filters ---------- */}
      <div className={styles.filters}>
        {projectFilters.map((f) => (
          <button
            key={f.value}
            className={filter === f.value ? styles.filterOn : styles.filter}
            onClick={() => {
              play('hover');
              setFilter(f.value);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ---------- Mission grid ---------- */}
      <motion.div className={styles.grid} layout>
        <AnimatePresence mode="popLayout">
          {rest.map((p) => (
            <motion.article
              key={p.id}
              layout
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                play('click');
                setSelected(p);
              }}
              data-cursor="hover"
            >
              <div className={styles.cardImg}>
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className={styles.difficulty} data-d={p.difficulty}>
                  {p.difficulty}
                </span>
                <span className={styles.xp}>+{p.xp} XP</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCode}>{p.codename}</span>
                <h4 className={styles.cardTitle}>{p.title}</h4>
                <p className={styles.cardSummary}>{p.summary}</p>
                <div className={styles.cardStack}>
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <span className={styles.cardArrow}>
                <FiArrowUpRight />
              </span>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ---------- Modal ---------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={`${styles.modal} glass`}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
              >
                <FiX />
              </button>
              <span className={styles.codename}>
                <FiZap /> {selected.codename}
              </span>
              <h3 className={styles.modalTitle}>{selected.title}</h3>
              <p className={styles.modalDesc}>{selected.description}</p>

              <h5 className={styles.modalLabel}>Objetivos completados</h5>
              <ul className={styles.modalList}>
                {selected.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <h5 className={styles.modalLabel}>Stack</h5>
              <div className={styles.stackRow}>
                {selected.stack.map((s) => (
                  <span key={s} className={styles.stackChip}>
                    {s}
                  </span>
                ))}
              </div>

              {selected.links && (
                <div className={styles.modalLinks}>
                  {selected.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                      <FiGithub /> {l.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
