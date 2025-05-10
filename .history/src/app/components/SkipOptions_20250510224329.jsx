import React from "react";

export default function SkipOptions({ skips }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {skips.map((skip) => (
        <div key={skip.id} className="p-4 border rounded shadow bg-white">
          <h3 className="font-bold text-lg">Skip size: {skip.size} yd³</h3>
          <p className="text-gray-700">£{skip.price_before_vat} + VAT</p>
          <p className="text-sm text-gray-600">Hire period: {skip.hire_period_days} days</p>
          <p className="text-sm text-gray-600">On road: {skip.allowed_on_road ? "Yes" : "No"}</p>
          <p className="text-sm text-gray-600">Heavy waste: {skip.allows_heavy_waste ? "Allowed" : "Not allowed"}</p>
        </div>
      ))}
    </div>
  );
}
