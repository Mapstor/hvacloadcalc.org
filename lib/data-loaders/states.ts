import rawData from '@/data/states-us.json';
import type { DataFileMetadata } from './types';

export interface UsState {
  name: string;
  abbr: string;
  region: string;
  subregion: string;
  predominantClimateZone: string;
  climateZonesPresent: string[];
}

interface RawEntry {
  name: string;
  abbr: string;
  region: string;
  subregion: string;
  predominant_climate_zone: string;
  climate_zones_present: string[];
}

interface RawFile {
  metadata: DataFileMetadata;
  data: RawEntry[];
}

const file = rawData as RawFile;

function transform(r: RawEntry): UsState {
  return {
    name: r.name,
    abbr: r.abbr,
    region: r.region,
    subregion: r.subregion,
    predominantClimateZone: r.predominant_climate_zone,
    climateZonesPresent: r.climate_zones_present,
  };
}

export function getStateByAbbr(abbr: string): UsState | null {
  const a = abbr.toUpperCase();
  const match = file.data.find((s) => s.abbr === a);
  return match ? transform(match) : null;
}

export function getStateByName(name: string): UsState | null {
  const n = name.toLowerCase();
  const match = file.data.find((s) => s.name.toLowerCase() === n);
  return match ? transform(match) : null;
}

export function getStatesInRegion(region: string): UsState[] {
  return file.data.filter((s) => s.region === region).map(transform);
}

export function getAllStates(): UsState[] {
  return file.data.map(transform);
}

export function getStatesMetadata(): DataFileMetadata {
  return file.metadata;
}
