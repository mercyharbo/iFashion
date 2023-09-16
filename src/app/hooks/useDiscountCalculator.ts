import { useMemo } from 'react';

export const useDiscountCalculator = () => {
  const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ): number => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
  };

  const calculateRoundedPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return {
    calculateDiscountedPrice,
    calculateRoundedPrice,
  };
};
