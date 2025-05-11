'use client';

import { useEffect, useState } from 'react'; // React hooks for state and side-effects
import { Skip } from '../types/skip'; // Importing type for skip data

export default function BottomBar() {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null); // State for selected skip

  // Synchronize with localStorage for selected skip
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('selectedSkip');
      if (saved) setSelectedSkip(JSON.parse(saved));
    };

    handleStorage(); // Initial check on load
    window.addEventListener('storage', handleStorage); // Listen for storage changes across tabs

    return () => {
      window.removeEventListener('storage', handleStorage); // Cleanup listener on unmount
    };
  }, []);

  // Polling for updates in selected skip from localStorage every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('selectedSkip');
      if (saved) setSelectedSkip(JSON.parse(saved));
    }, 500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate the total price, including VAT
  const totalPrice =
    selectedSkip?.price_before_vat && selectedSkip?.vat !== undefined
      ? selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat) / 100
      : 0; // Fallback to 0 if necessary values are missing
  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-700 p-4 text-white text-sm z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
  {selectedSkip ? (
    <div className="flex flex-row items-center space-x-2">
      {/* Vertical Text Layout (Skip & Days) */}
      <div className="flex flex-col text-sm text-zinc-300 -space-y-1">
        <div>{selectedSkip.size} Yard Skip</div>
        <div>{selectedSkip.hire_period_days} days</div>
      </div>

      {/* Price Layout */}
      <div className="text-right">
        <span className="text-blue-500 text-4xl font-bold">
          £{totalPrice?.toFixed(0)}
        </span>
      </div>
    </div>
  ) : (
    <div className="text-zinc-400">Select a skip to continue</div>
  )}
        <div className="flex space-x-4">
          {/* Back Button */}
          <button
            className="bg-gray-600 hover:bg-gray-500 transition px-6 py-2 rounded text-white"
            onClick={() => {
              localStorage.removeItem('selectedSkip');
              setSelectedSkip(null); // Reset the selection
            }}
          >
            Back
          </button>

          {/* Continue Button */}
          <button
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-2 rounded text-white disabled:opacity-50"
            disabled={!selectedSkip}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
