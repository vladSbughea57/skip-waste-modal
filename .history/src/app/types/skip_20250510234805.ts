
export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  // Other fields from API can be added as needed
}

export interface SkipSelectionModalProps {
  postcode: string;
  area?: string;
  onClose: () => void;
  onSkipSelected: (skip: Skip) => void;
}