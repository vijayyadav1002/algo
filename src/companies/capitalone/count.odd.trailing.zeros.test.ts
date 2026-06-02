import { countOddTrailingZeros } from './count.odd.trailing.zeros';

describe('countOddTrailingZeros', () => {
  test('returns 0 for empty array', () => {
    expect(countOddTrailingZeros([])).toBe(0);
  });

  test('returns 0 when no numbers have trailing zeros', () => {
    expect(countOddTrailingZeros([1, 3, 7, 9])).toBe(0);
  });

  test('counts numbers with exactly 1 trailing zero (odd)', () => {
    expect(countOddTrailingZeros([10])).toBe(1);
    expect(countOddTrailingZeros([20, 30])).toBe(2);
  });

  test('does not count numbers with 2 trailing zeros (even)', () => {
    expect(countOddTrailingZeros([100, 200])).toBe(0);
  });

  test('counts numbers with 3 trailing zeros (odd)', () => {
    expect(countOddTrailingZeros([1000])).toBe(1);
  });

  test('does not count numbers with 4 trailing zeros (even)', () => {
    expect(countOddTrailingZeros([10000])).toBe(0);
  });

  test('handles mixed trailing-zero counts', () => {
    // 10→1 zero (odd), 100→2 zeros (even), 1000→3 zeros (odd), 10000→4 zeros (even)
    expect(countOddTrailingZeros([10, 100, 1000, 10000])).toBe(2);
  });

  test('handles numbers with no trailing zeros alongside those with odd trailing zeros', () => {
    expect(countOddTrailingZeros([7, 10, 100, 3000])).toBe(2);
  });
});
