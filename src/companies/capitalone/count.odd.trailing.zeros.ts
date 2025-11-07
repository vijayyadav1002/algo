/**
 * Count odd trailing zeros of the number in an array and return the count.
 * Number can be any positive integer.
 */

function countOddTrailingZeros(arr: number[]): number {
  let count = 0;

  for (const num of arr) {
    let n = num;
    let trailingZeros = 0;

    while (n % 10 === 0) {
      trailingZeros++;
      n /= 10;
    }

    if (trailingZeros % 2 === 1) {
      count++;
    }
  }

  return count;
}

export { countOddTrailingZeros };
