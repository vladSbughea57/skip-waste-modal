import React, { useEffect, useState } from 'react';
import { fetchSkipsByLocation } from '../services/api';
import { SkipOption } from './types';

interface SkipOptionsProps {
  postcode: string;
  area?: string;
  onSelect?: (skip: SkipOption) => void;
}

const SkipOptions: React.FC<SkipOptionsProps> = ({ postcode, area = '', onSelect }) => {
  const [skips, setSkips] = useState<SkipOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const data = await fetchSkipsByLocation(postcode, area);
        setSkips(data);
      } catch (err) {
        setError('Failed to fetch skip options.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode, area]);

  if (loading) return <p>Loading skips...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skips.map((skip) => {
        const totalPrice = skip.price_before_vat + (skip.vat / 100) * skip.price_before_vat;
        return (
          <div
            key={skip.id}
            className={`border p-4 rounded-md shadow hover:shadow-lg cursor-pointer ${
              !skip.allowed_on_road ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelect?.(skip)}
          >
            <h3 className="text-lg font-semibold mb-2">{skip.size} Yard Skip</h3>
            <p>Hire Period: {skip.hire_period_days} days</p>
            <p>
              {skip.allowed_on_road ? '✅ Allowed on road' : '🚫 Not allowed on road'}
            </p>
            <p>
              {skip.allows_heavy_waste
                ? '✅ Heavy waste allowed'
                : '🚫 No heavy waste'}
            </p>
            <p className="font-bold mt-2">£{totalPrice.toFixed(2)} (incl. VAT)</p>
          </div>
        );
      })}
    </div>
  );
};

export default SkipOptions;
