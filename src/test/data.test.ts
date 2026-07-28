import { describe, it, expect } from 'vitest';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { attributes, profile } from '../data/profile';
import { navItems } from '../data/navigation';

const LEVELS = ['Básico', 'Intermedio', 'Avanzado'];

describe('projects data', () => {
  it('has exactly one featured project', () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1);
  });

  it('the featured project is the IoT platform', () => {
    expect(projects.find((p) => p.featured)?.id).toBe('iot-monitoring');
  });

  it('every project has required fields and at least one stack item', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.image).toMatch(/^\/img\//);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.highlights.length).toBeGreaterThan(0);
    }
  });
});

describe('skills data', () => {
  it('uses named levels instead of numeric percentages', () => {
    for (const s of skills) {
      expect(LEVELS).toContain(s.level);
    }
  });
});

describe('profile data', () => {
  it('exposes attributes with named levels', () => {
    for (const a of attributes) {
      expect(LEVELS).toContain(a.level);
    }
  });

  it('has a valid email', () => {
    expect(profile.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
  });
});

describe('navigation data', () => {
  it('uses unique ids', () => {
    const ids = navItems.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
