import { maxDigitSum } from './sumdigits.max';

describe('maxDigitSum', () => {
  test('returns correct max from docstring example: [16, 28, 39]', () => {
    // digital roots: 7, 1, 3 → max is 7
    expect(maxDigitSum([16, 28, 39])).toBe(7);
  });

  test('handles single-element array', () => {
    expect(maxDigitSum([5])).toBe(5);
  });

  test('reduces multi-digit sum recursively until single digit', () => {
    // 19 → 1+9=10 → 1+0=1
    expect(maxDigitSum([19])).toBe(1);
  });

  test('returns 9 for multiples of 9', () => {
    expect(maxDigitSum([9, 18, 27, 99])).toBe(9);
  });

  test('returns 0 for zero', () => {
    expect(maxDigitSum([0])).toBe(0);
  });

  test('returns the largest digital root across all elements', () => {
    // digital roots: 5→5, 14→5, 23→5
    expect(maxDigitSum([5, 14, 23])).toBe(5);
    // digital roots: 1→1, 11→2, 12→3
    expect(maxDigitSum([1, 11, 12])).toBe(3);
  });
});
