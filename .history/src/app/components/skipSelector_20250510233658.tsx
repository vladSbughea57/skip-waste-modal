interface SkipSelectorProps {
  skips: any[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const SkipSelector = ({ skips, selectedId, onSelect }: SkipSelectorProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {skips.map(skip => {
      const isDisabled = !skip.allowed_on_road || !skip.allows_heavy_waste;
      const warnings = [];
      if (!skip.allowed_on_road) warnings.push("Not Allowed On The Road");
      if (!skip.allows_heavy_waste) warnings.push("Not Suitable for Heavy Waste");

      return (
        <div
          key={skip.id}
          className={`p-4 rounded-lg border transition cursor-pointer ${
            skip.id === selectedId ? 'border-blue-600 bg-blue-900/20' : 'border-gray-700'
          } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-500'}`}
          onClick={() => !isDisabled && onSelect(skip.id)}
        >
          <div className="text-xl font-semibold mb-1">{skip.size} Yard Skip</div>
          <div className="text-gray-400">{skip.hire_period_days} day hire</div>
          <div className="text-blue-400 font-bold mt-2">£{(skip.price_before_vat * 1.2).toFixed(2)}</div>
          {warnings.length > 0 && (
            <div className="text-red-400 text-sm mt-2">
              {warnings.map((w, i) => <div key={i}>⚠️ {w}</div>)}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export default SkipSelector;
