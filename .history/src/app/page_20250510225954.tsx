
import React, { useState } from 'react';
import { useFetchSkips } from '@/hooks/useFetchSkips';
import SkipOptions from './components/SkipOptions';

const Home: React.FC = () => {
  const [postcode, setPostcode] = useState('NR32');
  const { skips, loading, error } = useFetchSkips(postcode);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your Skip</h1>

      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value.toUpperCase())}
        placeholder="Enter postcode"
        className="border p-2 rounded-md mb-4 w-full"
      />

      {loading && <p>Loading skips...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <SkipOptions skips={skips} />
    </div>
  );
};

export default Home;
