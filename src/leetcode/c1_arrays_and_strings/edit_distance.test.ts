import { editDistance, editDistanceOptimized } from './edit_distance';

describe('Min Edit Distance', () => {
  const testCases = [
    { word1: 'horse', word2: 'ros', output: 3 },
    { word1: 'intention', word2: 'execution', output: 5 },
    { word1: '', word2: '', output: 0 }, // Both empty
    { word1: 'abc', word2: '', output: 3 }, // Delete all characters
    { word1: '', word2: 'abc', output: 3 }, // Insert all characters
    { word1: 'abc', word2: 'abc', output: 0 }, // No edits needed
    { word1: 'abc', word2: 'yabd', output: 2 }, // Replace + Insert
    { word1: 'kitten', word2: 'sitting', output: 3 }, // Replace 'k'→'s', 'e'→'i', add 'g'
    { word1: 'flaw', word2: 'lawn', output: 2 }, // Replace 'f'→'l', add 'n'
    { word1: 'distance', word2: 'editing', output: 5 }, // Classic test case
  ];

  describe('editDistance - Tests', () => {
    testCases.forEach(({ word1, word2, output }) => {
      const outText = `min operations to reach ${word2} is ${output}`;
      test(`${word1} ${outText}`, () => {
        expect(editDistance(word1, word2)).toBe(output);
      });
    });
  });
  describe('editDistanceOptimized - Tests', () => {
    testCases.forEach(({ word1, word2, output }) => {
      const outText = `min operations to reach ${word2} is ${output}`;
      test(`${word1} ${outText}`, () => {
        expect(editDistanceOptimized(word1, word2)).toBe(output);
      });
    });
  });
});
