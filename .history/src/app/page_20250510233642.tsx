import { useEffect, useState } from 'react';
import BreadcrumbHeader from './components/breadcrumbHeader';
import SkipPage from './components/skipPage';

const SkipPage = () => {
  const [skips, setSkips] = useState<any[]>([]);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then(res => res.json())
      .then(data => {
        setSkips(data);
        if (data.length > 0) setSelectedSkipId(data[0].id);
      });
  }, []);

  const selected = skips.find(skip => skip.id === selectedSkipId);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pb-24">
      <BreadcrumbHeader />
      <h1 className="text-2xl font-bold mb-6">Choose Your Skip Size</h1>
      <p className="text-gray-400 mb-4">Select the skip size that best suits your needs</p>
      <SkipSelector skips={skips} selectedId={selectedSkipId} onSelect={setSelectedSkipId} />
      {selected && (
        <BottomBar
          selectedSize={selected.size}
          price={selected.price_before_vat * 1.2}
          onContinue={() => console.log(`Selected skip ID: ${selected.id}`)}
        />
      )}
    </div>
  );
};

export default SkipPage;
