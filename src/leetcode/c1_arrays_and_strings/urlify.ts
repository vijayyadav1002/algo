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

const urlify = (input: string, trueLen: number): string => {
  const replacer = '%20',
    spaceCode = ' '.charCodeAt(0);
  let url = '';
  for (let i = 0; i < trueLen; i++) {
    if (input.charCodeAt(i) === spaceCode) {
      url += replacer;
    } else {
      url += input[i];
    }
  }
  return url;
};

export { urlify };
