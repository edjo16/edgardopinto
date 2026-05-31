export const profile = {
  name: 'Edgardo Pinto',
  role: 'Software Engineer',
  subRole: 'Full Stack Developer',
  stack: ['REACT', 'NODE.JS', 'POSTGRESQL', 'AZURE'],
  location: 'Panamá',
  company: 'ICAutomatizados',
  startYear: 2019,
  level: 26,
  email: 'edgardo.16jp@gmail.com',
  phone: '+507 6587 6097',
  whatsapp:
    'https://api.whatsapp.com/send?phone=50765876097&text=Hola,%20más%20información!',
  cv: '/pdf/CV-Edgardo-Pinto.pdf',
  avatar: '/img/perfil.png',
  about: `Apasionado de la tecnología y la ingeniería de software, con foco en React, TypeScript y arquitecturas escalables. Desde 2019 en la industria tech, he liderado áreas de TI, análisis de datos, seguridad informática y desarrollo de software. Hoy construyo soluciones que automatizan procesos industriales y empresariales — desde dashboards en tiempo real hasta plataformas multiempresa comercializables.`,
  socials: {
    linkedin: 'https://www.linkedin.com/in/edgardo-pinto-0a935a126',
    github: 'https://github.com/edjo16',
    instagram: 'https://www.instagram.com/edgardopinto16j',
  },
} as const;

/** Player Profile attributes (animated bars) */
export const attributes = [
  { label: 'Frontend', value: 92 },
  { label: 'Backend', value: 88 },
  { label: 'Cloud / DevOps', value: 75 },
  { label: 'Architecture', value: 80 },
] as const;

/** Headline stats */
export const stats = [
  { value: 7, suffix: '+', label: 'Años de experiencia' },
  { value: 20, suffix: '+', label: 'Proyectos completados' },
  { value: 5, suffix: '+', label: 'Años en soporte / infra' },
  { value: 12, suffix: '', label: 'Tecnologías dominadas' },
] as const;
