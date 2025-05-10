import React from 'react';
import { SkipOption } from '../types';

interface Props {
  skips: SkipOption[];
}

const SkipOptions: React.FC<Props> = ({ skips }) => {
  if (!skips.length) return <p>No skips available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {skips.map((skip) => (
        <div
          key={skip.id}
          className="rounded-xl shadow-md p-4 border border-gray-200 bg-white"
        >
          <h3 className="text-xl font-semibold">{skip.size} Yard Skip</h3>
          <p className="text-sm text-gray-500">{skip.hire_period_days} day hire</p>
          <p className="text-lg mt-2 font-bold">
            £{(skip.price_before_vat * 1.2).toFixed(2)} incl. VAT
          </p>
          <ul className="text-sm mt-2 text-gray-600">
            <li>✅ On road: {skip.allowed_on_road ? 'Yes' : 'No'}
            </li>
            <li>✅ Heavy waste allowed: {skip.allows_heavy_waste ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
export default SkipOptions;
