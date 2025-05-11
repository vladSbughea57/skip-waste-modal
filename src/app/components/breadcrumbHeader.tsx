export default function BreadcrumbHeader() {
    return (
      <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-3 flex items-center gap-4 text-sm overflow-x-auto whitespace-nowrap">
        <span className="text-blue-400">Postcode</span>
        <span className="text-zinc-400">&#10095;</span>
        <span className="text-blue-400">Waste Type</span>
        <span className="text-zinc-400">&#10095;</span>
        <span className="font-semibold text-white">Select Skip</span>
        <span className="text-zinc-400">&#10095;</span>
        <span className="text-zinc-500">Permit Check</span>
        <span className="text-zinc-400">&#10095;</span>
        <span className="text-zinc-500">Choose Date</span>
        <span className="text-zinc-400">&#10095;</span>
        <span className="text-zinc-500">Payment</span>
      </div>
    );
  }
  