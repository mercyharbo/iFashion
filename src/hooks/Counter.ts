import { useState } from 'react';

export const UseCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment: () => void = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement: () => void = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return { count, increment, decrement };
};
