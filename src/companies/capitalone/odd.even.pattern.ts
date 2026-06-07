/**
 * Find the pattern of even or odd numbers in an array.
 * If even number is followed by odd number or vice versa, return true.
 * Otherwise, return false.
 */

function hasOddEvenPattern(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if ((arr[i] % 2 === 0 && arr[i + 1] % 2 === 1) || (arr[i] % 2 === 1 && arr[i + 1] % 2 === 0)) {
      return true;
    }
  }
  return false;
}

function hasOddEvenPatternSol2(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    // sum of odd and even number is always odd
    if ((arr[i] + arr[i - 1]) % 2 === 1) return true;
  }
  return false;
}

export { hasOddEvenPattern, hasOddEvenPatternSol2 };
