/**
Edit Distance is a classic dynamic programming problem that asks you to compute the minimum number of operations required to convert one string into another. This is also known as the Levenshtein Distance.
Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
You may perform the following operations on a word:
1. Insert a character
2. Delete a character
3. Replace a character

example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

example 2:
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

constraints:
0 <= word1.length, word2.length <= 500

word1 and word2 consist of lowercase English letters.
*/

const editDistance = (word1: string, word2: string): number => {
  const m = word1.length;
  const n = word2.length;

  // Create a 2D array to store the edit distances
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize the first row and column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // Deleting all characters from word1
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // Inserting all characters into word1
  }

  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation needed
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // Deletion
          dp[i][j - 1] + 1, // Insertion
          dp[i - 1][j - 1] + 1, // Replacement
        );
      }
    }
  }

  return dp[m][n];
};

const editDistanceOptimized = (word1: string, word2: string): number => {
  let m = word1.length;
  let n = word2.length;

  // If one of the strings is empty, return the length of the other string
  if (m === 0) return n;
  if (n === 0) return m;

  // Ensure word1 is the shorter string
  if (m > n) {
    [word1, word2] = [word2, word1];
    [m, n] = [n, m];
  }

  // Create a single-dimensional array to store the edit distances
  const dp: number[] = Array(n + 1).fill(0);

  // Initialize the first row
  for (let j = 0; j <= n; j++) {
    dp[j] = j; // Inserting all characters into word1
  }

  // Fill the dp array
  for (let i = 1; i <= m; i++) {
    let prev: number = dp[0]; // Store the previous value for replacement
    dp[0] = i; // Deleting all characters from word1

    for (let j = 1; j <= n; j++) {
      const temp: number = dp[j]; // Store the current value before updating

      if (word1[i - 1] === word2[j - 1]) {
        dp[j] = prev; // No operation needed
      } else {
        dp[j] = Math.min(
          dp[j - 1] + 1, // Insertion
          dp[j] + 1, // Deletion
          prev + 1, // Replacement
        );
      }
      prev = temp; // Update prev for the next iteration
    }
  }

  return dp[n];
};

export { editDistance, editDistanceOptimized };
