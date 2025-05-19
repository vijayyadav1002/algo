// https://leetcode.com/problems/counting-bits/submissions/

/**
 * 
 * @param {number} n 
 * @returns {number}
 */
const sumBinary = (n: number): number => {
    var sum = 0;
    while (n) {
        sum += n % 2;
        n = Math.floor(n / 2);
    }
    return sum;
};


/**
 * @param {number} n
 * @return {number[]}
 */
const countBits = (n: number): number[] => {
    const result = [];
    for (let i = 0; i <= n; i++) {
        result.push(sumBinary(i));
    }
    return result;
};

const getBinaryOfNumber = (n: number): number[] => {
    const bits: number[] = [];
    while (n > 0) {
        bits.push(n%2);
        n = Math.floor(n/2);
    }
    return bits.reverse()
}

const getNumberFromBinary = (n: number[]): number => {
    let number = 0;
    for (let i=0; i < n.length; i++) {
        number = number + (Math.pow(2, n.length - i - 1) * n[i])
    }
    return number;
}

export { countBits, getBinaryOfNumber, getNumberFromBinary }

/**
# Explain me number system in detail
# Number System
# A number system is a writing system for expressing numbers; it's a mathematical notation for representing numbers of a given set, using digits or other symbols in a consistent manner. The most common number systems are:
# 1. Decimal Number System (Base 10):
#    - Uses digits from 0 to 9.
#    - Each digit's place value is a power of 10.
#    - Example: 345 = 3 * 10^2 + 4 * 10^1 + 5 * 10^0 = 300 + 40 + 5 = 345.
# 2. Binary Number System (Base 2):
#    - Uses digits 0 and 1.
#    - Each digit's place value is a power of 2.
#    - Example: 1011 = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0 = 8 + 0 + 2 + 1 = 11.
# 3. Octal Number System (Base 8):
#    - Uses digits from 0 to 7.
#    - Each digit's place value is a power of 8.
#    - Example: 345 = 3 * 8^2 + 4 * 8^1 + 5 * 8^0 = 192 + 32 + 5 = 229.
# 4. Hexadecimal Number System (Base 16):
#    - Uses digits from 0 to 9 and letters A to F (or a to f) for values 10 to 15.
#    - Each digit's place value is a power of 16.
#    - Example: 1A3 = 1 * 16^2 + 10 * 16^1 + 3 * 16^0 = 256 + 160 + 3 = 419.

 */