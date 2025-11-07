/***
 * Sum Digits of the Number in an array and return the max occurrence sum
 * if the sum is 2 digits keep summing until you get a single digit
 * Example: [16, 28, 39] => [1+6=7, 2+8=10=>1+0=1, 3+9=12=>1+2=3] => max is 7
 */

const sumDigits = (num: number): number => {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  if (sum >= 10) {
    return sumDigits(sum);
  }
  return sum;
};

const sumDigitsImproved = (num: number): number => {
  if (num === 0) return 0;
  return num % 9 === 0 ? 9 : num % 9;
};

const maxDigitSum = (arr: number[]): number => {
  let maxSum = -Infinity;
  for (const num of arr) {
    const currentSum = sumDigitsImproved(num);
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }
  return maxSum;
};

export { maxDigitSum };

console.log(maxDigitSum([16, 28, 39]));
