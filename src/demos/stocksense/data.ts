/** Deterministic pseudo-random generator (LCG) so the demo is stable on reload. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/** Build `days` of daily sales around a base level with noise and a trend. */
function buildHistory(seed: number, base: number, trend: number, days = 30): number[] {
  const rng = makeRng(seed);
  const out: number[] = [];
  for (let i = 0; i < days; i++) {
    const noise = (rng() - 0.5) * base * 0.6;
    const value = base + trend * i + noise;
    out.push(Math.max(0, Math.round(value)));
  }
  return out;
}

export type InventoryItem = {
  sku: string;
  name: string;
  category: 'Sensores' | 'Controladores' | 'Actuadores' | 'Cableado' | 'Consumibles';
  unitPrice: number;
  leadTimeDays: number;
  currentStock: number;
  history: number[];
};

export const inventory: InventoryItem[] = [
  {
    sku: 'SEN-PT100',
    name: 'Sensor de temperatura PT100',
    category: 'Sensores',
    unitPrice: 18,
    leadTimeDays: 7,
    currentStock: 120,
    history: buildHistory(11, 9, 0.2),
  },
  {
    sku: 'CTL-S71200',
    name: 'PLC Siemens S7-1200',
    category: 'Controladores',
    unitPrice: 420,
    leadTimeDays: 21,
    currentStock: 6,
    history: buildHistory(23, 1.2, 0.05),
  },
  {
    sku: 'ACT-VLV25',
    name: 'Válvula solenoide 1/4"',
    category: 'Actuadores',
    unitPrice: 36,
    leadTimeDays: 10,
    currentStock: 14,
    history: buildHistory(37, 4, 0.3),
  },
  {
    sku: 'CBL-CAT6-305',
    name: 'Cable de red CAT6 (caja 305m)',
    category: 'Cableado',
    unitPrice: 95,
    leadTimeDays: 5,
    currentStock: 8,
    history: buildHistory(41, 3.5, -0.1),
  },
  {
    sku: 'SEN-PROX-M12',
    name: 'Sensor inductivo de proximidad M12',
    category: 'Sensores',
    unitPrice: 28,
    leadTimeDays: 9,
    currentStock: 54,
    history: buildHistory(53, 6, 0.15),
  },
  {
    sku: 'ACT-RELAY-24',
    name: 'Relé industrial 24V',
    category: 'Actuadores',
    unitPrice: 12,
    leadTimeDays: 6,
    currentStock: 30,
    history: buildHistory(67, 5, 0.4),
  },
  {
    sku: 'CON-TERM-2.5',
    name: 'Borne de conexión 2.5mm² (paq. 50)',
    category: 'Consumibles',
    unitPrice: 22,
    leadTimeDays: 4,
    currentStock: 16,
    history: buildHistory(71, 7, 0.25),
  },
  {
    sku: 'CTL-HMI-7',
    name: 'Pantalla HMI 7"',
    category: 'Controladores',
    unitPrice: 310,
    leadTimeDays: 18,
    currentStock: 9,
    history: buildHistory(83, 1.5, 0.08),
  },
];
