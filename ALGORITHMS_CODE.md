# Algorithms — Code Reference

> Every problem with its **core idea** + **cleanest implementation**. Skim the _Key Idea_ line to jog your memory; drop into the code only when you need to write it.

---

## Table of Contents
1. [Strings & Arrays](#1-strings--arrays)
   - [Is Unique](#11-is-unique)
   - [Valid Anagram](#12-valid-anagram)
   - [Palindrome Permutation](#13-palindrome-permutation)
   - [One Edit Distance](#14-one-edit-distance)
   - [Edit Distance (Levenshtein)](#15-edit-distance-levenshtein)
   - [String Compress (Run-Length Encode)](#16-string-compress-run-length-encode)
   - [URLify](#17-urlify)
   - [Permutation in String](#18-permutation-in-string)
2. [Bit Manipulation](#2-bit-manipulation)
   - [Max Consecutive Ones](#21-max-consecutive-ones)
   - [Hamming Weight (Count Set Bits)](#22-hamming-weight-count-set-bits)
   - [Count Bits 0…N](#23-count-bits-0n)
3. [Trie / Streaming](#3-trie--streaming)
   - [Stream Checker (naive)](#31-stream-checker-naive)
   - [Stream Checker (reverse Trie)](#32-stream-checker-reverse-trie)
4. [Capital One](#4-capital-one)
   - [Count Odd Trailing Zeros](#41-count-odd-trailing-zeros)
   - [Odd/Even Pattern](#42-oddeven-pattern)
   - [Max Digit Sum (Digital Root)](#43-max-digit-sum-digital-root)
   - [Expression Matrix (DFS on Grid)](#44-expression-matrix-dfs-on-grid)
5. [Meta](#5-meta)
   - [Is Balanced Parentheses](#51-is-balanced-parentheses)
   - [Make String Balanced (remove chars)](#52-make-string-balanced-remove-chars)
   - [Weighted Depth Sum](#53-weighted-depth-sum)
6. [Sabre Interview](#6-sabre-interview)
   - [Get Deep Property](#61-get-deep-property)
   - [Second Longest Palindrome](#62-second-longest-palindrome)
7. [Data Structures](#7-data-structures)
   - [Linked List, Stack, Queue, Deque](#71-linked-list-stack-queue-deque)
   - [Evaluate Reverse Polish Notation](#72-evaluate-reverse-polish-notation)
8. [Fibonacci & Memoization](#8-fibonacci--memoization)
9. [Reversal Patterns](#9-reversal-patterns)
10. [Misc](#10-misc)

---

## 1. Strings & Arrays

### 1.1 Is Unique
**Problem:** Are all characters in a string unique?  
**Key Idea:** Hash map — first seen char → `true`; hit again → not unique. Alternatively, build a seen-string and use `indexOf`.

```typescript
// O(n) time, O(n) space — hash map
const is_unique = (input: string): boolean => {
  const char_map: { [key: string]: boolean } = {};
  for (let i = 0; i < input.length; i++) {
    const value = input.charAt(i);
    if (char_map[value]) return false;
    char_map[value] = true;
  }
  return true;
};

// O(n²) time, O(n) space — no extra data structure
const is_unique_sol2 = (input: string): boolean => {
  let unique_string = '';
  for (let i = 0; i < input.length; i++) {
    const value = input.charAt(i);
    if (unique_string.indexOf(value) !== -1) return false;
    unique_string += value;
  }
  return true;
};
```

---

### 1.2 Valid Anagram
**Problem:** Do two strings contain the same characters with the same frequencies?  
**Key Idea:** Build freq map for `s`, decrement for `t`. Any key going to 0 or missing → false.  
**Optimized:** Use a `new Array(26).fill(0)` indexed by `charCode - 'a'`. Increment for `s`, decrement for `t` in one loop. If any slot ≠ 0 → not an anagram.

```typescript
// O(n) time, O(1) space (26-element array)
const isAnagramOptimized = (source: string, target: string): boolean => {
  if (source.length !== target.length) return false;
  const chars = new Array(26).fill(0);
  const offset = 'a'.charCodeAt(0);
  for (let i = 0; i < source.length; i++) {
    chars[source[i].charCodeAt(0) - offset]++;
    chars[target[i].charCodeAt(0) - offset]--;
  }
  return !chars.some(v => v !== 0);
};
```

---

### 1.3 Palindrome Permutation
**Problem:** Can any permutation of the string form a palindrome?  
**Key Idea:** A palindrome needs at most one character with an odd frequency. Use a 26-slot freq array; toggle +1/-1 (if already > 0 decrement, else increment). At the end, count how many slots are 0 — must be 25 or 26 (at most one non-zero slot).

```typescript
// O(n) time, O(1) space
const palindromePermutation = (input: string): boolean => {
  input = input.toLowerCase();
  const freqCount = new Array(26).fill(0);
  const offset = 'a'.charCodeAt(0);
  for (let i = 0; i < input.length; i++) {
    const idx = input.charCodeAt(i) - offset;
    freqCount[idx] > 0 ? freqCount[idx]-- : freqCount[idx]++;
  }
  const zeros = freqCount.filter(v => v === 0).length;
  return zeros === 26 || zeros === 25;
};
```

---

### 1.4 One Edit Distance
**Problem:** Are two strings exactly one edit apart (insert / delete / replace)?  
**Key Idea:** Check length diff first (must be ≤ 1). Walk two pointers `i`, `j`; on first mismatch set `foundDifference=true` and advance the pointer(s) depending on which string is longer. Second mismatch → false. Also handle `s === t` (0 edits) → false.

```typescript
// O(n) time, O(1) space
const oneEditDistantOptimized = (s: string, t: string): boolean => {
  if (Math.abs(s.length - t.length) > 1) return false;
  let i = 0, j = 0, foundDifference = false;
  while (i < s.length && j < t.length) {
    if (s[i] !== t[j]) {
      if (foundDifference) return false;
      foundDifference = true;
      if (s.length > t.length)      i++;         // delete from s
      else if (s.length < t.length) j++;         // insert into s
      else { i++; j++; }                         // replace
    } else { i++; j++; }
  }
  return s !== t;
};
```

---

### 1.5 Edit Distance (Levenshtein)
**Problem:** Minimum insert/delete/replace operations to turn `word1` into `word2`.  
**Key Idea:** DP table `dp[i][j]` = edit distance between first `i` chars of `word1` and first `j` chars of `word2`.
- If chars match: `dp[i][j] = dp[i-1][j-1]`
- Else: `1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])` (delete, insert, replace)

**Space optimization:** Only need the previous row → use a 1D `dp` array, carry `prev` for the diagonal value.

```typescript
// O(mn) time, O(mn) space — full table
const editDistance = (word1: string, word2: string): number => {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i-1] === word2[j-1]) {
        dp[i][j] = dp[i-1][j-1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
  }
  return dp[m][n];
};

// O(mn) time, O(min(m,n)) space — single row
const editDistanceOptimized = (word1: string, word2: string): number => {
  let m = word1.length, n = word2.length;
  if (m === 0) return n;
  if (n === 0) return m;
  if (m > n) { [word1, word2] = [word2, word1]; [m, n] = [n, m]; }

  const dp = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] = word1[i-1] === word2[j-1]
        ? prev
        : 1 + Math.min(dp[j-1], dp[j], prev); // insert, delete, replace
      prev = temp;
    }
  }
  return dp[n];
};
```

---

### 1.6 String Compress (Run-Length Encode)
**Problem:** Compress `["a","a","b","b","c","c","c"]` → `["a","2","b","2","c","3"]` **in-place**. Return new length.  
**Key Idea:** Walk the array; whenever current char differs from previous, splice the count digits in to replace the duplicates. Work forwards, track `duplicates` counter.

```typescript
// O(n) time, O(1) extra space
const stringCompressOptimized = (chars: any[]): number => {
  let duplicates = 0;
  let i = 0;
  const replacer = () => {
    // replace `duplicates` slots (the repeated chars) with the count string
    const replaceWith = (duplicates + 1).toString().split('');
    chars.splice(i - duplicates, duplicates, ...replaceWith);
  };
  while (i < chars.length) {
    if (i === 0) { i++; continue; }
    if (chars[i] === chars[i - 1]) {
      duplicates++;
    } else {
      if (duplicates > 0) {
        replacer();
        i = i - duplicates + 1;   // rewind to just after the count digits
      }
      duplicates = 0;
    }
    i++;
  }
  if (duplicates > 0) replacer();
  return chars.length;
};
```

---

### 1.7 URLify
**Problem:** Replace spaces in `"Mr John Smith    "` (true length 13) with `"%20"` in-place.  
**Key Idea:** Count spaces in `[0, trueLength)`. Compute `finalLength = trueLength + spaceCount * 2`. Walk **backwards** from `trueLength - 1` writing into `writeIndex = finalLength - 1`. Space → write `'0','2','%'` (reverse order, decrement by 3). Non-space → copy, decrement by 1.

```typescript
// O(n) time, O(n) space (char array)
function urlify(str: string, trueLength: number): string {
  const chars = str.split('');
  let spaceCount = 0;
  for (let i = 0; i < trueLength; i++) {
    if (chars[i] === ' ') spaceCount++;
  }
  let writeIndex = trueLength + spaceCount * 2 - 1;
  for (let readIndex = trueLength - 1; readIndex >= 0; readIndex--) {
    if (chars[readIndex] === ' ') {
      chars[writeIndex--] = '0';
      chars[writeIndex--] = '2';
      chars[writeIndex--] = '%';
    } else {
      chars[writeIndex--] = chars[readIndex];
    }
  }
  return chars.slice(0, trueLength + spaceCount * 2).join('');
}
```

---

### 1.8 Permutation in String
**Problem:** Does `s2` contain any permutation of `s1` as a substring?  
**Key Idea (sliding window):** Build a 26-slot diff array: `+1` for each char of `s1`, `-1` for the initial window of `s2`. Count how many slots are exactly `0` (`matches`). Slide the window: update both the outgoing-left and incoming-right slots, adjusting `matches` ±1 each time a slot crosses through 0. Return true when `matches === 26`.

```typescript
// O(n) time, O(1) space
const checkInclusionOptimized = (s1: string, s2: string): boolean => {
  if (s1.length > s2.length) return false;
  const chars = new Array(26).fill(0);
  const offset = 'a'.charCodeAt(0);
  let matches = 0;

  for (let i = 0; i < s1.length; i++) {
    chars[s1.charCodeAt(i) - offset]++;
    chars[s2.charCodeAt(i) - offset]--;
  }
  for (let i = 0; i < 26; i++) if (chars[i] === 0) matches++;
  if (matches === 26) return true;

  for (let i = s1.length; i < s2.length; i++) {
    const right = s2.charCodeAt(i) - offset;
    const left  = s2.charCodeAt(i - s1.length) - offset;

    if (chars[left] === 0) matches--;   // was balanced, about to be off
    chars[left]++;
    if (chars[left] === 0) matches++;   // now balanced again

    if (chars[right] === 0) matches--;
    chars[right]--;
    if (chars[right] === 0) matches++;

    if (matches === 26) return true;
  }
  return false;
};
```

---

## 2. Bit Manipulation

### 2.1 Max Consecutive Ones
**Problem:** Longest run of `1`s in a binary array.  
**Key Idea:** Single pass with `reduce`. Reset `currentCount` to 0 on a `0`, increment on a `1`. Keep `maxCount` updated.

```typescript
// O(n) time, O(1) space
const findMaxConsecutiveOnes = (nums: number[]): number =>
  nums.reduce(
    ({ maxCount, currentCount }, value) => {
      currentCount = value === 1 ? currentCount + 1 : 0;
      maxCount = Math.max(maxCount, currentCount);
      return { maxCount, currentCount };
    },
    { maxCount: 0, currentCount: 0 },
  ).maxCount;
```

---

### 2.2 Hamming Weight (Count Set Bits)
**Problem:** Count the number of `1` bits in an integer.  
**Key Idea 1 (basic):** `n & 1` checks LSB; `n >>> 1` shifts right. Loop until `n === 0`.  
**Key Idea 2 (Kernighan):** `n & (n-1)` clears the **lowest** set bit in one step. Loop count = number of set bits — fastest when few bits are set.

```typescript
// Basic: O(log n) — checks every bit
const hammingWeight = (n: number): number => {
  let sum = 0;
  while (n !== 0) { sum += n & 1; n >>>= 1; }
  return sum;
};

// Kernighan: O(b) where b = set bits  —  13 (1101) → 1100 → 1000 → 0000 (3 steps)
const kernighan = (n: number): number => {
  let count = 0;
  while (n > 0) { n &= n - 1; count++; }
  return count;
};
```

---

### 2.3 Count Bits 0…N
**Problem:** Return array where `result[i]` = number of `1` bits in `i`, for `i` in `[0, n]`.  
**Key Idea:** For each `i`, use bit-shift loop: `sum += num & 1; num >>>= 1`.

```typescript
// O(n log n) time, O(n) space
const countBits = (n: number): number[] => {
  const sumBits = (num: number): number => {
    let s = 0;
    while (num) { s += num & 1; num >>>= 1; }
    return s;
  };
  return Array.from({ length: n + 1 }, (_, i) => sumBits(i));
};

// Decimal ↔ Binary helpers
const getBinaryOfNumber = (n: number): number[] => {
  const bits: number[] = [];
  while (n > 0) { bits.unshift(n & 1); n >>>= 1; }
  return bits;
};

const getNumberFromBinary = (bits: number[]): number =>
  bits.reduce((acc, b, i) => acc + b * Math.pow(2, bits.length - i - 1), 0);
```

---

## 3. Trie / Streaming

### 3.1 Stream Checker (naive)
**Problem:** Given a list of words, for each character streamed via `query(ch)`, return true if any word is a suffix of the stream so far.  
**Key Idea:** Accumulate the full stream string. For each `query`, check every word: if `stream.slice(-word.length) === word` → true.

```typescript
class StreamChecker {
  private words: string[];
  private input = '';
  constructor(words: string[]) { this.words = words; }

  query(letter: string): boolean {
    this.input += letter;
    for (const word of this.words) {
      if (word.length <= this.input.length &&
          this.input.slice(this.input.length - word.length) === word) {
        return true;
      }
    }
    return false;
  }
}
```

---

### 3.2 Stream Checker (reverse Trie)
**Problem:** Same as above — optimized for large word sets.  
**Key Idea:** Insert every word **reversed** into a Trie. On each `query`, keep a sliding window of the last `maxWordLength` chars. Walk the stream **backwards** through the Trie from the root — each step is one char. If you hit a `isWord` node → match found. This turns suffix matching into prefix matching.

```typescript
class TrieNode {
  isWord = false;
  children = new Map<string, TrieNode>();
}

class StreamChecker {
  private root = new TrieNode();
  private stream: string[] = [];
  private maxLen = 0;

  constructor(words: string[]) {
    for (const word of words) {
      this.maxLen = Math.max(this.maxLen, word.length);
      let node = this.root;
      // insert reversed
      for (let i = word.length - 1; i >= 0; i--) {
        const ch = word[i];
        if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
        node = node.children.get(ch)!;
      }
      node.isWord = true;
    }
  }

  query(letter: string): boolean {
    this.stream.push(letter);
    if (this.stream.length > this.maxLen) this.stream.shift();

    let node = this.root;
    // walk stream backwards through the Trie
    for (let i = this.stream.length - 1; i >= 0; i--) {
      const ch = this.stream[i];
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
      if (node.isWord) return true;
    }
    return false;
  }
}
```

---

## 4. Capital One

### 4.1 Count Odd Trailing Zeros
**Problem:** How many numbers in an array have an **odd** count of trailing zeros?  
**Key Idea:** For each number, divide by 10 while divisible, counting how many times. If the count is odd, increment result.

```typescript
// O(n · log m) time, O(1) space
function countOddTrailingZeros(arr: number[]): number {
  let count = 0;
  for (const num of arr) {
    let n = num, zeros = 0;
    while (n % 10 === 0) { zeros++; n /= 10; }
    if (zeros % 2 !== 0) count++;
  }
  return count;
}
```

---

### 4.2 Odd/Even Pattern
**Problem:** Does the array contain any consecutive pair where one is odd and the next is even (or vice versa)?  
**Key Idea:** Walk adjacent pairs; if `arr[i] % 2 !== arr[i+1] % 2` → true.

```typescript
// O(n) time, O(1) space
function hasOddEvenPattern(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] % 2 !== arr[i + 1] % 2) return true;
  }
  return false;
}
```

---

### 4.3 Max Digit Sum (Digital Root)
**Problem:** For each number in array, repeatedly sum its digits until single digit. Return the maximum.  
**Key Idea (recursive):** Sum digits with `% 10` + `Math.floor(/ 10)` until `< 10`.  
**Key Idea (O(1) math — digital root):** `n === 0 ? 0 : (n % 9 === 0 ? 9 : n % 9)`. This is the digital root formula — any number mod 9 gives its eventual digit sum.

```typescript
// O(1) per number via digital root
const digitalRoot = (num: number): number =>
  num === 0 ? 0 : num % 9 === 0 ? 9 : num % 9;

const maxDigitSum = (arr: number[]): number =>
  arr.reduce((max, n) => Math.max(max, digitalRoot(n)), -Infinity);
```

---

### 4.4 Expression Matrix (DFS on Grid)
**Problem:** 2D matrix of numbers and `+`/`-` operators. Traverse right or down only. Evaluate all valid expressions (number op number op …) and return the maximum value.  
**Key Idea:** DFS from every numeric cell. State: `(row, col, currentValue, lastOperator, expectOperator)`. Alternate between consuming an operator cell and a number cell. After landing on any number, update `maxValue` since any partial expression is valid.

```typescript
// O(rows · cols · branches) time, O(depth) space
function evaluateExpressionMatrix(matrix: (number | string)[][]): number {
  const rows = matrix.length, cols = matrix[0].length;
  let maxValue = -Infinity;

  const dfs = (x: number, y: number, val: number, lastOp: string | null, expectOp: boolean) => {
    maxValue = Math.max(maxValue, val);
    for (const [nx, ny] of [[x+1,y],[x,y+1]]) {
      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;
      const cell = matrix[nx][ny];
      if (expectOp) {
        if (cell === '+' || cell === '-')
          dfs(nx, ny, val, cell as string, false);   // consumed operator
      } else {
        if (typeof cell === 'number') {
          const newVal = lastOp === '+' ? val + cell
                       : lastOp === '-' ? val - cell
                       : cell;
          dfs(nx, ny, newVal, null, true);            // consumed number
        }
      }
    }
  };

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      if (typeof matrix[i][j] === 'number')
        dfs(i, j, matrix[i][j] as number, null, true);

  return maxValue === -Infinity ? 0 : maxValue;
}
```

---

## 5. Meta

### 5.1 Is Balanced Parentheses
**Problem:** Are the brackets `()[]{}` balanced in a string?  
**Key Idea:** Stack. Push opening brackets. On closing bracket, peek/pop: if top doesn't match the expected opening → false. If stack is non-empty at end → false.

```typescript
// O(n) time, O(n) space
function isBalancedParen(s: string): boolean {
  const match: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch in match) {
      if (stack.length === 0 || stack[stack.length - 1] !== match[ch]) return false;
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
```

---

### 5.2 Make String Balanced (remove chars)
**Problem:** Remove the fewest characters to make parentheses balanced. Return the resulting string.  
**Key Idea:** Stack stores **indices** of unmatched `(`. On `)` with empty stack → mark index for removal. On `(` → push index. After pass, anything left in stack = unmatched openers → mark those indices too. Build result skipping all marked indices.

```typescript
// O(n) time, O(n) space
function balancedStringBetter(input: string): string {
  const toRemove = new Set<number>();
  const stack: number[] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      stack.push(i);
    } else if (input[i] === ')') {
      if (stack.length === 0) toRemove.add(i);   // unmatched close
      else stack.pop();                           // matched pair
    }
  }
  while (stack.length > 0) toRemove.add(stack.pop()!);  // unmatched opens

  return input.split('').filter((_, i) => !toRemove.has(i)).join('');
}
```

---

### 5.3 Weighted Depth Sum
**Problem:** `[1, [2, 3], [4, [5]]]` → `1×1 + 2×2 + 3×2 + 4×2 + 5×3 = 34`.  
**Key Idea:** Recursive DFS. Pass `depth` as parameter (start at 1). For arrays, recurse with `depth + 1`. For numbers, `num × depth`.

```typescript
// O(n) time, O(d) space where d = max nesting depth
type NestedArray = (number | NestedArray)[];

function weightedDepthSum(input: NestedArray): number {
  function dfs(arr: NestedArray, depth: number): number {
    let sum = 0;
    for (const el of arr) {
      sum += Array.isArray(el) ? dfs(el, depth + 1) : (el as number) * depth;
    }
    return sum;
  }
  return dfs(input, 1);
}
```

---

## 6. Sabre Interview

### 6.1 Get Deep Property
**Problem:** Access `obj["person.name.firstName"]` or `obj["arr[0].name"]` safely with a default.  
**Key Idea:** Split path on `.` (and normalize `[idx]` notation). Reduce over parts: at each step index into `acc`; return `defaultValue` if undefined.

```typescript
// O(k) time, O(k) space where k = path depth
const getDeepProperty = (data: any, key: string, defaultValue?: any): any => {
  // normalize: "a[0].b" → "a.0.b"
  const keys = key.split(/\.|\[|\]/).filter(Boolean);
  return keys.reduce((acc, curr) => {
    if (acc === defaultValue) return defaultValue;
    return acc?.[curr] !== undefined ? acc[curr] : defaultValue;
  }, data);
};
```

---

### 6.2 Second Longest Palindrome
**Problem:** Find the **second** longest palindromic substring. Return formatted message.  
**Key Idea:** Brute-force O(n³): generate all substrings `(i, j)`, check each for palindrome, collect in array. Sort by length descending. Return `[1]`.

```typescript
// O(n³) time, O(n²) space
const isPalindrome = (s: string): boolean => {
  for (let i = 0; i < s.length / 2; i++)
    if (s[i] !== s[s.length - 1 - i]) return false;
  return true;
};

const palindrome = (data: string): string => {
  const found: string[] = [];
  for (let i = 0; i < data.length; i++)
    for (let j = i + 2; j <= data.length; j++) {
      const sub = data.slice(i, j);
      if (isPalindrome(sub)) found.push(sub);
    }
  if (found.length === 0) return 'No Palindrome exists';
  if (found.length === 1) return 'No Second Palindrome exists';
  found.sort((a, b) => b.length - a.length);
  return `Found Palindrome: ${found[1]}`;
};
```

---

## 7. Data Structures

### 7.1 Linked List, Stack, Queue, Deque

**Key Ideas:**
- `LinkedList` maintains `head` + `tail` pointers. `addFront` → prepend new node. `addBack` → append to tail. `removeFront` → advance `head`.
- `LinkedListStack` wraps `LinkedList`: `push = addFront`, `pop = removeFront` (LIFO).
- `LinkedListQueue` wraps `LinkedList`: `enqueue = addBack`, `dequeue = removeFront` (FIFO).
- `ArrayDeque` uses a plain array: `addFront = unshift`, `addBack = push`, `removeFront = shift`, `removeBack = pop`.

```typescript
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length = 0;

  addFront(value: T): void {
    const node = new ListNode(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this.length++;
  }

  addBack(value: T): void {
    const node = new ListNode(value);
    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
    this.length++;
  }

  removeFront(): T | null {
    if (!this.head) return null;
    const val = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return val;
  }

  isEmpty() { return this.length === 0; }
  size()    { return this.length; }
}

// Stack (LIFO) — addFront / removeFront
class LinkedListStack<T> {
  private list = new LinkedList<T>();
  push(v: T)  { this.list.addFront(v); }
  pop()       { return this.list.removeFront(); }
  isEmpty()   { return this.list.isEmpty(); }
}

// Queue (FIFO) — addBack / removeFront
class LinkedListQueue<T> {
  private list = new LinkedList<T>();
  enqueue(v: T) { this.list.addBack(v); }
  dequeue()     { return this.list.removeFront(); }
  isEmpty()     { return this.list.isEmpty(); }
}

// Deque — both ends, backed by array
class ArrayDeque<T> {
  private items: T[] = [];
  addFront(v: T)    { this.items.unshift(v); }
  addBack(v: T)     { this.items.push(v); }
  removeFront()     { return this.items.shift(); }
  removeBack()      { return this.items.pop(); }
  peekFront()       { return this.items[0]; }
  peekBack()        { return this.items[this.items.length - 1]; }
  isEmpty()         { return this.items.length === 0; }
}
```

---

### 7.2 Evaluate Reverse Polish Notation
**Problem:** Evaluate `"1 2 + 4 -"` → `-1`. Operators are `+` and `-`.  
**Key Idea:** Stack. Split on spaces. Number → push. Operator → pop two (last, secondLast), compute `secondLast OP last`, push result.

```typescript
// O(n) time, O(n) space
function evaluateRPN(expression: string): number {
  const stack: number[] = [];
  for (const token of expression.split(' ')) {
    if (token === '+' || token === '-') {
      const b = stack.pop()!, a = stack.pop()!;
      stack.push(token === '+' ? a + b : a - b);
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack.pop() ?? 0;
}
```

---

## 8. Fibonacci & Memoization

**Key Ideas:**
- **Naive recursion** `f(n) = f(n-1) + f(n-2)` is O(2ⁿ).
- **Memoization** brings it to O(n) — cache results by key.
- **Tail recursion** passes `(n-1, n-2)` values forward, avoids re-computation without a cache.
- **Generic memoize decorator**: wrap any pure function, cache by `JSON.stringify(args)`.

```typescript
// Naive — O(2ⁿ)
const fibNaive = (n: number): number => n < 2 ? n : fibNaive(n-1) + fibNaive(n-2);

// Memoized closure — O(n)
const fibonacci = (() => {
  const memo: Record<number, number> = {};
  function f(n: number): number {
    if (n in memo) return memo[n];
    memo[n] = n < 2 ? n : f(n-1) + f(n-2);
    return memo[n];
  }
  return f;
})();

// Generic memoize decorator — works for any pure function
function memoize(fn: Function) {
  const cache: Record<string, any> = {};
  return function (this: unknown, ...args: any[]) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = fn.apply(this, args));
  };
}

// Tail-recursive — O(n) time, O(n) call stack (TCO not guaranteed in JS)
const fibTail = (n: number, a = 0, b = 1): number =>
  n === 0 ? a : fibTail(n - 1, b, a + b);
```

---

## 9. Reversal Patterns

**Key Ideas:** Four ways to reverse a string (all O(n)):
1. **Index loop backwards** → push to new array → join
2. **Two-pointer swap** in-place on char array
3. **`reduce`** prepend each char: `(acc, ch) => ch + acc`
4. **`split('').reverse().join('')`** (built-in)

```typescript
// Two-pointer (cleanest for interviews)
const reverseString = (s: string): string => {
  const arr = s.split('');
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) { [arr[lo], arr[hi]] = [arr[hi], arr[lo]]; lo++; hi--; }
  return arr.join('');
};

// reduce (functional)
const reverseReduce = (s: string): string =>
  s.split('').reduce((acc, ch) => ch + acc, '');

// Array — three variants
class LocalArray<T> extends Array<T> {
  // index-based
  reverse(): T[] {
    return [...this].reduceRight((acc: T[], v) => { acc.push(v); return acc; }, []);
  }
  // reduce unshift
  reverse2(): T[] {
    return this.reduce((acc: T[], curr) => { acc.unshift(curr); return acc; }, []);
  }
  // spread
  reverse3(): T[] {
    return this.reduce((acc: T[], curr) => [curr, ...acc], []);
  }
}
```

---

## 10. Misc

### Brute-Force Equation Solver
**Problem:** Find all non-negative integer solutions to `3x + 9y + 8z = 79`.  
**Key Idea:** Triple nested loop, try every combo.

```typescript
// O(n³) time
function findXYZ(n: number) {
  const solutions = [];
  for (let x = 0; x < n; x++)
    for (let y = 0; y < n; y++)
      for (let z = 0; z < n; z++)
        if (3*x + 9*y + 8*z === 79) solutions.push({ x, y, z });
  return solutions;
}
```

---

## Quick Mental Model Map

| Pattern | When you see it | Reach for |
|---------|----------------|-----------|
| All-unique chars / anagram | char frequency match | 26-element array, one-pass |
| Palindrome check | even/odd freq counts | toggle array, count zeros |
| Two strings ≈ same | edit distance ≤ 1 | two-pointer, track `foundDiff` |
| Min edit operations | string transform | DP `dp[i][j]`, space-opt 1D |
| Run-length encode | consecutive dupes | forward scan + splice |
| In-place write backwards | spaces → multi-char | count first, write from end |
| Substring permutation | fixed-size window match | sliding window + 26-array + `matches` counter |
| Count set bits fast | popcount | Kernighan `n &= n-1` |
| Suffix in stream | real-time word detection | reversed Trie, walk stream backwards |
| Grid traversal + expression | DFS right/down | alternating state (expect-op / expect-num) |
| Balance brackets | validate / fix parens | stack of indices |
| Nested structure sum | depth-weighted | recursive DFS, pass depth |
| Nested property access | `"a.b[0].c"` | split on `/\.\[\]/`, reduce |
| Digit root | repeated digit sum | `n % 9 === 0 ? 9 : n % 9` |
| RPN evaluation | postfix math | stack, pop two on operator |
| Memoization | repeated sub-problems | closure cache, generic decorator |
