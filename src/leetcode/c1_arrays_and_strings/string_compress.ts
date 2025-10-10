/**
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
 

Constraints:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.
*/

const stringCompress = (chars: any[]): number => {
  let char_group: any[] = [],
    char_index = 0;
  for (let i = 0; i < chars.length; i++) {
    if (char_group?.[char_index] === undefined) {
      char_group.splice(char_index, 0, [chars[i]]);
      continue;
    }
    if (chars[i] === char_group[char_index][0]) {
      if (char_group[char_index].length === 1) {
        char_group[char_index].splice(1, 0, i, 2);
      } else {
        char_group[char_index][2] = char_group[char_index][2] + 1;
      }
    } else {
      char_index++;
      char_group.splice(char_index, 0, [chars[i]]);
    }
  }
  for (let i = char_group.length - 1; i >= 0; i--) {
    if (char_group[i].length != 1) {
      const deleteElement = char_group[i][2] - 1;
      const replaceWith = char_group[i][2].toString().split('');
      chars.splice(char_group[i][1], deleteElement, ...replaceWith);
    }
  }
  return chars.length;
};

const stringCompressOptimized = (chars: any[]): number => {
  let duplicates = 0;
  let i = 0;
  const replacer = () => {
    const replaceWith = (duplicates + 1).toString().split('');
    chars.splice(i - duplicates, duplicates, ...replaceWith);
  };
  while (i < chars.length) {
    if (i === 0) {
      i++;
      continue;
    }
    if (chars[i] == chars[i - 1]) {
      duplicates++;
    } else {
      if (duplicates > 0) {
        replacer();
        i = i - duplicates + 1;
      }
      duplicates = 0;
    }
    i++;
  }
  if (duplicates > 0) {
    replacer();
  }
  return chars.length;
};

export { stringCompress, stringCompressOptimized };
