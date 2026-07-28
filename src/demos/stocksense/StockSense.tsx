import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiAlertTriangle,
  FiBox,
  FiDollarSign,
  FiTrendingUp,
} from 'react-icons/fi';
import { inventory } from './data';
import {
  analyzeSku,
  type ForecastMethod,
  type ServiceLevel,
} from './forecast';
import { Sparkline } from './Sparkline';
import styles from './StockSense.module.css';

const METHOD_LABELS: Record<ForecastMethod, string> = {
  sma: 'Media móvil (7d)',
  linear: 'Regresión lineal',
  ses: 'Suavizado exponencial',
};

const categories = ['Todas', ...new Set(inventory.map((i) => i.category))];

export default function StockSense() {
  const [method, setMethod] = useState<ForecastMethod>('sma');
  const [service, setService] = useState<ServiceLevel>('95%');
  const [category, setCategory] = useState('Todas');
  const [overrides, setOverrides] = useState<Record<string, number>>({});

  const rows = useMemo(() => {
    return inventory
      .filter((i) => category === 'Todas' || i.category === category)
      .map((item) => {
        const currentStock = overrides[item.sku] ?? item.currentStock;
        const analysis = analyzeSku({
          history: item.history,
          currentStock,
          leadTimeDays: item.leadTimeDays,
          method,
          serviceLevel: service,
        });
        return { item, currentStock, analysis };
      });
  }, [method, service, category, overrides]);

  const kpis = useMemo(() => {
    const all = inventory.map((item) => {
      const currentStock = overrides[item.sku] ?? item.currentStock;
      return {
        item,
        currentStock,
        analysis: analyzeSku({
          history: item.history,
          currentStock,
          leadTimeDays: item.leadTimeDays,
          method,
          serviceLevel: service,
        }),
      };
    });
    const reorderCount = all.filter((r) => r.analysis.needsReorder).length;
    const inventoryValue = all.reduce(
      (sum, r) => sum + r.currentStock * r.item.unitPrice,
      0
    );
    const orderValue = all.reduce(
      (sum, r) => sum + r.analysis.suggestedOrder * r.item.unitPrice,
      0
    );
    return { total: all.length, reorderCount, inventoryValue, orderValue };
  }, [method, service, overrides]);

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <Link to="/" className={styles.back}>
          <FiArrowLeft /> Portfolio
        </Link>
        <div className={styles.brand}>
          <span className={styles.logo}>◧ StockSense</span>
          <span className={styles.tagline}>
            Inventario inteligente · predicción de demanda
          </span>
        </div>
        <span className={styles.badge}>LIVE DEMO</span>
      </header>

      {/* KPIs */}
      <section className={styles.kpis}>
        <article className={styles.kpi}>
          <FiBox className={styles.kpiIcon} />
          <div>
            <span className={styles.kpiValue}>{kpis.total}</span>
            <span className={styles.kpiLabel}>SKUs monitoreados</span>
          </div>
        </article>
        <article className={styles.kpi} data-alert={kpis.reorderCount > 0}>
          <FiAlertTriangle className={styles.kpiIcon} />
          <div>
            <span className={styles.kpiValue}>{kpis.reorderCount}</span>
            <span className={styles.kpiLabel}>Por debajo del punto de pedido</span>
          </div>
        </article>
        <article className={styles.kpi}>
          <FiDollarSign className={styles.kpiIcon} />
          <div>
            <span className={styles.kpiValue}>
              ${kpis.inventoryValue.toLocaleString('es')}
            </span>
            <span className={styles.kpiLabel}>Valor de inventario</span>
          </div>
        </article>
        <article className={styles.kpi}>
          <FiTrendingUp className={styles.kpiIcon} />
          <div>
            <span className={styles.kpiValue}>
              ${kpis.orderValue.toLocaleString('es')}
            </span>
            <span className={styles.kpiLabel}>Reposición sugerida</span>
          </div>
        </article>
      </section>

      {/* Controls */}
      <section className={styles.controls}>
        <label className={styles.control}>
          <span>Método de pronóstico</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as ForecastMethod)}
          >
            {(Object.keys(METHOD_LABELS) as ForecastMethod[]).map((m) => (
              <option key={m} value={m}>
                {METHOD_LABELS[m]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.control}>
          <span>Nivel de servicio</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value as ServiceLevel)}
          >
            {(['90%', '95%', '99%'] as ServiceLevel[]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.control}>
          <span>Categoría</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <p className={styles.hint}>
          Edita el stock de cualquier fila para recalcular el punto de pedido en
          vivo.
        </p>
      </section>

      {/* Table */}
      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SKU / Producto</th>
              <th>Tendencia (30d)</th>
              <th className={styles.num}>Stock</th>
              <th className={styles.num}>Demanda/día</th>
              <th className={styles.num}>Punto de pedido</th>
              <th className={styles.num}>Cobertura</th>
              <th className={styles.num}>Pedir</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ item, currentStock, analysis }) => (
              <tr key={item.sku} data-alert={analysis.needsReorder}>
                <td>
                  <span className={styles.sku}>{item.sku}</span>
                  <span className={styles.pname}>{item.name}</span>
                  <span className={styles.cat}>{item.category}</span>
                </td>
                <td>
                  <Sparkline data={item.history} />
                </td>
                <td className={styles.num}>
                  <input
                    type="number"
                    className={styles.stockInput}
                    value={currentStock}
                    min={0}
                    onChange={(e) =>
                      setOverrides((o) => ({
                        ...o,
                        [item.sku]: Math.max(0, Number(e.target.value) || 0),
                      }))
                    }
                  />
                </td>
                <td className={styles.num}>{analysis.dailyDemand}</td>
                <td className={styles.num}>{analysis.reorderPoint}</td>
                <td className={styles.num}>
                  {analysis.daysOfCover === Infinity
                    ? '∞'
                    : `${analysis.daysOfCover}d`}
                </td>
                <td className={styles.num}>
                  {analysis.suggestedOrder > 0 ? (
                    <strong className={styles.order}>
                      {analysis.suggestedOrder}
                    </strong>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  {analysis.needsReorder ? (
                    <span className={styles.statusBad}>⚠ Reordenar</span>
                  ) : (
                    <span className={styles.statusOk}>✓ OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className={styles.footer}>
        Demo construido por Edgardo Pinto · React + TypeScript · lógica de
        forecasting (media móvil, regresión lineal, suavizado exponencial) y
        cálculo de safety stock / punto de pedido 100% en el cliente.
      </footer>
    </div>
  );
}
