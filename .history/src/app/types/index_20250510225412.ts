// types/index.ts

export interface SkipOption {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  created_at: string;
  updated_at: string;
}

export type WasteType =
  | 'Household'
  | 'Garden'
  | 'Construction'
  | 'Commercial';

export interface HeavyWasteSelection {
  types: string[];
  percentage: 'No heavy waste' | 'Up to 5%' | '5–20%' | 'Over 20%';
}
