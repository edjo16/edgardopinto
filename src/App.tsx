import { Suspense, lazy, useState } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AudioProvider } from './providers/AudioProvider';
import { LenisProvider } from './providers/LenisProvider';
import { Loader } from './components/Loader/Loader';
import { Cursor } from './components/Cursor/Cursor';
import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { EasterEgg } from './components/EasterEgg/EasterEgg';
import { VisitCounter } from './components/VisitCounter/VisitCounter';
import { Hero } from './sections/Hero/Hero';

// Below-the-fold sections are code-split to keep the initial bundle lean.
const About = lazy(() =>
  import('./sections/About/About').then((m) => ({ default: m.About }))
);
const Skills = lazy(() =>
  import('./sections/Skills/Skills').then((m) => ({ default: m.Skills }))
);
const Projects = lazy(() =>
  import('./sections/Projects/Projects').then((m) => ({ default: m.Projects }))
);
const Experience = lazy(() =>
  import('./sections/Experience/Experience').then((m) => ({ default: m.Experience }))
);
const Contact = lazy(() =>
  import('./sections/Contact/Contact').then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import('./components/Footer/Footer').then((m) => ({ default: m.Footer }))
);

function App() {
  const [ready, setReady] = useState(false);

  return (
    <ThemeProvider>
      <AudioProvider>
        <Loader onComplete={() => setReady(true)} />
        <Cursor />
        <EasterEgg />

        {ready && (
          <LenisProvider>
            <ScrollProgress />
            <Navbar />
            <VisitCounter />
            <main>
              <Hero />
              <Suspense fallback={null}>
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </LenisProvider>
        )}
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
