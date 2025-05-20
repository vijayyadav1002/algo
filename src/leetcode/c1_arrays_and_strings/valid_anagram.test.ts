import { isAnagram } from './valid_anagram';

describe('isAnagram', () => {
  const testSet = [
    ['anagram', 'nagaram', true],
    ['rat', 'car', false],
  ];
  testSet.forEach((data: any[]) => {
    test(`test if ${data[0]} is anagram of ${data[1]}`, () => {
      expect(isAnagram(data[0], data[1])).toBe(data[2]);
    });
  });
});
