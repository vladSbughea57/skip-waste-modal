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
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

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
        const sortedSkips = data.sort((a: Skip, b: Skip) => a.size - b.size);
        setSkips(sortedSkips);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skips');
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode, area]);

  const calculateTotalPrice = (skip: Skip): string => {
    const total = skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;
    return `£${total.toFixed(0)}`;
  };

  const handleSelectSkip = (skipId: number) => {
    setSelectedSkipId(skipId);
  };

  const handleConfirmSelection = () => {
    const selectedSkip = skips.find(skip => skip.id === selectedSkipId);
    if (selectedSkip) {
      onSkipSelected(selectedSkip);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Skip Size</h2>
            <p className="text-lg text-gray-600">Select the skip size that best suits your needs</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mt-1"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skips.map((skip) => (
            <div
              key={skip.id}
              onClick={() => handleSelectSkip(skip.id)}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedSkipId === skip.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-2xl text-gray-800">
                  {skip.size} Yard Skip
                </h3>
                {selectedSkipId === skip.id && (
                  <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">{skip.hire_period_days} day hire period</p>
              
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-800">
                  {calculateTotalPrice(skip)}
                </span>
                <button
                  className={`py-2 px-4 rounded-lg text-sm font-medium ${
                    selectedSkipId === skip.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {selectedSkipId === skip.id ? '✓ Selected' : 'Select →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between border-t pt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-3 px-8 rounded-lg hover:bg-gray-300 transition text-lg"
          >
            Back
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedSkipId}
            className={`py-3 px-8 rounded-lg text-white transition text-lg ${
              selectedSkipId
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipSelectionModal;