import { describe, expect, it } from 'vitest';
import { calculateBtu, type BtuInputs } from '@/lib/calculators/btu';

const BASELINE_300_SF_ZONE_4: BtuInputs = {
  squareFootage: 300,
  climateZone: '4',
  ceilingHeight: '8',
  insulationLevel: 'average',
  sunExposure: 'mixed',
  occupants: 2,
  isKitchen: false,
};

describe('calculateBtu', () => {
  it('produces baseline ~22 BTU/sq ft at moderate climate, 8-ft ceiling, no adjustments', () => {
    const result = calculateBtu(BASELINE_300_SF_ZONE_4);
    expect(result.baselineBtu).toBe(6600);
    expect(result.rawCalculatedBtu).toBe(6600);
    expect(result.recommendedBtu).toBe(7000);
    expect(result.suggestedEquipmentClass).toBe('window');
  });

  it('applies climate factor for zone 1 (+30%)', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, climateZone: '1' });
    expect(result.rawCalculatedBtu).toBe(8580);
    expect(result.recommendedBtu).toBe(9000);
  });

  it('applies climate factor for zone 7 (-20%)', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, climateZone: '7' });
    expect(result.rawCalculatedBtu).toBe(5280);
    expect(result.recommendedBtu).toBe(5000);
  });

  it('applies ceiling height for 10-ft ceilings (+20%)', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, ceilingHeight: '10' });
    expect(result.rawCalculatedBtu).toBe(7920);
    expect(result.recommendedBtu).toBe(8000);
  });

  it('applies cathedral ceiling factor (12+ ft, +30%)', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, ceilingHeight: '12' });
    expect(result.rawCalculatedBtu).toBe(8580);
  });

  it('adds 600 BTU per occupant above 2', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, occupants: 5 });
    expect(result.rawCalculatedBtu).toBe(6600 + 3 * 600);
  });

  it('does not subtract for fewer than 2 occupants', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, occupants: 1 });
    expect(result.rawCalculatedBtu).toBe(6600);
  });

  it('adds 4,000 BTU for kitchen', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, isKitchen: true });
    expect(result.rawCalculatedBtu).toBe(6600 + 4000);
  });

  it('applies space-type multiplier for sun room (1.75×)', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, spaceType: 'sun-room' });
    expect(result.rawCalculatedBtu).toBe(Math.round(6600 * 1.75));
  });

  it('applies space-type multiplier for below-grade basement (0.6×)', () => {
    const result = calculateBtu({ ...BASELINE_300_SF_ZONE_4, spaceType: 'basement-below-grade' });
    expect(result.rawCalculatedBtu).toBe(Math.round(6600 * 0.6));
  });

  it('combines factors multiplicatively (article 15 example B)', () => {
    // 1,500 sq ft home in zone 2 with 10-ft ceilings, family of 4
    const result = calculateBtu({
      squareFootage: 1500,
      climateZone: '2',
      ceilingHeight: '10',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
    });
    // 1500 * 22 = 33,000 baseline
    // × 1.18 climate × 1.2 ceiling × 1.0 sun × 1.0 insulation × 1.0 space
    // = 33,000 × 1.416 = 46,728
    // + 2 extra occupants × 600 = 1,200
    // = 47,928 → rounds to 48,000
    expect(result.rawCalculatedBtu).toBeGreaterThan(46000);
    expect(result.rawCalculatedBtu).toBeLessThan(49000);
    expect(result.recommendedBtu).toBe(48000);
    expect(result.recommendedTons).toBe(4);
    expect(result.suggestedEquipmentClass).toBe('central');
  });

  it('matches the article 15 example A (300 sq ft master bedroom, zone 4, 9 ft ceiling)', () => {
    const result = calculateBtu({
      squareFootage: 300,
      climateZone: '4',
      ceilingHeight: '9',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: false,
    });
    // 6,600 × 1.0 climate × 1.1 ceiling = 7,260
    expect(result.rawCalculatedBtu).toBe(7260);
    expect(result.recommendedBtu).toBeGreaterThanOrEqual(7000);
    expect(result.recommendedBtu).toBeLessThanOrEqual(8000);
  });

  it('matches the chart value for 2,000 sq ft home in zone 4 (article 15 baseline)', () => {
    const result = calculateBtu({
      squareFootage: 2000,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: false,
    });
    // 2,000 × 22 = 44,000
    // Article 15 chart row: 1,800-2,200 sq ft → 36,000 BTU (3 ton)
    // 44,000 raw matches the upper end of that range; rounds to 42,000 (3.5 ton)
    expect(result.rawCalculatedBtu).toBe(44000);
    expect(result.recommendedBtu).toBeGreaterThanOrEqual(36000);
    expect(result.recommendedBtu).toBeLessThanOrEqual(48000);
    expect(result.suggestedEquipmentClass).toBe('central');
  });

  it('rejects non-positive square footage', () => {
    expect(() => calculateBtu({ ...BASELINE_300_SF_ZONE_4, squareFootage: 0 })).toThrow();
    expect(() => calculateBtu({ ...BASELINE_300_SF_ZONE_4, squareFootage: -50 })).toThrow();
  });

  it('rejects negative occupants', () => {
    expect(() => calculateBtu({ ...BASELINE_300_SF_ZONE_4, occupants: -1 })).toThrow();
  });

  it('returns an acceptable BTU range that brackets the raw calculation', () => {
    const result = calculateBtu(BASELINE_300_SF_ZONE_4);
    expect(result.acceptableRange.low).toBeLessThanOrEqual(result.rawCalculatedBtu);
    expect(result.acceptableRange.high).toBeGreaterThanOrEqual(result.rawCalculatedBtu);
    expect(result.acceptableRange.high).toBeGreaterThan(result.acceptableRange.low);
  });

  it('classifies equipment class by capacity', () => {
    expect(calculateBtu({ ...BASELINE_300_SF_ZONE_4, squareFootage: 200 }).suggestedEquipmentClass).toBe('window');
    expect(calculateBtu({ ...BASELINE_300_SF_ZONE_4, squareFootage: 600 }).suggestedEquipmentClass).toBe('window-or-portable');
    expect(calculateBtu({ ...BASELINE_300_SF_ZONE_4, squareFootage: 800 }).suggestedEquipmentClass).toBe('mini-split-or-window');
    expect(calculateBtu({ ...BASELINE_300_SF_ZONE_4, squareFootage: 2000 }).suggestedEquipmentClass).toBe('central');
  });

  it('produces deterministic results for identical inputs', () => {
    const a = calculateBtu(BASELINE_300_SF_ZONE_4);
    const b = calculateBtu(BASELINE_300_SF_ZONE_4);
    expect(a).toEqual(b);
  });
});
