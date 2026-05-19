import rawData from '@/data/iecc-climate-zones.json';
import type { DataFileMetadata } from './types';

export interface ClimateZoneCounty {
  fips: string;
  name: string;
  state: string;
  zone: string;
}

interface RawFile {
  metadata: DataFileMetadata;
  data: {
    counties: ClimateZoneCounty[];
    zip_prefixes: Record<string, string>;
  };
}

const file = rawData as RawFile;

export function getClimateZoneByCounty(fips: string): string | null {
  const match = file.data.counties.find((c) => c.fips === fips);
  return match ? match.zone : null;
}

export function getClimateZoneByZip(zip: string): string | null {
  const trimmed = zip.trim();
  if (trimmed.length < 2) {
    return null;
  }
  const prefix = trimmed.slice(0, 2);
  return file.data.zip_prefixes[prefix] ?? null;
}

export function getCountiesInZone(zone: string): ClimateZoneCounty[] {
  const z = zone.toUpperCase();
  return file.data.counties.filter((c) => c.zone === z);
}

export function getAllCounties(): ClimateZoneCounty[] {
  return [...file.data.counties];
}

export function getClimateZonesMetadata(): DataFileMetadata {
  return file.metadata;
}
