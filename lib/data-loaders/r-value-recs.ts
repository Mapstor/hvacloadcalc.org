import rawData from '@/data/r-value-recommendations.json';
import type { DataFileMetadata } from './types';

export interface RValueRecommendation {
  climateZone: string;
  label: string;
  atticUninsulatedMin: string;
  atticUninsulatedMax: string;
  atticExistingMin: string;
  atticExistingMax: string;
  wallMin: string;
  wallMax: string;
  floorMin: string;
  floorMax: string;
  basementWallMin: string;
  basementWallMax: string;
}

interface RawEntry {
  climate_zone: string;
  label: string;
  attic_uninsulated_min: string;
  attic_uninsulated_max: string;
  attic_existing_min: string;
  attic_existing_max: string;
  wall_min: string;
  wall_max: string;
  floor_min: string;
  floor_max: string;
  basement_wall_min: string;
  basement_wall_max: string;
}

interface RawFile {
  metadata: DataFileMetadata;
  data: RawEntry[];
}

const file = rawData as RawFile;

function transform(r: RawEntry): RValueRecommendation {
  return {
    climateZone: r.climate_zone,
    label: r.label,
    atticUninsulatedMin: r.attic_uninsulated_min,
    atticUninsulatedMax: r.attic_uninsulated_max,
    atticExistingMin: r.attic_existing_min,
    atticExistingMax: r.attic_existing_max,
    wallMin: r.wall_min,
    wallMax: r.wall_max,
    floorMin: r.floor_min,
    floorMax: r.floor_max,
    basementWallMin: r.basement_wall_min,
    basementWallMax: r.basement_wall_max,
  };
}

export function getRecommendationByZone(
  zone: string,
): RValueRecommendation | null {
  const z = zone.toUpperCase();
  const match = file.data.find((r) => r.climate_zone.toUpperCase() === z);
  return match ? transform(match) : null;
}

export function getAllRecommendations(): RValueRecommendation[] {
  return file.data.map(transform);
}

export function getRValueRecsMetadata(): DataFileMetadata {
  return file.metadata;
}
