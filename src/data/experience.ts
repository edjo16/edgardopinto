export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: 'Oct 2024 — Actualidad',
    role: 'Analista de Sistemas y Programador',
    company: 'ACTIVE RE',
    description:
      'Desarrollo de APIs REST con Node.js para integrar datos de ERP, CRM y bases SQL, y diseño de arquitecturas de datos end-to-end (ingestión, procesamiento y almacenamiento en SQL/PostgreSQL). Desarrollo Full Stack de plataformas de e-commerce y apps web con React, TypeScript y Node.js, dashboards en tiempo real con Power BI, y soluciones en la nube (Azure/AWS) bajo metodologías Scrum/Agile.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Power BI', 'Azure/AWS'],
  },
  {
    period: 'Abr 2023 — Oct 2024',
    role: 'Ingeniero en Sistemas',
    company: 'Ingeniería y Controles Automatizados (ICA)',
    description:
      'Solución integral de análisis de datos integrando APIs, ERP, CRM y bases de datos. Despliegue de infraestructura de red avanzada (firewalls, servidores, central telefónica) y herramientas automatizadas para procesos comerciales y de compras. Desarrollo Full Stack con React y Node.js, además de mantenimiento de sistemas heredados en PHP e integraciones entre sistemas heterogéneos.',
    tags: ['React', 'Node.js', 'PHP', 'ERP/CRM', 'Redes', 'Integraciones'],
  },
  {
    period: 'Jun 2022 — Abr 2023',
    role: 'Soporte Técnico',
    company: 'Contraloría General (CGR)',
    description:
      'Supervisión y mantenimiento de sistemas y redes garantizando alta disponibilidad y seguridad, con resolución proactiva de incidencias. Análisis de datos con Power BI y Python para el censo de población, mejorando la visibilidad del progreso e identificando puntos críticos del proyecto.',
    tags: ['Power BI', 'Python', 'Redes', 'Seguridad', 'Soporte IT'],
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
      'Énfasis en Seguridad Informática',
      'Universidad del Istmo',
      'Cursos de emprendimiento y atención al cliente',
    ],
  },
  {
    title: 'Cisco CCNA & Inglés',
    image: '/img/ccna-routing.jpg',
    items: [
      'Cursos de Cisco con certificación',
      'Inglés intensivo certificado',
      'Licencia de conducir tipo D',
    ],
  },
  {
    title: 'AI Agents — Anthropic & OpenAI',
    image: '/img/dojo.png',
    items: [
      'Desarrollo e implementación de agentes de IA',
      'Uso de APIs de Anthropic y OpenAI',
      'Automatización de procesos empresariales',
    ],
  },
];
