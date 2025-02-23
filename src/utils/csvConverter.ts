import { Card } from '../types/types';

export const convertToCSV = (items: Card[]) => {
  const header = Object.keys(items[0]).join(',');
  const rows = items.map((row) => Object.values(row).join(','));
  return [header, ...rows].join('\n');
};
