import { describe, it, expect } from 'vitest';
import {
  getAshraeMetadata,
  getDesignTempByCity,
  getDesignTempsByState,
  getAllDesignTemps,
} from '@/lib/data-loaders/ashrae';

describe('ashrae design temps loader', () => {
  it('returns metadata with the required fields', () => {
    const m = getAshraeMetadata();
    expect(m.source).toContain('ASHRAE');
    expect(m.year).toBeGreaterThanOrEqual(2017);
    expect(m.accessed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(m.tier).toBe(1);
  });

  it('returns Denver, CO with cold-climate values', () => {
    const t = getDesignTempByCity('Denver', 'CO');
    expect(t).not.toBeNull();
    if (!t) return;
    expect(t.climateZone).toBe('5B');
    expect(t.heating99PctF).toBeLessThan(20);
    expect(t.cooling1PctF).toBeGreaterThan(85);
    expect(t.elevationFt).toBeGreaterThan(5000);
  });

  it('returns Miami, FL with hot-humid values', () => {
    const t = getDesignTempByCity('Miami', 'FL');
    expect(t).not.toBeNull();
    if (!t) return;
    expect(t.climateZone).toBe('1A');
    expect(t.heating99PctF).toBeGreaterThan(35);
    expect(t.coolingWetBulb1PctF).toBeGreaterThan(75);
  });

  it('is case insensitive on city, normalizes state to upper', () => {
    expect(getDesignTempByCity('denver', 'co')).not.toBeNull();
    expect(getDesignTempByCity('DENVER', 'CO')).not.toBeNull();
  });

  it('returns null for an unknown city', () => {
    expect(getDesignTempByCity('Nowheresville', 'XX')).toBeNull();
  });

  it('returns entries by state', () => {
    const ca = getDesignTempsByState('CA');
    expect(ca.length).toBeGreaterThan(0);
    expect(ca.every((t) => t.state === 'CA')).toBe(true);
  });

  it('returns at least 25 seed entries', () => {
    expect(getAllDesignTemps().length).toBeGreaterThanOrEqual(25);
  });

  it('every entry has a valid climate zone format', () => {
    const all = getAllDesignTemps();
    for (const t of all) {
      expect(t.climateZone).toMatch(/^[1-8][A-C]?$/);
    }
  });
});
