import { describe, expect, it } from 'vitest';
import {
  calculateAtticRValue,
  depthForTargetR,
  R_PER_INCH,
} from '@/lib/calculators/attic-r-value';

describe('calculateAtticRValue', () => {
  it('multiplies depth × R-per-inch for a single layer', () => {
    const result = calculateAtticRValue({
      layers: [{ type: 'loose-fill-cellulose', depthInches: 12 }],
      climateZone: '4',
    });
    expect(result.totalRValue).toBe(12 * 3.6);
    expect(result.perLayerRValues).toHaveLength(1);
    expect(result.perLayerRValues[0].rValue).toBe(43.2);
  });

  it('sums R-value across multiple layers', () => {
    const result = calculateAtticRValue({
      layers: [
        { type: 'fiberglass-batt', depthInches: 6 },
        { type: 'loose-fill-cellulose', depthInches: 8 },
      ],
      climateZone: '5',
    });
    expect(result.totalRValue).toBe(6 * 3.0 + 8 * 3.6);
    expect(result.perLayerRValues).toHaveLength(2);
  });

  it('drops zero-depth layers', () => {
    const result = calculateAtticRValue({
      layers: [
        { type: 'fiberglass-batt', depthInches: 6 },
        { type: 'loose-fill-cellulose', depthInches: 0 },
      ],
      climateZone: '4',
    });
    expect(result.perLayerRValues).toHaveLength(1);
  });

  it('flags below-DOE-low for sparse insulation in cold climate', () => {
    const result = calculateAtticRValue({
      layers: [{ type: 'fiberglass-batt', depthInches: 6 }],
      climateZone: '5',
    });
    expect(result.totalRValue).toBe(18);
    expect(result.status).toBe('below-doe-low');
    expect(result.upgradeRecommendation).not.toBeNull();
  });

  it('flags in-DOE-range for code-level insulation', () => {
    const result = calculateAtticRValue({
      layers: [{ type: 'loose-fill-cellulose', depthInches: 14 }],
      climateZone: '4',
    });
    expect(result.totalRValue).toBeCloseTo(50.4, 1);
    expect(result.status).toBe('in-doe-range');
    expect(result.upgradeRecommendation).toBeNull();
  });

  it('flags at-or-above-DOE-high for high-performance insulation', () => {
    const result = calculateAtticRValue({
      layers: [{ type: 'loose-fill-cellulose', depthInches: 18 }],
      climateZone: '5',
    });
    expect(result.totalRValue).toBeCloseTo(64.8, 1);
    expect(result.status).toBe('at-or-above-doe-high');
    expect(result.upgradeRecommendation).toBeNull();
  });

  it('returns DOE recommended range by zone', () => {
    expect(calculateAtticRValue({ layers: [], climateZone: '1' }).doeRecommendedRange).toEqual({ low: 30, high: 49 });
    expect(calculateAtticRValue({ layers: [], climateZone: '4' }).doeRecommendedRange).toEqual({ low: 38, high: 60 });
    expect(calculateAtticRValue({ layers: [], climateZone: '7' }).doeRecommendedRange).toEqual({ low: 49, high: 60 });
  });

  it('computes upgrade depths in three reference materials', () => {
    const result = calculateAtticRValue({
      layers: [{ type: 'fiberglass-batt', depthInches: 6 }],
      climateZone: '5',
    });
    expect(result.upgradeRecommendation).not.toBeNull();
    const u = result.upgradeRecommendation!;
    expect(u.targetR).toBe(49);
    expect(u.additionalRNeeded).toBeCloseTo(31, 0);
    expect(u.depthsByMaterial).toHaveLength(3);
    // To add R-31 with cellulose at R-3.6/in: 31/3.6 ≈ 8.6 inches
    const cellulose = u.depthsByMaterial.find((d) => d.type === 'loose-fill-cellulose')!;
    expect(cellulose.depthInches).toBeCloseTo(8.6, 1);
  });

  it('reports IECC code minimum by zone (2021)', () => {
    expect(calculateAtticRValue({ layers: [], climateZone: '1' }).ieccCodeMinimum).toBe(30);
    expect(calculateAtticRValue({ layers: [], climateZone: '4' }).ieccCodeMinimum).toBe(49);
    expect(calculateAtticRValue({ layers: [], climateZone: '6' }).ieccCodeMinimum).toBe(60);
  });

  it('distinguishes meets-iecc-only from below-doe-low', () => {
    // In zone 4, IECC requires R-49 and DOE recommends R-38 to R-60.
    // R-40 is above DOE-low so it's in-range, not meets-iecc-only.
    // R-32 is below DOE-low AND below IECC, so below-doe-low.
    const r32 = calculateAtticRValue({
      layers: [{ type: 'fiberglass-batt', depthInches: 10.67 }],
      climateZone: '4',
    });
    expect(r32.totalRValue).toBeCloseTo(32, 0);
    expect(r32.status).toBe('below-doe-low');
  });

  it('produces deterministic results for identical inputs', () => {
    const inputs = {
      layers: [{ type: 'loose-fill-cellulose' as const, depthInches: 12 }],
      climateZone: '4' as const,
    };
    expect(calculateAtticRValue(inputs)).toEqual(calculateAtticRValue(inputs));
  });
});

describe('R_PER_INCH', () => {
  it('uses documented values from article 08', () => {
    expect(R_PER_INCH['fiberglass-batt']).toBe(3.0);
    expect(R_PER_INCH['loose-fill-fiberglass']).toBe(2.3);
    expect(R_PER_INCH['loose-fill-cellulose']).toBe(3.6);
    expect(R_PER_INCH['closed-cell-spray-foam']).toBe(6.5);
  });
});

describe('depthForTargetR', () => {
  it('returns depth in inches to reach a target R with one material', () => {
    expect(depthForTargetR(49, 'loose-fill-cellulose')).toBeCloseTo(13.6, 1);
    expect(depthForTargetR(49, 'closed-cell-spray-foam')).toBeCloseTo(7.5, 1);
    expect(depthForTargetR(38, 'fiberglass-batt')).toBeCloseTo(12.7, 1);
  });
});
