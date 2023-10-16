import { useState } from 'react';

export interface StarRating {
  rating: number;
  setRating: (value: number) => void;
}

export const UseStarRating = (initialRating: number = 0): StarRating => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  return {
    rating,
    setRating: handleRatingChange,
  };
};
