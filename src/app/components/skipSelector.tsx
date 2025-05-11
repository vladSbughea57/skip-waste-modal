'use client';

import { useEffect, useState } from 'react';
import SkipCard from './skipCard';
import { Skip } from '../types/skip';
import SkipCardSkeleton from './skeletonLoading';

export default function SkipSelector() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load skips and restore selection
  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        setLoading(false);

        // Try to restore selection from localStorage
        const stored = localStorage.getItem('selectedSkip');
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as Skip;
            const match = data.find((s: Skip) => s.id === parsed.id);
            if (match) {
              setSelectedId(match.id);
            }
          } catch (e) {
            console.error('Error parsing stored skip:', e);
          }
        }
      });
  }, []);

  // Persist selection
  useEffect(() => {
    const selected = skips.find((s) => s.id === selectedId);
    if (selected) {
      localStorage.setItem('selectedSkip', JSON.stringify(selected));
    }
  }, [selectedId, skips]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkipCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  

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
