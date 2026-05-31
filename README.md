# Edgardo Pinto · Portfolio (AAA Game UI)

Portfolio interactivo de ingeniería de software con una estética inspirada en interfaces de videojuegos AAA (HUD, glassmorphism, glow, partículas 3D). Construido con **React + Vite + TypeScript**.

## Stack

- **React 19 + Vite + TypeScript**
- **GSAP + ScrollTrigger** — animaciones y reveal letra por letra del hero
- **Framer Motion** — transiciones, reveals, modales
- **React Three Fiber + Three.js** — campo de partículas del hero
- **Lenis** — smooth scroll (sincronizado con GSAP)
- **React Hook Form + Zod** — formulario de contacto validado (Formspree)
- **React Icons** — iconografía

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite)
npm run preview  # previsualizar el build
npm run lint     # ESLint
npm run format   # Prettier
npm run typecheck
```

## Arquitectura

```
src/
  assets/        # imágenes/fuentes empaquetadas
  components/    # UI reutilizable (Button, Cursor, Loader, Navbar, StatBar, ...)
  sections/      # Hero, About, Skills, Projects, Experience, Contact
  hooks/         # useScrollSpy, useCountUp, useMediaQuery, useTheme, useAudio
  lib/           # gsap setup, motion variants, scroll, utils
  data/          # profile, skills, projects, experience, navigation (tipados)
  providers/     # Lenis, Theme, Audio
  styles/        # tokens.css (design tokens) + globals.css
  types/         # global.d.ts
public/          # CV, imágenes, favicon, robots
legacy/          # sitio estático original (referencia, no se publica)
```

## Características

- Loader cinematográfico de arranque
- Cursor personalizado (se desactiva en touch)
- Navegación glassmorphism con scroll-spy
- Hero con partículas 3D, parallax y texto revelado letra por letra
- "Player Profile" con stats y barras de atributos animadas
- Proyectos como "misiones" con dificultad/XP + modal de detalle
- Proyecto estrella: **Industrial IoT Monitoring Platform** con dashboard mockup animado
- Timeline de trayectoria con reveal progresivo
- Formulario de contacto validado
- Extras: barra de progreso de scroll, sonido opcional (off por defecto), easter egg (Konami), contador de visitas
- Accesible: respeta `prefers-reduced-motion`, foco visible, semántica

## Despliegue

SPA estática. Incluye `vercel.json` y `public/_redirects` (Netlify) para el rewrite a `index.html`.

```bash
npm run build    # genera dist/
```

> Ver `ROADMAP.md` para el plan de épicas y sprints.
