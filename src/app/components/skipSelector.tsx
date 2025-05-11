// components/SkipSelector.tsx
'use client';

import { useEffect, useState } from 'react';
import SkipCard from './skipCard';
import { Skip } from '../types/skip';

export default function SkipSelector() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const selected = skips.find((s) => s.id === selectedId);
    if (selected) {
      localStorage.setItem('selectedSkip', JSON.stringify(selected));
    }
  }, [selectedId, skips]);

  if (loading) return <div className="text-white text-center p-6">Loading skips...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          selected={selectedId === skip.id}
          onSelect={() => setSelectedId(skip.id)}
        />
      ))}
    </div>
  );
} 
