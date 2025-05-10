import React, { useEffect, useState } from 'react';
import { getWasteData } from '../utils/getWasteData';

export const HeavyWasteModal: React.FC = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [percentages, setPercentages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWasteData();
        setTypes(data.heavyWaste.types);
        setPercentages(data.heavyWaste.percentages);
      } catch (error) {
        console.error('Error fetching heavy waste data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold">Heavy Waste</h3>
      <ul className="mt-2 list-disc ml-5 text-gray-700">
        {types.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>

      <h4 className="mt-4 font-semibold">Accepted Percentages</h4>
      <ul className="list-disc ml-5 text-gray-700">
        {percentages.map((percentage) => (
          <li key={percentage}>{percentage}</li>
        ))}
      </ul>
    </div>
  );
};
