// 567. Permutation in String

// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
// In other words, one of s1's permutations is the substring of s2.
//
// Example 1:
// Input: s1 = "ab", s2 = "eidbaooo
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").
// 1 <= s1.length, s2.length <= 104
// s1 and s2 consist of lowercase English letters.

const checkInclusion = (s1: string, s2: string): boolean => {
  const s1_map: { [key: string]: number } = {};
  const s2_map: { [key: string]: number } = {};
  const s1_length = s1.length;
  const s2_length = s2.length;

  if (s1_length > s2_length) return false;

  // Build initial maps
  for (let i = 0; i < s1_length; i++) {
    s1_map[s1[i]] = (s1_map[s1[i]] || 0) + 1;
    s2_map[s2[i]] = (s2_map[s2[i]] || 0) + 1;
  }

  const areEqual = () => {
    // Check if all keys in s1_map match s2_map
    for (const key in s1_map) {
      if (s1_map[key] !== s2_map[key]) return false;
    }
    return true;
  };

  // Check initial window
  if (areEqual()) return true;

  // Slide window
  for (let i = s1_length; i < s2_length; i++) {
    const newChar = s2[i];
    const oldChar = s2[i - s1_length];

    s2_map[newChar] = (s2_map[newChar] || 0) + 1;
    s2_map[oldChar]--;

    if (s2_map[oldChar] === 0) {
      delete s2_map[oldChar];
    }

    if (areEqual()) return true;
  }

  return false;
};

const checkInclusionOptimized = (s1: string, s2: string): boolean => {
  if (s1.length > s2.length) return false;

  const chars = new Array(26).fill(0);
  const offset = 'a'.charCodeAt(0);
  let matches = 0;

  // Count initial window
  for (let i = 0; i < s1.length; i++) {
    chars[s1.charCodeAt(i) - offset]++;
    chars[s2.charCodeAt(i) - offset]--;
  }

  // Count initial matches
  for (let i = 0; i < 26; i++) {
    if (chars[i] === 0) matches++;
  }

  if (matches === 26) return true;

  // Slide window
  for (let i = s1.length; i < s2.length; i++) {
    const right = s2.charCodeAt(i) - offset;
    const left = s2.charCodeAt(i - s1.length) - offset;

    // Remove previous character
    if (chars[left] === 0) matches--;
    chars[left]++;
    if (chars[left] === 0) matches++;

    // Add new character
    if (chars[right] === 0) matches--;
    chars[right]--;
    if (chars[right] === 0) matches++;

    if (matches === 26) return true;
  }

  return matches === 26;
};

export { checkInclusion, checkInclusionOptimized };
