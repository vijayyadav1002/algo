import { oneEditDistant, oneEditDistantOptimized } from './one_edit_distance';

describe('one edit distance', () => {
  describe('oneEditDistant - Tests', () => {
    const testCases = [
      { s: 'ab', t: 'acb', output: true }, // Insert 'c'
      { s: 'cab', t: 'ad', output: false }, // More than one edit
      { s: '1203', t: '1213', output: true }, // Replace '0' with '1'
      { s: '', t: '', output: false }, // Zero edits
      { s: '', t: 'a', output: true }, // Insert 'a'
      { s: 'a', t: '', output: true }, // Delete 'a'
      { s: 'abc', t: 'abc', output: false }, // No edits
      { s: 'abc', t: 'ab', output: true }, // Delete 'c'
      { s: 'ab', t: 'abc', output: true }, // Insert 'c'
      { s: 'abc', t: 'adc', output: true }, // Replace 'b' with 'd'
      { s: 'abc', t: 'abcd', output: true }, // Insert 'd' at the end
      { s: 'abcd', t: 'abc', output: true }, // Delete 'd' from the end
      { s: 'abcdef', t: 'abqdef', output: true }, // Replace 'c' with 'q'
      { s: 'abcdef', t: 'abqdefg', output: false }, // Replace + Insert → more than one edit
    ];
    testCases.forEach(({ s, t, output }) => {
      const outText = output
        ? `is one edit distance from ${t}`
        : `is not one edit distance from ${t}`;
      test(`${s} ${outText}`, () => {
        expect(oneEditDistant(s, t)).toBe(output);
      });
    });
  });
  describe('oneEditDistantOptimized - Tests', () => {
    const testCases = [
      { s: 'ab', t: 'acb', output: true }, // Insert 'c'
      { s: 'cab', t: 'ad', output: false }, // More than one edit
      { s: '1203', t: '1213', output: true }, // Replace '0' with '1'
      { s: '', t: '', output: false }, // Zero edits
      { s: '', t: 'a', output: true }, // Insert 'a'
      { s: 'a', t: '', output: true }, // Delete 'a'
      { s: 'abc', t: 'abc', output: false }, // No edits
      { s: 'abc', t: 'ab', output: true }, // Delete 'c'
      { s: 'ab', t: 'abc', output: true }, // Insert 'c'
      { s: 'abc', t: 'adc', output: true }, // Replace 'b' with 'd'
      { s: 'abc', t: 'abcd', output: true }, // Insert 'd' at the end
      { s: 'abcd', t: 'abc', output: true }, // Delete 'd' from the end
      { s: 'abcdef', t: 'abqdef', output: true }, // Replace 'c' with 'q'
      { s: 'abcdef', t: 'abqdefg', output: false }, // Replace + Insert → more than one edit
    ];
    testCases.forEach(({ s, t, output }) => {
      const outText = output
        ? `is one edit distance from ${t}`
        : `is not one edit distance from ${t}`;
      test(`${s} ${outText}`, () => {
        expect(oneEditDistantOptimized(s, t)).toBe(output);
      });
    });
  });
});
