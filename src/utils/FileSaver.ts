import { Card } from '../types/types';
import { convertToCSV } from './csvConverter';

export const createDownloadUrl = (data: Card[]): string => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};

export const revokeDownloadUrl = (url: string) => {
  URL.revokeObjectURL(url);
};
