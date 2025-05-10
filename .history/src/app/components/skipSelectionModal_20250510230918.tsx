// SkipSelectionModal.tsx
import React, { useState, useEffect } from 'react';
import { Skip, SkipSelectionModalProps } from '../types';
const SkipSelectionModal: React.FC<SkipSelectionModalProps> = ({
  postcode,
  area = '',
  onClose,
  onSkipSelected,
}) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSkips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skips');
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode, area]);

  const calculateTotalPrice = (skip: Skip): number => {
    return skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;
  };

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleConfirmSelection = () => {
    if (selectedSkip) {
      onSkipSelected(selectedSkip);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Loading available skips...</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select Your Skip Size</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-6 text-gray-600">
          Available skips for {postcode} {area && `(${area})`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {skips.map((skip) => (
            <div
              key={skip.id}
              onClick={() => handleSelectSkip(skip)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedSkip?.id === skip.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{skip.size} Yard Skip</h3>
                {!skip.allowed_on_road && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Not road allowed
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{skip.hire_period_days} days hire</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Ex VAT: £{skip.price_before_vat.toFixed(2)}
                </p>
                <p className="font-bold text-lg">
                  £{calculateTotalPrice(skip).toFixed(2)} inc VAT
                </p>
              </div>
              {skip.allows_heavy_waste && (
                <p className="text-xs text-green-600 mt-2">✓ Accepts heavy waste</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedSkip}
            className={`py-2 px-6 rounded text-white transition ${
              selectedSkip
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipSelectionModal;