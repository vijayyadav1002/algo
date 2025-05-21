import {
  checkInclusion,
  checkInclusionOptimized,
  checkInclusionOptimizedButSimple,
} from './permutation_in_string';

describe('Permutation in String', () => {
  const testCases = [
    {
      s1: 'ab',
      s2: 'eidbaooo',
      expected: true,
      description: 'basic case with permutation present',
    },
    {
      s1: 'ab',
      s2: 'eidboaoo',
      expected: false,
      description: 'no permutation present',
    },
    {
      s1: 'adc',
      s2: 'dcda',
      expected: true,
      description: 'permutation at the end',
    },
    {
      s1: 'hello',
      s2: 'world',
      expected: false,
      description: 'different lengths, no match',
    },
    {
      s1: 'abc',
      s2: 'bbbca',
      expected: true,
      description: 'partial match but not permutation',
    },
    {
      s1: 'a',
      s2: 'a',
      expected: true,
      description: 'single character match',
    },
    {
      s1: 'aaa',
      s2: 'aa',
      expected: false,
      description: 's1 longer than s2',
    },
  ];

  describe('Original Solution', () => {
    for (const testCase of testCases) {
      const { s1, s2, expected, description } = testCase;
      test(description, () => {
        expect(checkInclusion(s1, s2)).toBe(expected);
      });
    }
  });

  describe('Optimized Solution', () => {
    for (const testCase of testCases) {
      const { s1, s2, expected, description } = testCase;
      test(description, () => {
        expect(checkInclusionOptimized(s1, s2)).toBe(expected);
      });
    }
  });

  describe('Optimized Solution but Simple', () => {
    for (const testCase of testCases) {
      const { s1, s2, expected, description } = testCase;
      test(description, () => {
        expect(checkInclusionOptimizedButSimple(s1, s2)).toBe(expected);
      });
    }
  });
});
