import { describe, expect, it } from 'vitest';
import {
  calculateHeatPumpSize,
  hpHeatingCapacityAtTemp,
  type HeatPumpInputs,
} from '@/lib/calculators/heat-pump-size';

const ZONE_5_BASELINE: HeatPumpInputs = {
  squareFootage: 1500,
  climateZone: '5',
  ceilingHeight: '8',
  insulationLevel: 'average',
  sunExposure: 'mixed',
  occupants: 4,
  isKitchen: false,
  spaceType: 'living-room',
  coldClimateEquipment: false,
};

describe('calculateHeatPumpSize', () => {
  it('produces both heating and cooling loads', () => {
    const result = calculateHeatPumpSize(ZONE_5_BASELINE);
    expect(result.coolingLoadBtu).toBeGreaterThan(0);
    expect(result.heatingLoadBtu).toBeGreaterThan(0);
  });

  it('heating load exceeds cooling load in zone 5+', () => {
    const result = calculateHeatPumpSize(ZONE_5_BASELINE);
    expect(result.heatingLoadBtu).toBeGreaterThan(result.coolingLoadBtu);
    expect(result.drivingLoad).toBe('heating');
  });

  it('cooling load exceeds heating in zone 1-2', () => {
    const result = calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '1' });
    expect(result.coolingLoadBtu).toBeGreaterThan(result.heatingLoadBtu);
    expect(result.drivingLoad).toBe('cooling');
  });

  it('classifies zone 4 as balanced', () => {
    const result = calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '4' });
    expect(result.drivingLoad).toBe('balanced');
  });

  it('uses simplified ASHRAE heating design temp by zone', () => {
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '4' }).heatingDesignTempF).toBe(15);
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '5' }).heatingDesignTempF).toBe(5);
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '6' }).heatingDesignTempF).toBe(-2);
  });

  it('uses simplified ASHRAE cooling design temp by zone', () => {
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '2' }).coolingDesignTempF).toBe(95);
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '5' }).coolingDesignTempF).toBe(88);
  });

  it('computes a reasonable balance point for standard heat pump in zone 5', () => {
    const result = calculateHeatPumpSize(ZONE_5_BASELINE);
    expect(result.balancePointF).toBeGreaterThan(10);
    expect(result.balancePointF).toBeLessThan(40);
  });

  it('cold-climate equipment lowers the balance point', () => {
    const standard = calculateHeatPumpSize(ZONE_5_BASELINE);
    const cchp = calculateHeatPumpSize({ ...ZONE_5_BASELINE, coldClimateEquipment: true });
    expect(cchp.balancePointF).toBeLessThan(standard.balancePointF);
  });

  it('cold-climate equipment reduces aux heat at design temp', () => {
    const standard = calculateHeatPumpSize(ZONE_5_BASELINE);
    const cchp = calculateHeatPumpSize({ ...ZONE_5_BASELINE, coldClimateEquipment: true });
    expect(cchp.auxHeatAtDesignBtu).toBeLessThan(standard.auxHeatAtDesignBtu);
  });

  it('recommends cold-climate equipment for zones 7-8', () => {
    const z7 = calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '7' });
    const z8 = calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '8' });
    expect(z7.equipmentRecommendation).toBe('cold-climate-required');
    expect(z8.equipmentRecommendation).toBe('cold-climate-required');
  });

  it('treats zones 1-3 as cooling-dominant standard-equipment cases', () => {
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '1' }).equipmentRecommendation).toBe('standard');
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '2' }).equipmentRecommendation).toBe('standard');
    expect(calculateHeatPumpSize({ ...ZONE_5_BASELINE, climateZone: '3' }).equipmentRecommendation).toBe('standard');
  });

  it('recommended size is the larger of cooling and heating loads, rounded up', () => {
    const result = calculateHeatPumpSize(ZONE_5_BASELINE);
    const larger = Math.max(result.coolingLoadBtu, result.heatingLoadBtu);
    expect(result.recommendedSizeBtu).toBeGreaterThanOrEqual(larger * 0.95);
  });

  it('returns a known tonnage for a 1,500 sq ft home in zone 5 (article 07 worked example)', () => {
    const result = calculateHeatPumpSize({ ...ZONE_5_BASELINE, coldClimateEquipment: true });
    // 1500 sqft × 22 × 0.9 (zone 5) × 1.1 (living-room) + 1200 occupancy ≈ 33,870 cooling raw
    // × 1.3 heating factor = ~44,000 heating
    // Rounds to 48,000 BTU = 4 ton
    expect(result.recommendedTons).toBeGreaterThanOrEqual(3);
    expect(result.recommendedTons).toBeLessThanOrEqual(5);
  });

  it('produces deterministic results for identical inputs', () => {
    const a = calculateHeatPumpSize(ZONE_5_BASELINE);
    const b = calculateHeatPumpSize(ZONE_5_BASELINE);
    expect(a).toEqual(b);
  });
});

describe('hpHeatingCapacityAtTemp', () => {
  it('returns rated heating capacity (≈1.06× cooling) at 47°F', () => {
    const cap = hpHeatingCapacityAtTemp(47, 36000, false);
    expect(cap).toBeCloseTo(38160, -1);
  });

  it('standard HP drops to ~60% at 17°F', () => {
    const cap = hpHeatingCapacityAtTemp(17, 36000, false);
    const ratedHeating = 36000 * 1.06;
    expect(cap / ratedHeating).toBeGreaterThan(0.55);
    expect(cap / ratedHeating).toBeLessThan(0.65);
  });

  it('standard HP drops to ~33% at 5°F', () => {
    const cap = hpHeatingCapacityAtTemp(5, 36000, false);
    const ratedHeating = 36000 * 1.06;
    expect(cap / ratedHeating).toBeGreaterThan(0.28);
    expect(cap / ratedHeating).toBeLessThan(0.38);
  });

  it('CCASHP maintains ~85% at 17°F', () => {
    const cap = hpHeatingCapacityAtTemp(17, 36000, true);
    const ratedHeating = 36000 * 1.06;
    expect(cap / ratedHeating).toBeGreaterThan(0.80);
    expect(cap / ratedHeating).toBeLessThan(0.90);
  });

  it('CCASHP maintains ~70% at 5°F', () => {
    const cap = hpHeatingCapacityAtTemp(5, 36000, true);
    const ratedHeating = 36000 * 1.06;
    expect(cap / ratedHeating).toBeGreaterThan(0.65);
    expect(cap / ratedHeating).toBeLessThan(0.75);
  });

  it('CCASHP outperforms standard at every temperature below 47°F', () => {
    for (let t = -10; t < 47; t += 5) {
      const standard = hpHeatingCapacityAtTemp(t, 36000, false);
      const cchp = hpHeatingCapacityAtTemp(t, 36000, true);
      expect(cchp).toBeGreaterThan(standard);
    }
  });
});
