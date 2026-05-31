export type SkillLevel = 'Básico' | 'Intermedio' | 'Avanzado';

/** Visual fill (0-100) used by bars — the number is never shown to the user. */
export const levelToPercent: Record<SkillLevel, number> = {
  Básico: 45,
  Intermedio: 68,
  Avanzado: 92,
};

/** Segments lit in the segmented indicator (out of 3). */
export const levelToSegments: Record<SkillLevel, number> = {
  Básico: 1,
  Intermedio: 2,
  Avanzado: 3,
};
