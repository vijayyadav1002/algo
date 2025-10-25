/**
 * Imagine an array that contains both integers and nested arrays, such as [1, [2, 3], [4, [5]]].
 * The weighted depth sum of this array is calculated by multiplying each integer by its depth level
 * and summing the results. For example, in the array [1, [2, 3], [4, [5]]], the integer 1 is at depth 1,
 * integers 2 and 3 are at depth 2, integer 4 is at depth 2, and integer 5 is at depth 3.
 * Therefore, the weighted depth sum would be computed as follows:
 *
 * Weighted Depth Sum = (1 * 1) + (2 * 2) + (3 * 2) + (4 * 2) + (5 * 3) = 1 + 4 + 6 + 8 + 15 = 34
 *
 * The function below calculates the weighted depth sum for such nested arrays.
 */

type NestedArray = (number | NestedArray)[];
let depth = 1;
export function weightedDepthSum(input: NestedArray): number {
  let sum = 0;
  for (let idx = 0; idx < input.length; idx++) {
    if (Array.isArray(input[idx])) {
      depth++;
      sum += weightedDepthSum(input[idx] as NestedArray);
      depth--;
    } else {
      sum += (input[idx] as number) * depth;
    }
  }
  return sum;
}

/**
 * Improved version of weightedDepthSum that:
 * 1. Eliminates global state
 * 2. Uses closure for depth tracking
 * 3. Maintains the same time complexity O(n) where n is total number of elements
 * 4. Maintains the same space complexity O(d) where d is maximum nesting depth
 * 5. Is thread-safe and reentrant
 * 6. Maintains single parameter interface
 */
export function weightedDepthSumImproved(input: NestedArray): number {
  function sumWithDepth(arr: NestedArray, depth: number): number {
    let sum = 0;

    for (const element of arr) {
      if (Array.isArray(element)) {
        sum += sumWithDepth(element, depth + 1);
      } else {
        sum += element * depth;
      }
    }

    return sum;
  }

  return sumWithDepth(input, 1);
}
