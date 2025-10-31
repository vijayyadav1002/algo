/**
Write a method to replace all spaces in a string with '%20'.
You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the “true” length of the string.
Example:
Input:

"Mr John Smith    ", 13
The string has a length of 17 but the "true" length is 13. So only the first 13 characters should be considered: "Mr John Smith"
Output:

"Mr%20John%20Smith"
Constraints:
You are not supposed to use built-in string replacement methods in interviews.

The solution is usually expected to be done in-place if the string is represented as a character array.
*/
function urlify(str: string, trueLength: number): string {
  // Convert string to character array for in-place modification
  const chars = str.split('');

  // Count spaces in the true length portion
  let spaceCount = 0;
  for (let i = 0; i < trueLength; i++) {
    if (chars[i] === ' ') {
      spaceCount++;
    }
  }

  // Calculate the final length
  // Each space becomes '%20' (3 chars), so we add 2 extra chars per space
  let finalLength = trueLength + spaceCount * 2;

  // Work backwards from the true length
  let writeIndex = finalLength - 1;

  for (let readIndex = trueLength - 1; readIndex >= 0; readIndex--) {
    if (chars[readIndex] === ' ') {
      // Replace space with '%20'
      chars[writeIndex] = '0';
      chars[writeIndex - 1] = '2';
      chars[writeIndex - 2] = '%';
      writeIndex -= 3;
    } else {
      // Copy character as-is
      chars[writeIndex] = chars[readIndex];
      writeIndex--;
    }
  }

  // Convert back to string and return only the modified portion
  return chars.slice(0, finalLength).join('');
}

export { urlify };
