import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { profile } from '../../data/profile';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Button } from '../../components/Button/Button';
import { fadeUp, viewportOnce } from '../../lib/motion';
import styles from './Contact.module.css';

const FORMSPREE = 'https://formspree.io/f/meqnkjol';

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Cuéntame un poco más (mín. 10 caracteres)'),
});
type FormValues = z.infer<typeof schema>;

const socials = [
  { icon: FaLinkedin, url: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: FaGithub, url: profile.socials.github, label: 'GitHub' },
  { icon: FaInstagram, url: profile.socials.instagram, label: 'Instagram' },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        reset();
        setTimeout(() => setSent(false), 5000);
      }
    } catch {
      /* swallow — UX handled by sent state */
    }
  };

  return (
    <section className="section container" id="contact">
      <SectionHeading eyebrow="OPEN CHANNEL" title="Iniciar Transmisión" index="06" />

      <div className={styles.grid}>
        {/* Left — contact cards + socials */}
        <motion.div
          className={styles.info}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <a className={`${styles.infoCard} glass`} href={`mailto:${profile.email}`}>
            <FiMail className={styles.infoIcon} />
            <div>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{profile.email}</span>
            </div>
          </a>
          <a className={`${styles.infoCard} glass`} href={profile.whatsapp} target="_blank" rel="noreferrer">
            <FaWhatsapp className={styles.infoIcon} />
            <div>
              <span className={styles.infoLabel}>WhatsApp</span>
              <span className={styles.infoValue}>{profile.phone}</span>
            </div>
          </a>

          <div className={styles.socials}>
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={styles.social}
                  data-cursor="hover"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          className={`${styles.form} glass`}
          onSubmit={handleSubmit(onSubmit)}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          noValidate
        >
          <div className={styles.field}>
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" placeholder="Tu nombre" {...register('name')} />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="tu@email.com" {...register('email')} />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Cuéntame sobre tu proyecto..."
              {...register('message')}
            />
            {errors.message && (
              <span className={styles.error}>{errors.message.message}</span>
            )}
          </div>

          <Button type="submit" icon={<FiSend />} className={styles.submit}>
            {isSubmitting ? 'Enviando...' : sent ? '¡Mensaje enviado!' : 'Enviar mensaje'}
          </Button>
          {sent && (
            <span className={styles.success}>
              ✓ Transmisión recibida. Te responderé pronto.
            </span>
          )}
        </motion.form>
      </div>
    </section>
  );
}
