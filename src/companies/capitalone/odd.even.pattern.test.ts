import { hasOddEvenPattern, hasOddEvenPatternSol2 } from './odd.even.pattern';

describe('hasOddEvenPattern', () => {
  test('returns false for empty array', () => {
    expect(hasOddEvenPattern([])).toBe(false);
    expect(hasOddEvenPatternSol2([])).toBe(false);
  });

  test('returns false for single element', () => {
    expect(hasOddEvenPattern([1])).toBe(false);
    expect(hasOddEvenPatternSol2([1])).toBe(false);
    expect(hasOddEvenPattern([2])).toBe(false);
    expect(hasOddEvenPatternSol2([2])).toBe(false);
  });

  test('returns true for odd followed by even', () => {
    expect(hasOddEvenPattern([1, 2])).toBe(true);
    expect(hasOddEvenPatternSol2([1, 2])).toBe(true);
  });

  test('returns true for even followed by odd', () => {
    expect(hasOddEvenPattern([2, 1])).toBe(true);
    expect(hasOddEvenPatternSol2([2, 1])).toBe(true);
  });

  test('returns false when all elements are odd', () => {
    expect(hasOddEvenPattern([1, 3, 5, 7])).toBe(false);
    expect(hasOddEvenPatternSol2([1, 3, 5, 7])).toBe(false);
  });

  test('returns false when all elements are even', () => {
    expect(hasOddEvenPattern([2, 4, 6, 8])).toBe(false);
    expect(hasOddEvenPatternSol2([2, 4, 6, 8])).toBe(false);
  });

  test('returns true when alternating pattern exists anywhere in array', () => {
    // first two are even-even, last pair is even-odd
    expect(hasOddEvenPattern([2, 4, 1])).toBe(true);
    expect(hasOddEvenPatternSol2([2, 4, 1])).toBe(true);
  });

  test('returns true for fully alternating array', () => {
    expect(hasOddEvenPattern([1, 2, 3, 4])).toBe(true);
    expect(hasOddEvenPatternSol2([1, 2, 3, 4])).toBe(true);
  });
});
