
import React from 'react';
import { WasteType } from '../types';

interface Props {
  selected: WasteType[];
  onChange: (waste: WasteType[]) => void;
}

const WASTE_OPTIONS: { label: string; type: WasteType; examples: string[] }[] = [
  {
    label: 'Household Waste',
    type: 'Household',
    examples: ['Furniture', 'Appliances', 'Garden waste', 'General items'],
  },
  {
    label: 'Garden Waste',
    type: 'Garden',
    examples: ['Soil', 'Plants', 'Branches', 'Grass cuttings'],
  },
  {
    label: 'Construction Waste',
    type: 'Construction',
    examples: ['Bricks', 'Concrete', 'Timber', 'Plasterboard'],
  },
  {
    label: 'Commercial Waste',
    type: 'Commercial',
    examples: ['Office furniture', 'Equipment', 'Shop fittings'],
  },
];

export const WasteTypeSelector: React.FC<Props> = ({ selected, onChange }) => {
  const toggleWaste = (type: WasteType) => {
    if (selected.includes(type)) {
      onChange(selected.filter(w => w !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {WASTE_OPTIONS.map(option => {
        const isSelected = selected.includes(option.type);
        return (
          <div
            key={option.type}
            className={`p-4 rounded-md border cursor-pointer ${
              isSelected ? 'bg-blue-100 border-blue-500' : 'bg-gray-800 border-gray-700'
            }`}
            onClick={() => toggleWaste(option.type)}
          >
            <h3 className="text-lg font-semibold">{option.label}</h3>
            <ul className="text-sm mt-2 list-disc list-inside text-gray-300">
              {option.examples.map(ex => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
