// components/HeavyWasteModal.tsx

import React from 'react';
import { HeavyWasteSelection } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  value: HeavyWasteSelection;
  onChange: (value: HeavyWasteSelection) => void;
}

const heavyWasteTypes = ['Soil', 'Concrete', 'Bricks', 'Tiles', 'Sand', 'Gravel', 'Rubble'];
const percentageOptions = ['No heavy waste', 'Up to 5%', '5–20%', 'Over 20%'] as const;

export const HeavyWasteModal: React.FC<Props> = ({ isOpen, onClose, value, onChange }) => {
  if (!isOpen) return null;

  const toggleType = (type: string) => {
    const current = value.types.includes(type)
      ? value.types.filter(t => t !== type)
      : [...value.types, type];
    onChange({ ...value, types: current });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg relative">
        <button className="absolute top-2 right-3 text-gray-600" onClick={onClose}>✕</button>
        <h2 className="text-xl font-semibold mb-4">Heavy Waste Types</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {heavyWasteTypes.map(type => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full border ${
                value.types.includes(type) ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <h3 className="text-sm font-medium mb-2">Approximate percentage of heavy waste:</h3>
        <div className="flex gap-2">
          {percentageOptions.map(option => (
            <button
              key={option}
              className={`px-3 py-1 rounded-full border ${
                value.percentage === option ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => onChange({ ...value, percentage: option })}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
