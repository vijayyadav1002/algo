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

export { hasOddEvenPattern };

console.log(hasOddEvenPattern([1, 2, 3, 4]));
console.log(hasOddEvenPattern([2, 4, 6, 8]));
