import { WasteData } from '../types/Waste';

export const getWasteData = async (): Promise<WasteData> => {
  const response = await fetch('/wasteTypes.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch waste data: ${response.status}`);
  }
  return (await response.json()) as WasteData;
};