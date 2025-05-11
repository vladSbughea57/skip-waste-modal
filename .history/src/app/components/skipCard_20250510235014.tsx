
import { motion } from 'framer-motion';
import { Skip } from '../types';

interface Props {
  skip: Skip;
  selected: boolean;
  onSelect: () => void;
}

export default function SkipCard({ skip, selected, onSelect }: Props) {
  const totalPrice = skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;
  const warnings: string[] = [];

  if (!skip.allowed_on_road) warnings.push('Not Allowed On The Road');
  if (!skip.allows_heavy_waste) warnings.push('Not Suitable for Heavy Waste');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-lg border-2 transition p-4 cursor-pointer h-full flex flex-col bg-zinc-800 ${
        selected ? 'border-blue-500 shadow-lg' : 'border-zinc-700'
      }`}
      onClick={onSelect}
    >
      <div className="relative w-full h-32 mb-4">
        <img
          src={`/skip-images/skip-${skip.size}.png`}
          alt={`${skip.size} yard skip`}
          className="object-contain w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-xs px-2 py-1 rounded-full">
          {skip.size} Yards
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{skip.size} Yard Skip</h3>
      <p className="text-sm text-zinc-400 mb-1">{skip.hire_period_days} day hire period</p>
      <p className="text-blue-400 font-bold text-xl mb-2">
        £{totalPrice.toFixed(0)}
      </p>
      {warnings.map((warning, idx) => (
        <p
          key={idx}
          className="text-xs bg-red-700 text-white px-2 py-1 mt-1 rounded w-fit"
        >
          {warning}
        </p>
      ))}
    </motion.div>
  );
}