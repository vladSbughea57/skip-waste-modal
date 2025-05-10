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
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href="#" className="hover:text-blue-600">Home</a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blue-600">Waste Services</a>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium">Skip Hire</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skip Hire in {area}</h1>
        <p className="text-lg text-gray-600">
          Get the right skip for your project in {postcode} {area && `(${area})`}
        </p>
      </div>

      {/* Location Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Your Location</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-32"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-48"
            />
          </div>
        </div>
      </div>

      {/* Selected Skip Preview */}
      {selectedSkip && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Selected Skip</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{selectedSkip.size} Yard Skip</h3>
              <p className="text-gray-600">{selectedSkip.hire_period_days} day hire period</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">incl. VAT</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition text-lg font-medium"
        >
          {selectedSkip ? 'Change Skip Selection' : 'Select Your Skip'}
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">About Our Skip Hire Service</h2>
        <p className="text-gray-600 mb-4">
          We offer a range of skip sizes to suit all your waste disposal needs. Whether you're 
          doing a small home clean-up or a large construction project, we have the right skip for you.
        </p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>14-day standard hire period</li>
          <li>Competitive pricing with no hidden fees</li>
          <li>Environmentally responsible waste disposal</li>
          <li>Flexible delivery options</li>
        </ul>
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