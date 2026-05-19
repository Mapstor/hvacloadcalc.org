import { describe, it, expect } from 'vitest';
import {
  getAllStates,
  getStateByAbbr,
  getStateByName,
  getStatesInRegion,
  getStatesMetadata,
} from '@/lib/data-loaders/states';

describe('US states loader', () => {
  it('returns metadata', () => {
    const m = getStatesMetadata();
    expect(m.source).toBeTruthy();
    expect(m.year).toBeGreaterThanOrEqual(2020);
  });

  it('returns 50 states plus DC', () => {
    const all = getAllStates();
    expect(all.length).toBe(51);
  });

  it('finds California by abbreviation', () => {
    const ca = getStateByAbbr('CA');
    expect(ca).not.toBeNull();
    if (!ca) return;
    expect(ca.name).toBe('California');
    expect(ca.region).toBe('West');
  });

  it('finds Texas by full name (case insensitive)', () => {
    expect(getStateByName('texas')?.abbr).toBe('TX');
    expect(getStateByName('TEXAS')?.abbr).toBe('TX');
  });

  it('returns null for unknown abbreviation', () => {
    expect(getStateByAbbr('XX')).toBeNull();
  });

  it('returns all four Census regions populated', () => {
    expect(getStatesInRegion('Northeast').length).toBeGreaterThan(0);
    expect(getStatesInRegion('Midwest').length).toBeGreaterThan(0);
    expect(getStatesInRegion('South').length).toBeGreaterThan(0);
    expect(getStatesInRegion('West').length).toBeGreaterThan(0);
  });

  it('every state has a non-empty predominant climate zone', () => {
    for (const s of getAllStates()) {
      expect(s.predominantClimateZone).toMatch(/^[1-8][A-C]?$/);
      expect(s.climateZonesPresent.length).toBeGreaterThan(0);
    }
  });
});
