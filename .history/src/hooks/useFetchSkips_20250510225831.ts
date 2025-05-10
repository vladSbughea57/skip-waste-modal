import { useEffect, useState } from 'react';
import { Skip}

export const useFetchSkips = (postcode: string, area: string = '') => {
  const [skips, setSkips] = useState<SkipOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
        );
        if (!res.ok) throw new Error('Failed to fetch skips');
        const data: SkipOption[] = await res.json();
        setSkips(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkips();
  }, [postcode, area]);

  return { skips, loading, error };
};