import { Suspense, lazy, useState } from 'react';
import { LenisProvider } from '../providers/LenisProvider';
import { Loader } from '../components/Loader/Loader';
import { Navbar } from '../components/Navbar/Navbar';
import { ScrollProgress } from '../components/ScrollProgress/ScrollProgress';
import { VisitCounter } from '../components/VisitCounter/VisitCounter';
import { Hero } from '../sections/Hero/Hero';

// Below-the-fold sections are code-split to keep the initial bundle lean.
const About = lazy(() =>
  import('../sections/About/About').then((m) => ({ default: m.About }))
);
const Skills = lazy(() =>
  import('../sections/Skills/Skills').then((m) => ({ default: m.Skills }))
);
const Projects = lazy(() =>
  import('../sections/Projects/Projects').then((m) => ({ default: m.Projects }))
);
const Experience = lazy(() =>
  import('../sections/Experience/Experience').then((m) => ({ default: m.Experience }))
);
const Contact = lazy(() =>
  import('../sections/Contact/Contact').then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import('../components/Footer/Footer').then((m) => ({ default: m.Footer }))
);

export default function Portfolio() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
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
    </>
  );
}
