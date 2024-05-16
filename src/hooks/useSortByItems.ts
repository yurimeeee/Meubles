import { Product } from '@type/types';
import { useEffect, useState } from 'react';

export const useSortByItems = (data: Product[], sortByOption: string) => {
  const [sortedData, setSortedData] = useState<Product[]>([]);

  useEffect(() => {
    if (sortByOption === '최신순') {
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setSortedData(sorted);
    } else if (sortByOption === '상품명') {
      const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setSortedData(sorted);
    } else if (sortByOption === '높은가격') {
      const sorted = [...data].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setSortedData(sorted);
    } else if (sortByOption === '낮은가격') {
      const sorted = [...data].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setSortedData(sorted);
    }
  }, [data, sortByOption]);

  return sortedData;
};
