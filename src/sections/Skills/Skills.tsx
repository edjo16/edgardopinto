import { motion } from 'framer-motion';
import { skills, skillCategories } from '../../data/skills';
import { levelToSegments } from '../../data/levels';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <section className="section container" id="skills">
      <SectionHeading eyebrow="LOADOUT" title="Arsenal Tecnológico" index="03" />

      <div className={styles.columns}>
        {skillCategories.map((category) => (
          <motion.div
            key={category}
            className={`${styles.column} glass`}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <h3 className={styles.colTitle}>{category}</h3>
            <motion.ul
              className={styles.list}
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {skills
                .filter((s) => s.category === category)
                .map((skill) => {
                  const Icon = skill.icon;
                  const segments = levelToSegments[skill.level];
                  return (
                    <motion.li
                      key={skill.name}
                      className={styles.skill}
                      variants={fadeUp}
                      data-cursor="hover"
                    >
                      <span className={styles.skillIcon}>
                        <Icon />
                      </span>
                      <div className={styles.skillBody}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <div className={styles.skillMeta}>
                          <span
                            className={styles.segments}
                            aria-hidden
                            data-level={skill.level}
                          >
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className={i < segments ? styles.segOn : styles.seg}
                              />
                            ))}
                          </span>
                          <span
                            className={styles.level}
                            data-level={skill.level}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
