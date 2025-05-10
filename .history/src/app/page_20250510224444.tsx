import React, { useEffect, useState } from "react";
import WasteTypeSelection
import SkipOptions from "../components/SkipOptions";
import HeavyWasteModal from "../components/HeavyWasteModal";
import { getSkips } from "../utils/api";

export default function Home() {
  const [selectedWaste, setSelectedWaste] = useState("garden");
  const [heavyModal, setHeavyModal] = useState(false);
  const [heavyWaste, setHeavyWaste] = useState({ type: "", percentage: "" });
  const [skips, setSkips] = useState([]);

  useEffect(() => {
    getSkips("NR32", "Lowestoft").then(setSkips);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select Waste Type</h1>
      <WasteTypeSelection selected={selectedWaste} onChange={setSelectedWaste} />
      
      {selectedWaste === "garden" && (
        <button
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={() => setHeavyModal(true)}
        >
          Add Heavy Waste
        </button>
      )}

      <SkipOptions skips={skips} />

      {heavyModal && (
        <HeavyWasteModal
          selected={heavyWaste}
          onSelect={(field, value) =>
            setHeavyWaste((prev) => ({ ...prev, [field]: value }))
          }
          onClose={() => setHeavyModal(false)}
        />
      )}
    </div>
  );
}
