export default function BreadcrumbHeader() {
  return (
    <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-4 flex items-center gap-4 text-xs md:text-base font-medium overflow-hidden">
      <span className="text-blue-400 whitespace-nowrap">Postcode</span>
      <span className="text-zinc-400">&#10095;</span>
      <span className="text-blue-400 whitespace-nowrap">Waste Type</span>
      <span className="text-zinc-400">&#10095;</span>
      <span className="text-white font-bold whitespace-nowrap">Select Skip</span>
      <span className="text-zinc-400">&#10095;</span>
      <span className="text-zinc-500 whitespace-nowrap">Permit Check</span>
      <span className="text-zinc-400">&#10095;</span>
      <span className="text-zinc-500 whitespace-nowrap">Choose Date</span>
      <span className="text-zinc-400">&#10095;</span>
      <span className="text-zinc-500 whitespace-nowrap">Payment</span>
    </div>
  );
}