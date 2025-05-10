'use client'

// ParentComponent.tsx
import React, { useState } from 'react';
import SkipSelectionModal from './SkipSelectionModal';
import { Skip } from './types';

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [postcode, setPostcode] = useState('NR32');
  const [area, setArea] = useState('Lowestoft');

  const handleSkipSelected = (skip: Skip) => {
    setSelectedSkip(skip);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href="#" className="hover:text-green-600">Home</a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-green-600">Waste Services</a>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium">Skip Hire</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Skip Hire in {area}</h1>
        <p className="text-gray-600">
          Get the right skip for your project in {postcode} {area && `(${area})`}
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Available Skip Sizes</h2>
            <p className="text-gray-600 text-sm">Select from our range of skip sizes</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 md:mt-0 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
          >
            {selectedSkip ? 'Change Skip' : 'Select Skip'}
          </button>
        </div>

        {selectedSkip ? (
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900">{selectedSkip.size} Yard Skip</h3>
                <p className="text-gray-600 text-sm">{selectedSkip.hire_period_days} day hire period</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(0)}
                </p>
                <p className="text-green-600 text-sm">WE WANT WASTE</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500">No skip selected yet</p>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Skip Hire Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Delivery & Collection</h3>
            <p className="text-gray-600 text-sm">
              All skips include delivery and collection within the standard hire period.
              Additional days may be available upon request.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Permit Information</h3>
            <p className="text-gray-600 text-sm">
              Some skips may require permits if placed on public roads. We can advise on
              permit requirements for your location.
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SkipSelectionModal
          postcode={postcode}
          area={area}
          onClose={() => setIsModalOpen(false)}
          onSkipSelected={handleSkipSelected}
        />
      )}
    </div>
  );
};

export default ParentComponent;