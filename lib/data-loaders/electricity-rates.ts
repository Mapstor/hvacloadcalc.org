import rawData from '@/data/electricity-rates.json';
import type { DataFileMetadata } from './types';

export interface ElectricityRate {
  state: string;
  centsPerKwh: number;
}

interface RawEntry {
  state: string;
  cents_per_kwh: number;
}

interface RawFile {
  metadata: DataFileMetadata;
  data: {
    us_average_cents_per_kwh: number;
    by_state: RawEntry[];
  };
}

const file = rawData as RawFile;

function transform(r: RawEntry): ElectricityRate {
  return {
    state: r.state,
    centsPerKwh: r.cents_per_kwh,
  };
}

export function getRateByState(state: string): ElectricityRate | null {
  const s = state.toUpperCase();
  const match = file.data.by_state.find((r) => r.state === s);
  return match ? transform(match) : null;
}

export function getUsAverageRate(): number {
  return file.data.us_average_cents_per_kwh;
}

export function getAllRates(): ElectricityRate[] {
  return file.data.by_state.map(transform);
}

export function getElectricityRatesMetadata(): DataFileMetadata {
  return file.metadata;
}
