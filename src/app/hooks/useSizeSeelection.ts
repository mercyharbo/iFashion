import { useState } from 'react';

const useSizeSelection = (initialSize: string | null) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(initialSize);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return {
    selectedSize,
    handleSizeClick,
  };
};

export default useSizeSelection;
