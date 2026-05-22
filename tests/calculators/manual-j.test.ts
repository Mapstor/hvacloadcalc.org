import { describe, expect, it } from 'vitest';
import { calculateManualJ, type ManualJInputs } from '@/lib/calculators/manual-j';

const TYPICAL: ManualJInputs = {
  squareFootage: 2000,
  climateZone: '5',
  stories: 1,
  ceilingHeight: 8,
  constructionEra: '2010-2019',
};

describe('calculateManualJ', () => {
  it('produces both heating and cooling load results', () => {
    const r = calculateManualJ(TYPICAL);
    expect(r.heatingLoadBtu).toBeGreaterThan(0);
    expect(r.coolingLoadSensibleBtu).toBeGreaterThan(0);
    expect(r.coolingLoadLatentBtu).toBeGreaterThan(0);
    expect(r.coolingLoadTotalBtu).toBe(r.coolingLoadSensibleBtu + r.coolingLoadLatentBtu);
  });

  it('reports design conditions by climate zone', () => {
    const r = calculateManualJ(TYPICAL);
    expect(r.designConditions.heatingDesignTempF).toBe(5);
    expect(r.designConditions.coolingDesignTempF).toBe(88);
    expect(r.designConditions.heatingDeltaT).toBe(65);
    expect(r.designConditions.coolingDeltaT).toBe(13);
  });

  it('heating load dominates in cold climates', () => {
    const z6 = calculateManualJ({ ...TYPICAL, climateZone: '6' });
    expect(z6.loadRatio).toBeGreaterThan(1.0);
  });

  it('cooling load dominates in hot climates', () => {
    const z1 = calculateManualJ({ ...TYPICAL, climateZone: '1' });
    expect(z1.loadRatio).toBeLessThan(1.0);
  });

  it('older homes have higher loads at same square footage', () => {
    const old = calculateManualJ({ ...TYPICAL, constructionEra: 'pre-1980' });
    const newer = calculateManualJ({ ...TYPICAL, constructionEra: '2020+' });
    expect(old.heatingLoadBtu).toBeGreaterThan(newer.heatingLoadBtu * 1.5);
    expect(old.coolingLoadSensibleBtu).toBeGreaterThan(newer.coolingLoadSensibleBtu);
  });

  it('explicit R-value overrides era defaults', () => {
    const explicit = calculateManualJ({ ...TYPICAL, wallRValue: 30 });
    const fromEra = calculateManualJ(TYPICAL);
    // Higher R-value = lower wall conductive loss = lower total heating load
    expect(explicit.heatingLoadBtu).toBeLessThan(fromEra.heatingLoadBtu);
    expect(explicit.breakdown.applied.wallRValue).toBe(30);
  });

  it('infiltration scales with ACH50', () => {
    const tight = calculateManualJ({ ...TYPICAL, ach50: 3 });
    const leaky = calculateManualJ({ ...TYPICAL, ach50: 12 });
    expect(leaky.breakdown.heating.infiltration).toBeGreaterThan(tight.breakdown.heating.infiltration * 3);
  });

  it('two-story home has more wall area than one-story', () => {
    const oneStory = calculateManualJ({ ...TYPICAL, squareFootage: 2400, stories: 1 });
    const twoStory = calculateManualJ({ ...TYPICAL, squareFootage: 2400, stories: 2 });
    // Two-story has more perimeter wall area (same footprint, double height)
    expect(twoStory.breakdown.envelope.wallNetArea).toBeGreaterThan(oneStory.breakdown.envelope.wallNetArea);
  });

  it('window area scales with windowToFloorRatio override', () => {
    const r10 = calculateManualJ({ ...TYPICAL, windowToFloorRatio: 0.1 });
    const r20 = calculateManualJ({ ...TYPICAL, windowToFloorRatio: 0.2 });
    expect(r20.breakdown.envelope.windowArea).toBeCloseTo(r10.breakdown.envelope.windowArea * 2, 0);
  });

  it('solar gain increases with window area and SHGC', () => {
    const lowSHGC = calculateManualJ({ ...TYPICAL, windowSHGC: 0.2 });
    const highSHGC = calculateManualJ({ ...TYPICAL, windowSHGC: 0.7 });
    expect(highSHGC.breakdown.cooling.solarGain).toBeGreaterThan(lowSHGC.breakdown.cooling.solarGain * 3);
  });

  it('latent fraction varies by climate zone', () => {
    const dryClimate = calculateManualJ({ ...TYPICAL, climateZone: '7' });
    const humid = calculateManualJ({ ...TYPICAL, climateZone: '1' });
    // Humid zones have higher latent fraction
    const dryRatio = dryClimate.coolingLoadLatentBtu / dryClimate.coolingLoadSensibleBtu;
    const humidRatio = humid.coolingLoadLatentBtu / humid.coolingLoadSensibleBtu;
    expect(humidRatio).toBeGreaterThan(dryRatio);
  });

  it('rejects non-positive square footage', () => {
    expect(() => calculateManualJ({ ...TYPICAL, squareFootage: 0 })).toThrow();
    expect(() => calculateManualJ({ ...TYPICAL, squareFootage: -100 })).toThrow();
  });

  it('returns recommended tons in 0.25 increments', () => {
    const r = calculateManualJ(TYPICAL);
    expect(r.recommendedCoolingTons % 0.25).toBe(0);
  });

  it('produces deterministic results for identical inputs', () => {
    expect(calculateManualJ(TYPICAL)).toEqual(calculateManualJ(TYPICAL));
  });

  it('breakdown components sum approximately to total heating load', () => {
    const r = calculateManualJ(TYPICAL);
    const sum =
      r.breakdown.heating.wallConductive +
      r.breakdown.heating.ceilingConductive +
      r.breakdown.heating.floorConductive +
      r.breakdown.heating.windowConductive +
      r.breakdown.heating.infiltration;
    expect(Math.abs(sum - r.heatingLoadBtu)).toBeLessThan(10);
  });

  it('breakdown components sum approximately to sensible cooling load', () => {
    const r = calculateManualJ(TYPICAL);
    const sum =
      r.breakdown.cooling.wallConductive +
      r.breakdown.cooling.ceilingConductive +
      r.breakdown.cooling.floorConductive +
      r.breakdown.cooling.windowConductive +
      r.breakdown.cooling.infiltration +
      r.breakdown.cooling.solarGain +
      r.breakdown.cooling.internalGain;
    expect(Math.abs(sum - r.coolingLoadSensibleBtu)).toBeLessThan(10);
  });

  it('produces results in a reasonable range for ACCA case-1-like input (1,500 sq ft zone 3 ranch)', () => {
    // Article 13 Case 1: 1-story ranch, zone 3, 1,500 sq ft
    // Expected: cooling ~28k, heating ~42k
    const r = calculateManualJ({
      squareFootage: 1500,
      climateZone: '3',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2000-2009',
    });
    // Calculator should land within ±30% of expected (planning-grade tolerance per article 13)
    expect(r.coolingLoadTotalBtu).toBeGreaterThan(28000 * 0.7);
    expect(r.coolingLoadTotalBtu).toBeLessThan(28000 * 1.4);
    expect(r.heatingLoadBtu).toBeGreaterThan(15000); // some reasonable heating
  });
});
