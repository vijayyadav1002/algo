// https://leetcode.com/problems/valid-anagram/

const isAnagram = (source: string, target: string): boolean => {
  const char_map: { [key: string]: number } = {};
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

export { isAnagram };
