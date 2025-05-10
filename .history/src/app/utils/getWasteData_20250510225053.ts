export const fetchSkipsByLocation = async (
    postcode: string,
    area = ''
  ): Promise<SkipOption[]> => {
    const response = await fetch(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch skips');
    }
  
    return response.json();
  };