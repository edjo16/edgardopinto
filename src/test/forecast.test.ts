import { describe, it, expect } from 'vitest';
import {
  mean,
  stdDev,
  movingAverage,
  linearForecast,
  sesForecast,
  analyzeSku,
} from '../demos/stocksense/forecast';

describe('statistics helpers', () => {
  it('mean of empty series is 0', () => {
    expect(mean([])).toBe(0);
  });
  it('mean computes the average', () => {
    expect(mean([2, 4, 6])).toBe(4);
  });
  it('stdDev of constant series is 0', () => {
    expect(stdDev([5, 5, 5])).toBe(0);
  });
});

describe('movingAverage', () => {
  it('averages only the last `window` values', () => {
    expect(movingAverage([1, 2, 3, 10, 20], 2)).toBe(15);
  });
});

describe('linearForecast', () => {
  it('extrapolates a perfect upward trend', () => {
    // series 1..5 -> next predicted value is 6
    expect(linearForecast([1, 2, 3, 4, 5])).toBeCloseTo(6, 5);
  });
  it('never returns a negative forecast', () => {
    expect(linearForecast([5, 4, 3, 2, 1, 0])).toBeGreaterThanOrEqual(0);
  });
});

describe('sesForecast', () => {
  it('tracks a constant series exactly', () => {
    expect(sesForecast([10, 10, 10, 10])).toBeCloseTo(10, 5);
  });
});

describe('analyzeSku', () => {
  it('flags reorder when stock is below the reorder point', () => {
    const r = analyzeSku({
      history: [10, 10, 10, 10, 10, 10, 10],
      currentStock: 5,
      leadTimeDays: 7,
      method: 'sma',
      serviceLevel: '95%',
    });
    expect(r.dailyDemand).toBeCloseTo(10, 1);
    expect(r.reorderPoint).toBeGreaterThanOrEqual(70); // ~10/day * 7 days
    expect(r.needsReorder).toBe(true);
    expect(r.suggestedOrder).toBeGreaterThan(0);
  });

  it('does not reorder when stock is comfortably high', () => {
    const r = analyzeSku({
      history: [10, 10, 10, 10, 10, 10, 10],
      currentStock: 1000,
      leadTimeDays: 7,
      method: 'sma',
      serviceLevel: '95%',
    });
    expect(r.needsReorder).toBe(false);
    expect(r.suggestedOrder).toBe(0);
  });

  it('reports infinite cover when there is no demand', () => {
    const r = analyzeSku({
      history: [0, 0, 0, 0],
      currentStock: 50,
      leadTimeDays: 5,
      method: 'sma',
      serviceLevel: '90%',
    });
    expect(r.daysOfCover).toBe(Infinity);
  });
});
