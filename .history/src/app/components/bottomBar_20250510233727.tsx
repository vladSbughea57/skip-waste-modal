interface BottomBarProps {
    selectedSize: number;
    price: number;
    onContinue: () => void;
  }
  
  const BottomBar = ({ selectedSize, price, onContinue }: BottomBarProps) => (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 p-4 flex justify-between items-center">
      <div className="text-white">
        <span className="font-semibold">{selectedSize} Yard Skip</span> • £{price.toFixed(2)} • 14 day hire
      </div>
      <button
        onClick={onContinue}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Continue →
      </button>
    </div>
  );
  
  export default BottomBar;
  