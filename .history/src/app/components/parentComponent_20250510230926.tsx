// ParentComponent.tsx
import React, { useState } from 'react';
import SkipSelectionModal from './skipSelectionModal';
import Skip

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const handleSkipSelected = (skip: Skip) => {
    setSelectedSkip(skip);
    setIsModalOpen(false);
    // You might want to do something with the selected skip here
    console.log('Selected skip:', skip);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Select Your Skip
      </button>

      {selectedSkip && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Selected Skip:</h3>
          <p>{selectedSkip.size} Yard Skip</p>
          <p>£{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)}</p>
        </div>
      )}

      {isModalOpen && (
        <SkipSelectionModal
          postcode="NR32"
          area="Lowestoft"
          onClose={() => setIsModalOpen(false)}
          onSkipSelected={handleSkipSelected}
        />
      )}
    </div>
  );
};

export default ParentComponent;