export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: '2023 — Presente',
    role: 'Software Engineer',
    company: 'ICAutomatizados (@ICA)',
    description:
      'Desarrollo de software y automatización de procesos industriales y empresariales. Construcción de soluciones multiempresa con React, Node.js y Power BI para optimizar operaciones internas y crear productos comercializables.',
    tags: ['React', 'TypeScript', 'Node.js', 'Power BI', 'Azure'],
  },
  {
    period: '2021 — 2023',
    role: 'IT & Data Analyst',
    company: 'Industria tecnológica',
    description:
      'Gestión de áreas de TI, análisis de datos y seguridad informática. Implementación de dashboards y automatización de reportes para la toma de decisiones.',
    tags: ['Python', 'SQL', 'Power BI', 'Seguridad'],
  },
  {
    period: '2019 — 2021',
    role: 'IT Support & Networking',
    company: 'Soporte técnico',
    description:
      'Administración de infraestructura, configuración de equipos de red, Active Directory y políticas de seguridad. Base sólida en redes y sistemas que sustenta mi enfoque de ingeniería.',
    tags: ['Redes', 'Active Directory', 'Linux', 'Soporte IT'],
  },
];

export type Education = {
  title: string;
  image: string;
  items: string[];
};

export const education: Education[] = [
  {
    title: 'Ingeniería en Sistemas',
    image: '/img/ingenieriaensistemas.png',
    items: [
      'Sistema de gestión para clínica',
      'Plataforma web para agencia de viajes',
      'Fundamentos de algoritmos y estructuras de datos',
    ],
  },
  {
    title: 'CCNA — Cisco',
    image: '/img/ccna-routing.jpg',
    items: [
      'Introducción a Redes',
      'Routing & Switching',
      'Networking, Security & Automation',
    ],
  },
  {
    title: 'SOC Analyst Level 1',
    image: '/img/dojo.png',
    items: [
      'Marcos de Seguridad',
      'Operaciones y Gestión de la Seguridad',
      'Windows y Linux para Analistas',
      'SIEM',
    ],
  },
];
