/**
Input: nums = [1,1,0,1,1,1]
Output: 3
*/

/**
 * My Solution
 * @param {number[]} nums
 * @return {number}
 */
 var findMaxConsecutiveOnes = function(nums) {
    return nums.reduce(({maxCount, currentCount}, value) => {
        if (value === 1) {
            currentCount++;
        }
        if (maxCount <= currentCount) 
            maxCount = currentCount
        
        if (value === 0) 
            currentCount = 0
        
        return {maxCount, currentCount}
    }, {maxCount: 0, currentCount: 0}).maxCount
}
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1]));
console.log(findMaxConsecutiveOnes([1,0,1,1,0,1]));