import { palindromePermutation } from './palindrome_permutation';

describe('palindromePermutation - Tests', () => {
  const testCases = [
    { input: 'code', output: false },
    { input: 'aab', output: true },
    { input: 'carerac', output: true },
    { input: 'aabb', output: true },
    { input: 'aaaa', output: true },
    { input: 'x', output: true },
    { input: 'abcabcde', output: false },
    { input: 'aabbccddeeffg', output: true },
  ];
  testCases.forEach(({ input, output }) => {
    test(`${input} ${output ? 'is a palindrome' : 'is not palindrome'}`, () => {
      expect(palindromePermutation(input)).toBe(output);
    });
  });
});
