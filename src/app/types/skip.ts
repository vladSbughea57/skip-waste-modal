export interface Skip {
    id: number;
    size: number;
    hire_period_days: number;
    price_before_vat: number;
    vat: number;
    per_tonne_cost: number;
    transport_cost: number;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
  }