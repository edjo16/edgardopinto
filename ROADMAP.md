# ROADMAP — Portfolio AAA · Edgardo Pinto

> Transformación total del portfolio: de sitio estático HTML/CSS/JS → aplicación **React + Vite + TypeScript** con una experiencia interactiva tipo *AAA game UI* (inspiración: GTA V, Cyberpunk 2077, Watch Dogs, COD HQ), manteniendo identidad visual propia y profesionalismo de ingeniería senior.

---

## 0. Estado actual (auditoría)

| Aspecto | Realidad |
|---|---|
| Stack | **HTML estático + CSS + JS vanilla** (template Bedimcode). NO es React. |
| Archivos | `index.html` (675 líneas), `assets/css/styles.css`, `assets/js/main.js`, libs: Swiper, MixItUp, ScrollReveal |
| Build / tooling | Ninguno (sin `package.json`, sin bundler) |
| Secciones | Home, About, Skills, Services, Work (3 proyectos), Education, Contact, Footer |
| Idioma | Español (mantener) |
| Contenido reutilizable | Imágenes de proyectos, CV PDF, datos de educación/certificados, redes sociales |
| Problemas | Typos (`<sppan>`, `contract__content`, "Pyton"), URL Instagram mal escrita (`intagram`), `<script src="">` vacío, form sin validación |

### Decisiones tomadas
- **Stack base:** Vite + React + **TypeScript**
- **Proyecto estrella:** Plataforma de Monitoreo Industrial **IoT** (alineado a ICAutomatizados, defendible en entrevista)
- **Paleta:** bg `#050505`, primary `#00F5FF`, secondary `#A855F7`, accent `#FFB800`, text `#FFFFFF`

---

## 1. Stack objetivo

| Capa | Tecnología |
|---|---|
| Core | React 18 + Vite + TypeScript |
| Animación | GSAP + ScrollTrigger, Framer Motion |
| 3D | React Three Fiber + Drei |
| Smooth scroll | Lenis |
| Iconos | React Icons |
| Estilos | CSS Modules + variables CSS (tokens de diseño) |
| Formulario | React Hook Form + Zod + Formspree (endpoint existente) |
| Calidad | ESLint + Prettier + Vitest |
| Deploy | Vercel / Netlify (SPA) |

---

## 2. Épicas

- **E1 — Fundación técnica:** scaffolding Vite+TS, arquitectura de carpetas, design tokens, migración de assets.
- **E2 — Core de experiencia:** layout, providers (Lenis, audio, theme), cursor custom, loader cinematográfico, navegación glassmorphism.
- **E3 — Secciones de contenido:** Hero, Player Profile (About), Skills, Misiones (Projects), Proyecto estrella IoT, Timeline experiencia, Contacto.
- **E4 — Motion & 3D:** sistema de animaciones reutilizables (GSAP/Framer), fondo 3D/partículas, parallax, reveals.
- **E5 — Extras & pulido:** efectos de sonido, easter eggs, contador de visitas, SEO/meta, accesibilidad, performance (Lighthouse > 90).
- **E6 — QA, responsive & deploy:** responsive (mobile→ultrawide), pruebas, optimización, despliegue.

---

## 3. Plan de Sprints

> Cadencia sugerida: sprints de ~1 semana. Cada feature lista criterios de aceptación (AC).

### 🟢 Sprint 0 — Fundación (E1) — *EN CURSO*
**Objetivo:** dejar el proyecto React corriendo con la arquitectura y los tokens listos.

- **F0.1** Preservar legacy: mover sitio estático a `/legacy`.
- **F0.2** Scaffolding Vite + React + TS.
- **F0.3** Instalar dependencias (GSAP, Framer Motion, R3F, Drei, Lenis, React Icons, RHF, Zod).
- **F0.4** Arquitectura de carpetas (`components/`, `sections/`, `hooks/`, `lib/`, `styles/`, `data/`, `assets/`).
- **F0.5** Design tokens en CSS (paleta, tipografía, spacing, z-index, glow utilities).
- **F0.6** ESLint + Prettier + scripts npm.
- **F0.7** Migrar assets (imágenes, CV) a `src/assets` / `public`.

**AC:** `npm run dev` arranca, muestra placeholder con tokens aplicados, lint pasa.

---

### Sprint 1 — Núcleo de experiencia (E2)
- **F1.1** `Layout` + estructura de secciones con anclas.
- **F1.2** Provider de **Lenis** (smooth scroll) + sync con ScrollTrigger.
- **F1.3** **Cursor personalizado** (estados: default, hover, click) con desactivación en touch.
- **F1.4** **Loader cinematográfico** inicial (barra de carga estilo videojuego + transición de salida).
- **F1.5** **Navbar futurista**: glassmorphism, blur, indicador de sección activa (scroll spy), responsive (menú estilo HUD en mobile).
- **F1.6** Theme dark futurista + toggle (persistencia en localStorage).

**AC:** scroll suave, cursor y loader funcionando, navbar resalta sección activa.

---

### Sprint 2 — Hero + sistema de motion (E3 + E4)
- **F2.1** **Hero** pantalla completa: titulares "SOFTWARE ENGINEER / FULL STACK DEVELOPER / REACT · NODE.JS · POSTGRESQL · AZURE".
- **F2.2** Texto revelado **letra por letra** (GSAP SplitText / stagger).
- **F2.3** **Fondo dinámico**: partículas / grid animado (R3F o canvas) + parallax.
- **F2.4** CTAs **View Projects** / **Contact Me** con micro-interacciones.
- **F2.5** Hook reutilizable `useReveal` (ScrollTrigger) + variantes Framer Motion compartidas.

**AC:** hero impacta en <2.5s LCP, animaciones a 60fps, respeta `prefers-reduced-motion`.

---

### Sprint 3 — Player Profile + Skills (E3 + E4)
- **F3.1** **About como "Player Profile"**: avatar, bio, stats animadas (años, proyectos, soporte).
- **F3.2** Barras de atributos animadas: Frontend 92%, Backend 88%, Cloud 75%, Architecture 80% + "Level XX Engineer".
- **F3.3** **Skills** con barras + glow + hover (React, Node, Express, PostgreSQL, SQL Server, Azure, Docker, Git, Redux, JS, TS).
- **F3.4** Contadores animados al entrar en viewport.

**AC:** stats animan una sola vez al entrar a viewport; datos centralizados en `data/`.

---

### Sprint 4 — Misiones (Projects) + Proyecto estrella IoT (E3 + E4)
- **F4.1** **Projects como "misiones desbloqueables"**: cards con hover (glow, escala, info expandible) + tecnologías.
- **F4.2** Migrar proyectos reales (Weather App, JWT Auth, Live Chat) al nuevo formato.
- **F4.3** **Proyecto estrella IoT** (destacado, layout especial): descripción, features, stack, impacto, métricas.
- **F4.4** **Mockups** del dashboard IoT (UI simulada / imágenes generadas) — el más impresionante del sitio.
- **F4.5** Modal/detalle de proyecto con transición tipo videojuego.

**AC:** filtros funcionan; proyecto estrella domina visualmente; contenido defendible técnicamente.

> **Contenido del proyecto estrella (IoT):** Plataforma de Monitoreo Industrial IoT — ingesta de telemetría en tiempo real, dashboards, alertas, predicción de fallos. Stack: React, TypeScript, Node.js, PostgreSQL/TimescaleDB, MQTT, Redis, Azure, Docker. Impacto: -X% downtime, monitoreo 24/7, mantenimiento predictivo.

---

### Sprint 5 — Experiencia (Timeline) + Contacto (E3)
- **F5.1** **Timeline futurista** de experiencia laboral: reveal progresivo al scroll, indicadores luminosos, nodos.
- **F5.2** **Educación/Certificados** rediseñada (reemplazo de Swiper por carrusel propio o Embla).
- **F5.3** **Contacto premium**: formulario glassmorphism + React Hook Form + Zod + Formspree.
- **F5.4** Tarjetas de contacto (email, WhatsApp) + **redes sociales animadas** (corregir URL Instagram).

**AC:** form valida y envía; timeline anima al scroll; sin typos del legacy.

---

### Sprint 6 — Extras & pulido (E5)
- **F6.1** **Efectos de sonido** opcionales (hover/click/transición), **desactivados por defecto** + toggle.
- **F6.2** **Easter eggs** sutiles (ej. código Konami, comando en consola).
- **F6.3** **Contador de visitas** (servicio externo tipo CountAPI / o Supabase).
- **F6.4** SEO/meta + Open Graph + favicon + `lang` correcto.
- **F6.5** Accesibilidad: foco visible, aria, contraste, `prefers-reduced-motion`.

**AC:** sonido off por defecto; meta tags completos; navegable por teclado.

---

### Sprint 7 — Responsive, performance & deploy (E6)
- **F7.1** **Responsive** completo: mobile, tablet, desktop, ultrawide.
- **F7.2** **Performance**: lazy loading, code splitting (`React.lazy`/`Suspense`), memoization, imágenes WebP/AVIF optimizadas.
- **F7.3** Auditoría **Lighthouse > 90** (perf, a11y, best practices, SEO).
- **F7.4** Pruebas (Vitest) de componentes clave + smoke test.
- **F7.5** **Deploy** (Vercel/Netlify) + dominio + CI básico.

**AC:** Lighthouse > 90 en mobile y desktop; build de producción desplegado.

---

## 4. Arquitectura de carpetas objetivo

```
src/
  assets/            # imágenes optimizadas, fuentes
  components/        # UI reutilizable (Button, Cursor, Loader, Navbar, GlowCard...)
  sections/          # Hero, About, Skills, Projects, Experience, Contact, Footer
  hooks/             # useReveal, useLenis, useScrollSpy, useSound...
  lib/               # gsap setup, motion variants, utils
  data/              # skills, projects, experience, education (tipados)
  styles/            # tokens.css, globals.css, mixins
  providers/         # LenisProvider, ThemeProvider, AudioProvider
  App.tsx / main.tsx
public/              # CV.pdf, og-image, favicon
legacy/              # sitio estático original (referencia)
```

---

## 5. Riesgos y mitigaciones
- **Performance vs efectos AAA:** R3F/partículas pueden bajar el FPS → presupuesto de animación, lazy-load del canvas, degradar en mobile.
- **Contenido del proyecto IoT:** debe ser defendible → documentar arquitectura y decisiones reales.
- **Accesibilidad vs animación:** respetar `prefers-reduced-motion` siempre.
- **Scope creep:** los extras (E5) son "nice to have"; priorizar E1–E4 + responsive/deploy.

---

---

## 6. Estado de ejecución (actualizado)

| Sprint | Estado | Notas |
|---|---|---|
| S0 — Fundación | ✅ Hecho | Vite+React+TS, libs, arquitectura, tokens, lint, assets migrados |
| S1 — Núcleo experiencia | ✅ Hecho | Lenis, cursor, loader, navbar glass + scroll-spy, theme, audio |
| S2 — Hero + motion | ✅ Hecho | Partículas R3F (gated desktop), texto letra a letra GSAP, CTAs |
| S3 — Player Profile + Skills | ✅ Hecho | Stats + contadores + barras animadas con glow |
| S4 — Projects + IoT | ✅ Hecho | Misiones con dificultad/XP, modal, mockup IoT animado |
| S5 — Experiencia + Contacto | ✅ Hecho | Timeline, educación, form RHF+Zod+Formspree, socials |
| S6 — Extras | ✅ Hecho | ScrollProgress, sonido opcional (off), easter egg Konami, contador visitas, SEO |
| S7 — Responsive/Perf/Deploy | 🟡 Parcial | Responsive + code-splitting + tests (10 ✓) + config Vercel/Netlify listos |

**Validado:** `tsc` ✅ · `eslint` ✅ · `vite build` ✅ · `vitest` 10/10 ✅ · preview sirve 200 ✅

**Pendiente (requiere navegador/hosting real):**
- Correr Lighthouse real en mobile/desktop y ajustar (objetivo > 90).
- QA visual en dispositivos reales (mobile, tablet, ultrawide).
- Desplegar a Vercel/Netlify y conectar dominio.
- Opcional: imagen OG dedicada (hoy usa `/img/perfil.png`).

*Sprints 0–6 completados. Sprint 7 con base lista; pendiente la auditoría Lighthouse y el deploy.*
