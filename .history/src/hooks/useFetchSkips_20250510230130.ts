import { useEffect, useState } from 'react';
import { SkipOption } from './types';

export const useFetchSkips = (postcode: string) => {
  const [data, setData] = useState<SkipOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}`);
        if (!res.ok) throw new Error('Failed to fetch skips');
        const skips = await res.json();
        setData(skips);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (postcode) {
      fetchSkips();
    }
  }, [postcode]);

  return { data, loading, error };
};
