/**
Given a string s, return true if a permutation of the string could form a palindrome.
Input: s = "code"
Output: false
Explanation: No permutation of "code" can form a palindrome.

Input: s = "aab"
Output: true
Explanation: "aba" is a palindrome.

Input: s = "carerac"
Output: true
Explanation: Possible palindrome: "racecar"

Constraints:
1 <= s.length <= 5000

s consists of lowercase and/or uppercase English letters.
*/

const palindromePermutation = (input: string): boolean => {
  input = input.toLowerCase();
  const freqCount = new Array(26).fill(0),
    offset = 'a'.charCodeAt(0),
    sLen = input.length;

  for (let i = 0; i < sLen; i++) {
    const currentChar = input.charCodeAt(i) - offset;
    if (freqCount[currentChar] > 0) {
      freqCount[currentChar]--;
    } else {
      freqCount[currentChar]++;
    }
  }
  let count = 0;
  for (let i = 0; i < freqCount.length; i++) {
    if (freqCount[i] === 0) {
      count++;
    }
  }
  return count === 26 || count === 25;
};

export { palindromePermutation };
