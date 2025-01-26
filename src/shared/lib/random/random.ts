export const getRandomNumber = (a: number, b: number) => {
  if (a < 0 || b < 0) {
    throw new Error('Values must be greater than 0.');
  }

  const max = Math.max(a, b);
  const min = Math.min(a, b);

  return (max - min) * Math.random() + min;
};
