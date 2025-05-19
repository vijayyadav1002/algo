// https://leetcode.com/problems/number-of-1-bits/
/**
 * @param {number} n - a positive integer
 * @return {number}
 * @description
 * The operator used in your code is called the bitwise AND operator (`&`) and the unsigned right shift operator (`>>>`).
Here’s a breakdown of the code:

```typescript
const hammingWeight = function(n: number): number {
    let sum = 0;
    while(n != 0) {
        sum += n & 1;
        n = n >>> 1;
    }
    return sum;
};
```

### Explanation
- `n & 1`: This is the bitwise AND operator. It checks if the least significant bit (rightmost bit) of `n` is 1. If it is, the result is 1; otherwise, it is 0. This is used to count if the current bit is set (1).
- `n >>> 1`: This is the unsigned right shift operator. It shifts all bits of `n` one position to the right, filling the leftmost bit with 0. This effectively divides `n` by 2 and discards the least significant bit.

### How the code works

1. Initialize `sum` to 0.
2. While `n` is not 0:
   - Add `n & 1` to `sum` (this adds 1 if the current bit is set).
   - Shift `n` right by 1 bit using `n >>> 1`.
3. Repeat until all bits have been checked.
4. Return `sum`, which is the number of 1 bits in the binary representation of `n`.

This function is commonly used to count the number of set bits (also called the Hamming weight or population count) in an integer.
 */
const hammingWeight = function (n: number): number {
  let sum = 0;
  while (n != 0) {
    sum += n & 1;
    n = n >>> 1;
  }
  return sum;
};

/**
 *  Optimized version of the Hamming weight function using Brian Kernighan's algorithm.
    This algorithm repeatedly clears the least significant bit set to 1 until the number becomes 0.
    Brian Kernighan's Algorithm
    Brian Kernighan's algorithm is an efficient way to count the number of set bits (1s) in a binary number. The algorithm is notable for its simplicity and elegance.

    How it Works
    The algorithm repeatedly performs an AND operation of n with (n-1) until n becomes 0. Each iteration clears the rightmost set bit.

    Key Properties
    Time complexity: O(number of set bits)
    More efficient than naive approach of checking each bit
    Works by only iterating over set bits rather than all bits
    n = 13 (1101 in binary)
    Steps:
    1. 1101 & 1100 = 1100
    2. 1100 & 1011 = 1000
    3. 1000 & 0111 = 0000
    Count = 3 (which is correct as 13 has three 1s in binary)
 */
const hummingWeightBrainKernighanAlgo = (n: number): number => {
  let count = 0;
  while (n > 0) {
    n &= n - 1;
    // or n = n & (n - 1)
    count++;
  }
  return count;
};

export { hammingWeight, hummingWeightBrainKernighanAlgo };
