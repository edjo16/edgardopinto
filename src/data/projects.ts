export type Project = {
  id: string;
  title: string;
  codename: string;
  category: 'web' | 'platform' | 'design';
  difficulty: 'Normal' | 'Hard' | 'Legendary';
  status: 'Completado' | 'Destacado';
  featured?: boolean;
  summary: string;
  description: string;
  image: string;
  stack: string[];
  highlights: string[];
  impact?: string[];
  links?: { label: string; url: string }[];
  /** In-app route to a live, playable demo of this project. */
  demoPath?: string;
  /** Optional reward XP shown gamified */
  xp: number;
};

export const projects: Project[] = [
  {
    id: 'iot-monitoring',
    title: 'Industrial IoT Monitoring Platform',
    codename: 'OPERATION · SENTINEL',
    category: 'platform',
    difficulty: 'Legendary',
    status: 'Destacado',
    featured: true,
    summary:
      'Plataforma de monitoreo industrial en tiempo real para líneas de producción y equipos automatizados.',
    description:
      'Plataforma empresarial que ingiere telemetría de PLCs y sensores vía MQTT, la procesa en streaming y la expone en dashboards en tiempo real. Incluye alertas configurables, detección de anomalías y mantenimiento predictivo para reducir paradas no planificadas en planta.',
    image: '/img/grafico.jpg',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL / TimescaleDB',
      'MQTT',
      'Redis',
      'Azure',
      'Docker',
    ],
    highlights: [
      'Ingesta de telemetría en tiempo real (MQTT → WebSockets)',
      'Series temporales con TimescaleDB para histórico de sensores',
      'Dashboards en vivo con alertas y umbrales configurables',
      'Detección de anomalías y mantenimiento predictivo',
      'Arquitectura multiempresa (multi-tenant) en Azure + Docker',
      'Cache con Redis para consultas de alta frecuencia',
    ],
    impact: [
      'Reducción de downtime no planificado mediante alertas tempranas',
      'Visibilidad 24/7 del estado de planta para operaciones',
      'Base de datos comercializable como producto multiempresa',
    ],
    xp: 5000,
  },
  {
    id: 'stocksense',
    title: 'StockSense — Inventario + Predicción de Demanda',
    codename: 'MISSION · ORACLE',
    category: 'platform',
    difficulty: 'Hard',
    status: 'Destacado',
    summary:
      'App de inventario con predicción de demanda, safety stock y punto de pedido calculados en el cliente.',
    description:
      'Demo interactivo y jugable: tabla de inventario industrial con pronóstico de demanda (media móvil, regresión lineal y suavizado exponencial), cálculo de safety stock por nivel de servicio, punto de pedido y cantidad sugerida a ordenar. Edita el stock y los parámetros para ver el recálculo en tiempo real. Toda la lógica corre en el frontend con TypeScript.',
    image: '/img/grafico.jpg',
    stack: ['React', 'TypeScript', 'Algoritmos de forecasting', 'SVG charts'],
    highlights: [
      'Pronóstico: media móvil, regresión lineal (OLS) y suavizado exponencial',
      'Safety stock por nivel de servicio (90/95/99%)',
      'Punto de pedido y cantidad sugerida a ordenar',
      'KPIs y recálculo en vivo al editar el stock',
      'Lógica pura y testeada con Vitest',
    ],
    impact: [
      'Evita quiebres de stock y sobreinventario',
      'Decisiones de compra basadas en datos',
    ],
    demoPath: '/demo/stocksense',
    xp: 3000,
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    codename: 'MISSION · METEORA',
    category: 'web',
    difficulty: 'Normal',
    status: 'Completado',
    summary: 'App del clima por país consumiendo OpenWeatherMap API.',
    description:
      'Aplicación React que consume la API de OpenWeatherMap, con persistencia en LocalStorage y lógica de internacionalización (idioma).',
    image: '/img/wheater.png',
    stack: ['React', 'JavaScript', 'OpenWeatherMap API', 'CSS'],
    highlights: ['LocalStorage', 'Lógica de idioma', 'Consumo de API REST'],
    links: [{ label: 'GitHub', url: 'https://github.com/edjo16/weather' }],
    xp: 900,
  },
  {
    id: 'jwt-auth',
    title: 'JWT Authentication API',
    codename: 'MISSION · GATEKEEPER',
    category: 'web',
    difficulty: 'Hard',
    status: 'Completado',
    summary: 'API de autenticación con JSON Web Tokens y refresh tokens.',
    description:
      'Conjunto de endpoints para el manejo completo de autenticación: registro, login y refresh de tokens, con buenas prácticas de seguridad.',
    image: '/img/jwt.png',
    stack: ['Node.js', 'Express', 'JWT', 'MongoDB'],
    highlights: ['Register', 'Login', 'Refresh tokens', 'Middleware de auth'],
    links: [{ label: 'GitHub', url: 'https://github.com/edjo16/jwt' }],
    xp: 1500,
  },
  {
    id: 'live-chat',
    title: 'Realtime Group Chat',
    codename: 'MISSION · NEXUS',
    category: 'web',
    difficulty: 'Hard',
    status: 'Completado',
    summary: 'Chat grupal en tiempo real usando WebSockets.',
    description:
      'Aplicación de chat en vivo construida con WebSockets, manejo de estados con hooks y actualización en tiempo real de los mensajes.',
    image: '/img/chatgroup.png',
    stack: ['React', 'WebSockets', 'Node.js'],
    highlights: ['Hooks', 'Manejo de estado en tiempo real', 'WebSockets'],
    links: [{ label: 'GitHub', url: 'https://github.com/edjo16/groupchat' }],
    xp: 1500,
  },
];

export const projectFilters = [
  { label: 'Todas', value: 'all' },
  { label: 'Plataformas', value: 'platform' },
  { label: 'Web', value: 'web' },
] as const;
