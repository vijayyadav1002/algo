/**
Input: nums = [1,1,0,1,1,1]
Output: 3
*/

/**
 * My Solution
 * @param {number[]} nums
 * @return {number}
 */
 const findMaxConsecutiveOnes = (nums: number[]): number => {
    return nums.reduce(({maxCount, currentCount}, value) => {
        currentCount = value === 1 ? currentCount + 1 : 0;
        maxCount = maxCount <= currentCount ? currentCount : maxCount
        return {maxCount, currentCount}
    }, {maxCount: 0, currentCount: 0}).maxCount
}

export { findMaxConsecutiveOnes }