import React, { useState } from 'react';
import { useFetchSkips } from './useFetchSkips';
import { SkipCard } from './SkipCard';

interface Props {
  postcode: string;
  onClose: () => void;
  onSelect: (skipId: number) => void;
}

export const SkipSelectionModal: React.FC<Props> = ({ postcode, onClose, onSelect }) => {
  const { data: skips, loading, error } = useFetchSkips(postcode);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl h-[80vh] overflow-y-auto shadow-lg relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Select a Skip</h2>

        {loading && <p>Loading skips...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedId === skip.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div className="mt-6 text-right">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={() => selectedId && onSelect(selectedId)}
            disabled={!selectedId}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
