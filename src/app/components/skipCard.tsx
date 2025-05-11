import { motion } from "framer-motion"; // For adding motion animations
import { Skip } from "../types/skip"; // Skip type for type-checking
import { AlertTriangle } from "lucide-react"; // Alert icon for warnings

interface Props {
  skip: Skip; // The skip object containing all skip data
  selected: boolean; // Flag indicating whether the card is selected
  onSelect: () => void; // Callback function when a skip card is clicked
}

export default function SkipCard({ skip, selected, onSelect }: Props) {
  // Calculate the total price including VAT
  const totalPrice =
    skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;

  // Array to hold warning messages based on skip properties
  const warnings: { label: string; color: string }[] = [];

  // Check for heavy waste and road allowances and add warnings -> Like the original example
  if (!skip.allows_heavy_waste)
    warnings.push({
      label: "Not Suitable for Heavy Waste",
      color: "bg-red-700", // Red warning badge
    });
  if (!skip.allowed_on_road)
    warnings.push({ label: "Not Allowed On The Road", color: "bg-yellow-500" }); // Yellow warning badge

  // Disable the card if both conditions are not met -> Like the original example, selectable if the skip is "Not Allowed On The Road"
  const isDisabled = !skip.allowed_on_road && !skip.allows_heavy_waste;
  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.015 } : undefined}
      className={`rounded-2xl border transition p-5 flex flex-col bg-zinc-900 ${
        selected ? "border-blue-500 shadow-lg" : "border-zinc-700"
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={!isDisabled ? onSelect : undefined}
    >
      {/* Image container */}
      <div className="relative w-full h-44 mb-4 flex justify-center items-center bg-zinc-800 rounded-xl">
        <img
          src={`/skip-images/skip-${skip.size}.png`}
          alt={`${skip.size} yard skip`}
          className="object-contain max-h-full max-w-full p-2"
        />

        {/* Select status badge - top-right */}
        {!isDisabled && (
          <span
            className={`absolute top-2 right-2 text-xs px-2.5 py-1 rounded-full font-bold z-10 ${
              selected ? "bg-blue-500 text-white" : "bg-zinc-700 text-zinc-300"
            }`}
          >
            {selected ? "✓ Selected" : "Select Skip"}
          </span>
        )}

        {/* Warning badges - bottom-left */}
        {warnings.length > 0 && (
          <div className="absolute bottom-2 left-2 space-y-1 z-10">
            {warnings.map((warning, idx) => (
              <span
                key={idx}
                className={`flex items-center gap-1 text-white text-[10px] px-2 py-0.5 rounded ${warning.color}`}
              >
                <AlertTriangle size={10} className="shrink-0" />
                {warning.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Skip Info */}
      <div className="text-center mb-4 space-y-1">
        <h3 className="text-xl font-semibold text-white">
          {skip.size} Yard Skip
        </h3>
        <p className="text-base text-zinc-400">
          {skip.hire_period_days} day hire period
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="bg-zinc-800 rounded-lg p-3 mb-3 text-base text-zinc-300 space-y-1">
        <p>
          Transport:{" "}
          <span className="font-bold">{skip.transport_cost ? `£${skip.transport_cost}` : "Included"}</span>
        </p>
        <p>
          Per Tonne:{" "}
          <span className="font-bold">{skip.per_tonne_cost ? `£${skip.per_tonne_cost}` : "Not applicable"}</span>
        </p>
        <p>VAT: <span className="font-bold">£{((skip.price_before_vat * skip.vat) / 100).toFixed(0)}</span></p>
      </div>

      {/* Total Price */}
      <div className="text-center mb-4">
        <p className="text-blue-400 font-bold text-2xl">
          Total: £{totalPrice.toFixed(0)}
        </p>
        <p className="text-zinc-500 text-md">
          VAT Included
        </p>
      </div>
    </motion.div>
  );
}
