import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/utils';
import styles from './IoTMockup.module.css';

/**
 * Animated, self-contained mockup of the Industrial IoT dashboard.
 * Built entirely with DOM + SVG so it looks crisp at any resolution and
 * needs no image assets. The live line chart animates a sparkline path.
 */
export function IoTMockup() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    let raf = 0;
    const W = 320;
    const H = 90;
    const points = 40;

    const render = () => {
      frame += 0.05;
      let d = '';
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * W;
        const y =
          H / 2 +
          Math.sin(i * 0.5 + frame) * 18 +
          Math.sin(i * 0.17 + frame * 1.7) * 8;
        d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
      }
      pathRef.current?.setAttribute('d', d);
      raf = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.window} aria-hidden>
      {/* title bar */}
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i /> <i /> <i />
        </span>
        <span className={styles.url}>sentinel.icautomatizados.io</span>
        <span className={styles.live}>
          <i className={styles.pulse} /> LIVE
        </span>
      </div>

      {/* body */}
      <div className={styles.body}>
        <aside className={styles.side}>
          <span className={styles.logo}>⬢ SENTINEL</span>
          {['Overview', 'Sensores', 'Alertas', 'Predicción', 'Plantas'].map(
            (item, i) => (
              <span key={item} className={i === 0 ? styles.navOn : styles.nav}>
                {item}
              </span>
            )
          )}
        </aside>

        <main className={styles.main}>
          <div className={styles.kpis}>
            {[
              { k: 'Uptime', v: '99.4%', c: 'ok' },
              { k: 'Sensores', v: '1,284', c: 'cy' },
              { k: 'Alertas', v: '03', c: 'warn' },
              { k: 'Throughput', v: '8.2k/s', c: 'vi' },
            ].map((kpi) => (
              <div key={kpi.k} className={styles.kpi} data-c={kpi.c}>
                <span className={styles.kpiK}>{kpi.k}</span>
                <span className={styles.kpiV}>{kpi.v}</span>
              </div>
            ))}
          </div>

          <div className={styles.chart}>
            <span className={styles.chartTitle}>Telemetría · Temp. línea A</span>
            <svg viewBox="0 0 320 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="stroke" x1="0" x2="1">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                className={styles.spark}
                stroke="url(#stroke)"
                fill="none"
              />
            </svg>
          </div>

          <div className={styles.bars}>
            {[60, 80, 45, 92, 70, 55, 88].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
