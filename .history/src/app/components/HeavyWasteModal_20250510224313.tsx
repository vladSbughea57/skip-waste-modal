import React from "react";

const HEAVY_WASTE_TYPES = ["Soil", "Concrete", "Bricks", "Tiles", "Sand", "Gravel", "Rubble"];
const HEAVY_PERCENTAGE = ["No heavy waste", "Up to 5%", "5-20%", "Over 20%"];

export default function HeavyWasteModal({ selected, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Heavy Waste Types</h2>

        <p className="mb-2 text-yellow-700">
          ⚠️ Some skip sizes may not be available for heavy waste disposal.
        </p>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Select heavy waste types:</h4>
          <div className="flex flex-wrap gap-2">
            {HEAVY_WASTE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onSelect("type", type)}
                className={`px-3 py-1 rounded border ${
                  selected.type === type ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Approximate percentage:</h4>
          <div className="flex flex-wrap gap-2">
            {HEAVY_PERCENTAGE.map((label) => (
              <button
                key={label}
                onClick={() => onSelect("percentage", label)}
                className={`px-3 py-1 rounded border ${
                  selected.percentage === label ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-right">
          <button className="mr-2 text-sm text-gray-600" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
