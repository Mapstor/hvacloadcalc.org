import { describe, it, expect } from 'vitest';
import {
  getAllRates,
  getRateByState,
  getUsAverageRate,
  getElectricityRatesMetadata,
} from '@/lib/data-loaders/electricity-rates';

describe('electricity rates loader', () => {
  it('returns metadata sourced from EIA', () => {
    const m = getElectricityRatesMetadata();
    expect(m.source).toContain('EIA');
    expect(m.tier).toBe(1);
  });

  it('returns a positive US average rate in cents/kWh', () => {
    const avg = getUsAverageRate();
    expect(avg).toBeGreaterThan(5);
    expect(avg).toBeLessThan(50);
  });

  it('returns 50 states plus DC', () => {
    expect(getAllRates().length).toBe(51);
  });

  it('Hawaii has a high rate', () => {
    const hi = getRateByState('HI');
    expect(hi).not.toBeNull();
    if (!hi) return;
    expect(hi.centsPerKwh).toBeGreaterThan(30);
  });

  it('Washington state has a low rate', () => {
    const wa = getRateByState('WA');
    expect(wa).not.toBeNull();
    if (!wa) return;
    expect(wa.centsPerKwh).toBeLessThan(20);
  });

  it('normalizes lowercase state code to upper', () => {
    expect(getRateByState('ca')).not.toBeNull();
  });

  it('returns null for an unknown state code', () => {
    expect(getRateByState('XX')).toBeNull();
  });
});
