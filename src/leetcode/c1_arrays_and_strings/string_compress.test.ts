import { stringCompress, stringCompressOptimized } from './string_compress';

describe('string compress', () => {
  const testCases = [
    { s: ["a","a","b","b","c","c","c"], t: ["a","2","b","2","c","3"], output: 6 },
    { s: ["a"], t: ["a"], output: 1 },
    { s: ["a","b","b","b","b","b","b","b","b","b","b","b","b"], t: ["a","b","1","2"], output: 4 }
  ];
  const testCases2 = [
    { s: ["a","a","b","b","c","c","c"], t: ["a","2","b","2","c","3"], output: 6 },
    { s: ["a"], t: ["a"], output: 1 },
    { s: ["a","b","b","b","b","b","b","b","b","b","b","b","b"], t: ["a","b","1","2"], output: 4 }
  ];

  describe('stringCompress - Tests', () => {
    testCases.forEach(({ s, t, output }) => {
      test(`${s} should compress to ${t} with length ${output}`, () => {
        expect(stringCompress(s)).toBe(output);
      });
    });
  });
  describe('stringCompressOptimized - Tests', () => {
    testCases2.forEach(({ s, t, output }) => {
      test(`${s} should compress to ${t} with length ${output}`, () => {
        const result = stringCompressOptimized(s);
        expect(s).toEqual(t);
        expect(result).toBe(output)
      });
    });
  });
});
