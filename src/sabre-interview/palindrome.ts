/**
PS-palindrome-search exercise
Instructions
Using vanilla javascript, create a function that finds the second longest palindrome in a the string
First Longest Palindrome could be substring for example "referrer". Here referrer is not a palindrome but 'refer' is. So, the second longest palindrome is 'erre'.
Output of the function should be as follows
when no palindrome exists => 'No Palindrome exists'
When there is only one palindrome => 'No Second Palindrome exists'
When there is a second palindrome => 'Found Palindrome: [PALINDROME]'
*/

const isPalindrome = (data: string): boolean => {
  const length = data.length;
  for (let i = 0; i < length / 2; i++) {
    if (data[i] !== data[length - 1 - i]) {
      return false;
    }
  }
  return true;
};

const palindrome = (data: string): string => {
  if (typeof data !== 'string') {
    return 'No Palindrome exists';
  }
  const palindromes = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j <= data.length; j++) {
      const subString = data.substring(i, j);
      if (subString.length > 1 && isPalindrome(subString)) {
        palindromes.push(subString);
      }
    }
  }
  if (palindromes.length === 0) {
    return 'No Palindrome exists';
  }
  if (palindromes.length === 1) {
    return 'No Second Palindrome exists';
  }
  palindromes.sort((a, b) => b.length - a.length);
  return `Found Palindrome: ${palindromes[1]}`;
};

export { palindrome };
