/**
 * StockSense — pure inventory forecasting logic.
 *
 * All functions are deterministic and side-effect free so they can be unit
 * tested and reasoned about independently of the UI. Demand is modelled as a
 * series of daily sales; from it we derive a daily forecast, variability, a
 * reorder point with safety stock, and a suggested order quantity.
 */

export type ForecastMethod = 'sma' | 'linear' | 'ses';

/** Service level → z-score (one-sided) for safety stock. */
export const SERVICE_LEVELS = {
  '90%': 1.28,
  '95%': 1.65,
  '99%': 2.33,
} as const;
export type ServiceLevel = keyof typeof SERVICE_LEVELS;

export const mean = (xs: number[]): number =>
  xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;

export const stdDev = (xs: number[]): number => {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  const variance = xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1);
  return Math.sqrt(variance);
};

/** Simple moving average of the last `window` observations. */
export function movingAverage(series: number[], window = 7): number {
  if (series.length === 0) return 0;
  const slice = series.slice(-window);
  return mean(slice);
}

/** Ordinary least squares trend; returns the predicted next value (clamped ≥0). */
export function linearForecast(series: number[]): number {
  const n = series.length;
  if (n === 0) return 0;
  if (n === 1) return series[0];
  const xs = series.map((_, i) => i);
  const mx = mean(xs);
  const my = mean(series);
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (series[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = my - slope * mx;
  return Math.max(0, intercept + slope * n);
}

/** Simple exponential smoothing; returns the next-step forecast. */
export function sesForecast(series: number[], alpha = 0.4): number {
  if (series.length === 0) return 0;
  let level = series[0];
  for (let i = 1; i < series.length; i++) {
    level = alpha * series[i] + (1 - alpha) * level;
  }
  return Math.max(0, level);
}

/** Daily demand forecast for the chosen method. */
export function dailyForecast(
  series: number[],
  method: ForecastMethod,
  window = 7
): number {
  switch (method) {
    case 'linear':
      return linearForecast(series);
    case 'ses':
      return sesForecast(series);
    case 'sma':
    default:
      return movingAverage(series, window);
  }
}

export type SkuAnalysis = {
  dailyDemand: number;
  /** demand expected to occur during the supplier lead time */
  leadTimeDemand: number;
  safetyStock: number;
  reorderPoint: number;
  needsReorder: boolean;
  suggestedOrder: number;
  /** estimated days of stock left at the current daily demand */
  daysOfCover: number;
};

export type AnalyzeParams = {
  history: number[];
  currentStock: number;
  leadTimeDays: number;
  method: ForecastMethod;
  serviceLevel: ServiceLevel;
  /** how many days of demand to cover when reordering */
  reviewDays?: number;
};

export function analyzeSku({
  history,
  currentStock,
  leadTimeDays,
  method,
  serviceLevel,
  reviewDays = 14,
}: AnalyzeParams): SkuAnalysis {
  const daily = dailyForecast(history, method);
  const z = SERVICE_LEVELS[serviceLevel];
  const sigma = stdDev(history);

  const leadTimeDemand = daily * leadTimeDays;
  const safetyStock = z * sigma * Math.sqrt(Math.max(leadTimeDays, 0));
  const reorderPoint = leadTimeDemand + safetyStock;
  const needsReorder = currentStock <= reorderPoint;

  // order up to: demand over (lead time + review period) + safety stock
  const orderUpTo = daily * (leadTimeDays + reviewDays) + safetyStock;
  const suggestedOrder = needsReorder
    ? Math.max(0, Math.ceil(orderUpTo - currentStock))
    : 0;

  const daysOfCover = daily > 0 ? currentStock / daily : Infinity;

  return {
    dailyDemand: Math.round(daily * 10) / 10,
    leadTimeDemand: Math.round(leadTimeDemand),
    safetyStock: Math.round(safetyStock),
    reorderPoint: Math.round(reorderPoint),
    needsReorder,
    suggestedOrder,
    daysOfCover: Math.round(daysOfCover * 10) / 10,
  };
}
