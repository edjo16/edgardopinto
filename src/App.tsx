import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { AudioProvider } from './providers/AudioProvider';
import { Cursor } from './components/Cursor/Cursor';
import { EasterEgg } from './components/EasterEgg/EasterEgg';
import Portfolio from './pages/Portfolio';

// The interactive demo subproject is code-split — it only loads when opened.
const StockSense = lazy(() => import('./demos/stocksense/StockSense'));

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Cursor />
        <EasterEgg />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route
            path="/demo/stocksense"
            element={
              <Suspense fallback={null}>
                <StockSense />
              </Suspense>
            }
          />
        </Routes>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
