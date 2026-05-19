import rawData from '@/data/ashrae-design-temps.json';
import type { DataFileMetadata } from './types';

export interface AshraeDesignTemp {
  city: string;
  state: string;
  climateZone: string;
  heating99PctF: number;
  cooling1PctF: number;
  coolingWetBulb1PctF: number;
  elevationFt: number;
}

interface RawEntry {
  city: string;
  state: string;
  climate_zone: string;
  heating_99_pct_f: number;
  cooling_1_pct_f: number;
  cooling_wet_bulb_1_pct_f: number;
  elevation_ft: number;
}

interface RawFile {
  metadata: DataFileMetadata;
  data: RawEntry[];
}

const file = rawData as RawFile;

function transform(r: RawEntry): AshraeDesignTemp {
  return {
    city: r.city,
    state: r.state,
    climateZone: r.climate_zone,
    heating99PctF: r.heating_99_pct_f,
    cooling1PctF: r.cooling_1_pct_f,
    coolingWetBulb1PctF: r.cooling_wet_bulb_1_pct_f,
    elevationFt: r.elevation_ft,
  };
}

export function getDesignTempByCity(
  city: string,
  state: string,
): AshraeDesignTemp | null {
  const cityLower = city.toLowerCase();
  const stateUpper = state.toUpperCase();
  const match = file.data.find(
    (d) => d.city.toLowerCase() === cityLower && d.state === stateUpper,
  );
  return match ? transform(match) : null;
}

export function getDesignTempsByState(state: string): AshraeDesignTemp[] {
  const stateUpper = state.toUpperCase();
  return file.data.filter((d) => d.state === stateUpper).map(transform);
}

export function getAllDesignTemps(): AshraeDesignTemp[] {
  return file.data.map(transform);
}

export function getAshraeMetadata(): DataFileMetadata {
  return file.metadata;
}
