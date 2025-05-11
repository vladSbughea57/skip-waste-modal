'use client';

import { useEffect, useState } from 'react';
import { Skip } from '../types/skip';

export default function BottomBar() {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedSkip');
    if (saved) setSelectedSkip(JSON.parse(saved));
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-700 p-4 flex items-center justify-between text-white text-sm z-50">
      {selectedSkip ? (
        <div className="text-sm">
          {selectedSkip.size} Yard Skip • £
          {(selectedSkip.price_before_vat +
            (selectedSkip.price_before_vat * selectedSkip.vat) / 100).toFixed(0)}{' '}
          • {selectedSkip.hire_period_days} days
        </div>
      ) : (
        <div className="text-zinc-400">Select a skip to continue</div>
      )}
      <button
        className="bg-blue-600 hover:bg-blue-500 transition px-6 py-2 rounded text-white disabled:opacity-50"
        disabled={!selectedSkip}
      >
        Continue
      </button>
    </div>
  );
}