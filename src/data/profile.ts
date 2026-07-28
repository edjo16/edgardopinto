import type { SkillLevel } from './levels';

export const profile = {
  name: 'Edgardo Pinto',
  role: 'Software Engineer',
  subRole: 'Full Stack Developer',
  stack: ['REACT', 'NEXT.JS', 'NODE.JS', 'POSTGRESQL'],
  location: 'Panamá',
  company: 'ACTIVE RE',
  companyRole: 'Analista de Sistemas y Programador',
  startYear: 2019,
  level: 26,
  email: 'edgardo.16jp@gmail.com',
  phone: '+507 6587 6097',
  whatsapp:
    'https://api.whatsapp.com/send?phone=50765876097&text=Hola,%20más%20información!',
  cv: '/pdf/CV-Edgardo-Pinto.pdf',
  avatar: '/img/perfil.png',
  about: `Ingeniero en Sistemas y desarrollador Full Stack con foco en React, Next.js, TypeScript y Node.js. En la industria tecnológica desde 2019, he gestionado TI, análisis de datos, seguridad informática y desarrollo de software. Actualmente en ACTIVE RE me especializo en soluciones de datos end-to-end: diseño de APIs REST con Node.js, arquitecturas de ingestión y procesamiento de datos, e integraciones entre sistemas heterogéneos (ERP, CRM, SQL). Trabajo bajo metodologías Scrum/Agile y aplico agentes de IA (Anthropic, OpenAI) para automatizar procesos empresariales.`,
  socials: {
    linkedin: 'https://www.linkedin.com/in/edgardo-pinto-0a935a126',
    github: 'https://github.com/edjo16',
    instagram: 'https://www.instagram.com/edgardopinto16j',
  },
} as const;

/** Player Profile attributes — shown as bars with level labels (no numbers). */
export const attributes: { label: string; level: SkillLevel }[] = [
  { label: 'Frontend', level: 'Avanzado' },
  { label: 'Backend / APIs', level: 'Avanzado' },
  { label: 'Datos & BI', level: 'Avanzado' },
  { label: 'Cloud / DevOps', level: 'Intermedio' },
];

/** Headline stats */
export const stats = [
  { value: 7, suffix: '+', label: 'Años en tecnología' },
  { value: 4, suffix: '', label: 'Empresas / instituciones' },
  { value: 20, suffix: '+', label: 'Tecnologías y herramientas' },
  { value: 100, suffix: '%', label: 'Procesos automatizados' },
] as const;
