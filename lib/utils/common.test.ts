import { describe, expect, test } from 'vitest';

import { getRandomNumber } from './common';

describe('getRandomNumber', () => {
  test.each([
    [0, 1],
    [1, 2],
    [2, 1],
    [1, 0]
  ])('getRandomNumber(%i, %i) should work', (a, b) => {
    expect(getRandomNumber(a, b)).toBeGreaterThanOrEqual(Math.min(a, b));
    expect(getRandomNumber(a, b)).toBeLessThan(Math.max(a, b));
  });

  test.each([
    [-1, 1],
    [1, -1],
    [-1, -1]
  ])('getRandomNumber(%i, %i) throws an error', (a, b) => {
    expect(() => getRandomNumber(a, b)).toThrowError();
  });
});
