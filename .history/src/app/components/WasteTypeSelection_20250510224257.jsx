import React from "react";

const WASTE_TYPES = [
  { key: "household", label: "Household Waste", examples: ["Furniture", "Appliances", "Garden waste", "General household items"] },
  { key: "construction", label: "Construction Waste", examples: ["Bricks", "Concrete", "Timber", "Plasterboard"] },
  { key: "garden", label: "Garden Waste", examples: ["Soil", "Branches", "Plants", "Grass cuttings"] },
  { key: "commercial", label: "Commercial Waste", examples: ["Office furniture", "Equipment", "Shop fittings", "Commercial debris"] }
];

export default function WasteTypeSelection({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {WASTE_TYPES.map((type) => (
        <div
          key={type.key}
          onClick={() => onChange(type.key)}
          className={`p-4 rounded border cursor-pointer ${
            selected === type.key ? "bg-blue-100 border-blue-500" : "bg-gray-100"
          }`}
        >
          <h3 className="font-semibold">{type.label}</h3>
          <ul className="text-sm list-disc ml-4 mt-2 text-gray-600">
            {type.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
