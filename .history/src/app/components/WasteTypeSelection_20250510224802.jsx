import React, { useEffect, useState } from 'react';
import { WasteType } from '../types/Waste';
import { getWasteData } from '../utils/getWasteData';

interface WasteTypeSelectionProps {
  selected: string | null;
  onChange: (key: string) => void;
}

export const WasteTypeSelection: React.FC<WasteTypeSelectionProps> = ({ selected, onChange }) => {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWasteData();
        setWasteTypes(data.types);
      } catch (error) {
        console.error('Error fetching waste types:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {wasteTypes.map(({ key, label, examples }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          type="button"
          className={`p-4 rounded border text-left ${
            selected === key ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'
          }`}
        >
          <h3 className="font-semibold">{label}</h3>
          <ul className="text-sm list-disc ml-4 mt-2 text-gray-600">
            {examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
};