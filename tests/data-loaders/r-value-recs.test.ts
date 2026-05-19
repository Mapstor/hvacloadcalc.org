import { describe, it, expect } from 'vitest';
import {
  getAllRecommendations,
  getRecommendationByZone,
  getRValueRecsMetadata,
} from '@/lib/data-loaders/r-value-recs';

describe('R-value recommendations loader', () => {
  it('returns metadata sourced from DOE', () => {
    const m = getRValueRecsMetadata();
    expect(m.source).toContain('DOE');
    expect(m.tier).toBe(1);
  });

  it('returns recommendations for all 8 IECC zones', () => {
    const all = getAllRecommendations();
    expect(all.length).toBe(8);
    const zones = all.map((r) => r.climateZone).sort();
    expect(zones).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
  });

  it('zone 6 has at least R20 walls', () => {
    const z6 = getRecommendationByZone('6');
    expect(z6).not.toBeNull();
    if (!z6) return;
    expect(z6.wallMin).toMatch(/^R20/);
  });

  it('zone 1 has lower attic minimum than zone 7', () => {
    const z1 = getRecommendationByZone('1');
    const z7 = getRecommendationByZone('7');
    expect(z1?.atticUninsulatedMin).toBe('R30');
    expect(z7?.atticUninsulatedMin).toBe('R60');
  });

  it('returns null for unknown zone', () => {
    expect(getRecommendationByZone('9')).toBeNull();
  });

  it('every recommendation uses R-value notation strings', () => {
    for (const r of getAllRecommendations()) {
      expect(r.atticUninsulatedMin).toMatch(/^R/);
      expect(r.wallMin).toMatch(/^R/);
      expect(r.floorMin).toMatch(/^R/);
    }
  });
});
