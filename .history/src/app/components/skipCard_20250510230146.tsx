import React from 'react';
import { SkipOption } from './types';

interface Props {
  skip: SkipOption;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const SkipCard: React.FC<Props> = ({ skip, isSelected, onSelect }) => {
  const totalPrice = skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;

  return (
    <div
      className={`border rounded-xl p-4 cursor-pointer transition ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onClick={() => onSelect(skip.id)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{skip.size} Yard Skip</h3>
        <span className="text-sm text-gray-500">{skip.hire_period_days} days</span>
      </div>
      <p className="text-sm text-gray-700">£{totalPrice.toFixed(2)} inc VAT</p>
      <p className="text-xs text-gray-500 mt-1">
        {skip.allowed_on_road ? 'Allowed on road' : 'Off-road only'} ·{' '}
        {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'No heavy waste'}
      </p>
    </div>
  );
};
