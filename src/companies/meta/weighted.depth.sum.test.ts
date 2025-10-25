import { weightedDepthSum } from './weighted.depth.sum';

describe('weightedDepthSum', () => {
  test('calculates weighted depth sum for nested arrays', () => {
    const input = [1, [2, 3], [4, [5]]];
    const result = weightedDepthSum(input);
    expect(result).toBe(34); // (1*1) + (2*2) + (3*2) + (4*2) + (5*3) = 34
  });

  test('handles empty array', () => {
    const input: (number | (number | number[])[])[] = [];
    const result = weightedDepthSum(input);
    expect(result).toBe(0);
  });

  test('handles single level array', () => {
    const input = [1, 2, 3];
    const result = weightedDepthSum(input);
    expect(result).toBe(6); // (1*1) + (2*1) + (3*1) = 6
  });

  test('handles deeply nested arrays', () => {
    const input = [[[[1]]], 2];
    const result = weightedDepthSum(input);
    expect(result).toBe(6); // (1*4) + (2*1) = 4 + 2 = 6
  });
});
