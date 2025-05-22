/**
Given two strings s and t, return true if they are one edit distance apart, otherwise return false.

Input: s = "ab", t = "acb"
Output: true
Explanation: You can insert 'c' into "ab" to get "acb".

Input: s = "cab", t = "ad"
Output: false

Input: s = "1203", t = "1213"
Output: true
Explanation: You can replace '0' with '1'.

Constraints
0 <= s.length, t.length <= 10^4

s and t consist of lowercase letters, uppercase letters, digits, or symbols.
*/

const oneEditDistant = (s: string, t: string): boolean => {
  const diff = s.length - t.length;
  if (diff < -1 || diff > 1) return false;

  // delete
  if (diff === 1) {
    for (let i = 0; i < s.length; i++) {
      const deletedString = s.substring(0, i) + s.substring(i + 1, s.length);
      if (deletedString === t) {
        return true;
      }
    }
  }
  if (diff === 0) {
    if (s === t) return false;
    for (let i = 0; i < s.length; i++) {
      const replaced = s.substring(0, i) + t[i] + s.substring(i + 1, s.length);
      if (replaced === t) {
        return true;
      }
    }
  }

  if (diff === -1) {
    for (let i = 0; i < s.length; i++) {
      const insertedString = s.substring(0, i) + t[i] + s.substring(i, s.length);
      if (insertedString === t) {
        return true;
      }
    }
    for (let i = s.length; i <= t.length; i++) {
      const insertedString = s + t[i];
      if (insertedString === t) {
        return true;
      }
    }
  }
  return false;
};

export { oneEditDistant };
