// https://leetcode.com/problems/counting-bits/submissions/

/**
 * 
 * @param {number} n 
 * @returns {number}
 */
var sumBinary = (n) => {
    var sum = 0;
    while(n) {
        sum += n % 2;
        n = Math.floor(n / 2);
    }
    return sum;
};


/**
 * @param {number} n
 * @return {number[]}
 */
 var countBits = function(n) {
    const result = [];
    for (let i = 0; i <= n; i++) {
        result.push(sumBinary(i));
    }
    return result;
};


console.log(countBits(5));