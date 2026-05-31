import { motion } from 'framer-motion';
import { skills, skillCategories } from '../../data/skills';
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
                        <div className={styles.skillTop}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillPct}>{skill.level}%</span>
                        </div>
                        <div className={styles.bar}>
                          <motion.span
                            className={styles.barFill}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={viewportOnce}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
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
