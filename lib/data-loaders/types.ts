export interface DataFileMetadata {
  source: string;
  year: number;
  accessed: string;
  tier?: 1 | 2 | 3;
  url?: string;
  month?: string;
  notes?: string;
}
