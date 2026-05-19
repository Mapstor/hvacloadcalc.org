import { describe, it, expect } from 'vitest';
import {
  getClimateZoneByCounty,
  getClimateZoneByZip,
  getCountiesInZone,
  getAllCounties,
  getClimateZonesMetadata,
} from '@/lib/data-loaders/climate-zones';

describe('iecc climate zones loader', () => {
  it('returns metadata referencing IECC', () => {
    const m = getClimateZonesMetadata();
    expect(m.source).toContain('IECC');
    expect(m.year).toBeGreaterThanOrEqual(2018);
    expect(m.tier).toBe(1);
  });

  it('finds Denver County (08031) in zone 5B', () => {
    expect(getClimateZoneByCounty('08031')).toBe('5B');
  });

  it('finds Miami-Dade County (12086) in zone 1A', () => {
    expect(getClimateZoneByCounty('12086')).toBe('1A');
  });

  it('returns null for an unknown FIPS code', () => {
    expect(getClimateZoneByCounty('99999')).toBeNull();
  });

  it('maps Colorado zip 80202 (Denver) to zone 5B via prefix', () => {
    expect(getClimateZoneByZip('80202')).toBe('5B');
  });

  it('maps Miami zip 33101 to zone 1A via prefix', () => {
    expect(getClimateZoneByZip('33101')).toBe('1A');
  });

  it('returns null for a too-short zip', () => {
    expect(getClimateZoneByZip('1')).toBeNull();
  });

  it('returns null for a zip prefix not in the table', () => {
    expect(getClimateZoneByZip('00000')).toBeNull();
  });

  it('returns counties in zone 5A', () => {
    const fives = getCountiesInZone('5A');
    expect(fives.length).toBeGreaterThan(0);
    expect(fives.every((c) => c.zone === '5A')).toBe(true);
  });

  it('returns at least 20 seed counties', () => {
    expect(getAllCounties().length).toBeGreaterThanOrEqual(20);
  });
});
