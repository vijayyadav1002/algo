/**
 * https://leetcode.com/problems/valid-anagram/
 * constraints:
 * 1 <= s.length, t.length <= 5 * 104
 * s and t consist of lowercase English letters.
 */

/**
 *
 * @param source
 * @param target
 * @returns
 */
const isAnagram = (source: string, target: string): boolean => {
  const char_map: { [key: string]: number } = {};
  if (source.length !== target.length) return false;
  for (let i = 0; i < source.length; i++) {
    const char = source.charAt(i);
    char_map[char] = (char_map?.[char] || 0) + 1;
  }
  for (let i = 0; i < target.length; i++) {
    const t_char = target.charAt(i);
    if (char_map?.[t_char]) {
      char_map[t_char] -= 1;
    } else {
      return false;
    }
  }
  return true;
};

// Complexity is O(n) since 26 is constant
const isAnagramOptimized = (source: string, target: string): boolean => {
  let chars = new Array(26).fill(0),
    matches = 0;
  const offset = 'a'.charCodeAt(0);
  if (source.length !== target.length) return false;
  for (let i = 0; i < source.length; i++) {
    chars[source[i].charCodeAt(0) - offset] += 1;
    chars[target[i].charCodeAt(0) - offset] -= 1;
  }
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === 0) matches++;
  }
  return matches === 26;
};

export { isAnagram, isAnagramOptimized };
