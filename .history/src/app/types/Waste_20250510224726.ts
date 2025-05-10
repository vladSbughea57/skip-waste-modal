export interface WasteType {
    key: string;
    label: string;
    examples: string[];
  }
  
  export interface HeavyWaste {
    types: string[];
    percentages: string[];
  }
  
  export interface WasteData {
    types: WasteType[];
    heavyWaste: HeavyWaste;
  }