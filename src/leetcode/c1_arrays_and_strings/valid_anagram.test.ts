import { isAnagram, isAnagramOptimized } from './valid_anagram';

describe('Anagram Tests', () => {
  const testSet = [
    ['anagram', 'nagaram', true],
    ['rat', 'car', false],
    ['carr', 'car', false],
  ];
  describe('isAnagram', () => {
    testSet.forEach((data: any[]) => {
      test(`test if ${data[0]} is anagram of ${data[1]}`, () => {
        expect(isAnagram(data[0], data[1])).toBe(data[2]);
      });
    });
  });

  describe('isAnagramOptimized', () => {
    testSet.forEach((data: any[]) => {
      test(`test if ${data[0]} is anagram of ${data[1]}`, () => {
        expect(isAnagramOptimized(data[0], data[1])).toBe(data[2]);
      });
    });
  });
});
