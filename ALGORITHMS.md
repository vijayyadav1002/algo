# Algorithms Quick Reference

> Concise summary of every implementation in this repo. Grouped by category.

---

## Strings & Arrays — `src/leetcode/c1_arrays_and_strings/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `is_unique.ts` | `is_unique`, `is_unique_sol2` | All chars unique? (hash map vs string-concat) | O(n) / O(n²) |
| `valid_anagram.ts` | `isAnagram`, `isAnagramOptimized` | Anagram check (map vs 26-element array) | O(n) · O(1) space |
| `palindrome_permutation.ts` | `palindromePermutation` | Can any permutation form a palindrome? Count odd-freq chars | O(n) · O(1) space |
| `one_edit_distance.ts` | `oneEditDistant`, `oneEditDistantOptimized` | Are two strings exactly 1 edit apart? | O(n) · O(1) space |
| `edit_distance.ts` | `editDistance`, `editDistanceOptimized` | Levenshtein distance (DP table → two-row optimization) | O(mn) · O(min(m,n)) |
| `string_compress.ts` | `stringCompress`, `stringCompressOptimized` | Run-length encode in-place | O(n) · O(1) |
| `urlify.ts` | `urlify` | Replace spaces with `%20`, working backwards | O(n) · O(n) |
| `permutation_in_string.ts` | `checkInclusion` (3 variants) | Sliding-window permutation substring search | O(n) · O(1) |

**Key concepts:** sliding window, frequency arrays (26 chars), in-place two-pointer, DP on strings.

---

## LeetCode Misc — `src/leetcode/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `max.consecutive.ones.ts` | `findMaxConsecutiveOnes` | Longest run of 1s in binary array | O(n) · O(1) |
| `hamming.weight.ts` | `hammingWeight`, `hummingWeightBrainKernighanAlgo` | Count set bits; Brian Kernighan's trick | O(log n) / O(b) |
| `count.bits.ts` | `countBits`, `getBinaryOfNumber`, etc. | Count set bits 0…n; decimal ↔ binary conversion | O(n log n) · O(n) |
| `stream.checker.2.ts` | `StreamChecker` | Word-suffix detection in char stream (naive) | O(wk)/query |
| `stream.checker.3.ts` | `StreamChecker` | Same using **reverse Trie** for efficient suffix lookup | O(km)/query |

**Key concepts:** bit manipulation, Kernighan's algorithm, Trie (reversed), streaming.

---

## Companies — Capital One — `src/companies/capitalone/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `count.odd.trailing.zeros.ts` | `countOddTrailingZeros` | How many array numbers have an odd count of trailing zeros? | O(n log m) · O(1) |
| `odd.even.pattern.ts` | `hasOddEvenPattern` | Does array alternate odd/even (or even/odd) consecutively? | O(n) · O(1) |
| `sumdigits.max.ts` | `maxDigitSum`, `sumDigits`, `sumDigitsImproved` | Sum digits until single digit; max over array (mod-9 shortcut) | O(n log m) · O(log m) |
| `expression.matrix.ts` | `evaluateExpressionMatrix` | All valid expr results in 2D matrix (numbers & +/−), move right/down only | O(nm·branches) · O(d) |

**Key concepts:** digit root (mod 9), DFS on grid, trailing-zero counting.

---

## Companies — Meta — `src/companies/meta/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `balanced.paren.ts` | `isBalancedParen` | Are brackets balanced? (stack) | O(n) · O(n) |
| `balanced.paren.actual.ts` | `balancedString`, `balancedStringBetter` | Remove minimum chars to balance mixed brackets | O(n) · O(n) |
| `weighted.depth.sum.ts` | `weightedDepthSum`, `weightedDepthSumImproved` | Sum integers × nesting depth in nested arrays (DFS) | O(n) · O(d) |

**Key concepts:** stack for bracket matching, recursive DFS on nested structures.

---

## Sabre Interview — `src/sabre-interview/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `get-deep-property.ts` | `getDeepProperty` (3 solutions) | Safely read nested obj prop via `"a.b[0].c"` path string | O(k) · O(k) |
| `palindrome.ts` | `palindrome`, `isPalindrome` | Find second-longest palindromic substring | O(n³) · O(n²) |

**Key concepts:** path parsing (dot + bracket notation), brute-force palindrome expansion.

---

## Data Structures — `src/codesignal/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `good.stuff.ts` | `ArrayDeque`, `LinkedList`, `LinkedListStack`, `LinkedListQueue` | Deque, doubly-linked list, stack & queue backed by linked list | O(1) ops · O(n) space |
| `evaluateReversePolishNotation.ts` | `evaluateReversePolishNotation` | Evaluate postfix expression with +/− using a stack | O(n) · O(n) |

**Key concepts:** doubly linked list, stack-based RPN evaluation.

---

## Fibonacci — `src/fibonacci/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `fib.ts` | `fib`, `fib2025`, `fib2025Memo` | Fib variants: recursive, tail-recursive, memoized | O(2ⁿ) → O(n) with memo |
| `fib.official.ts` | `fibOfficial`, `fibMemoize`, `memoize` | Fib with generic memoization decorator | O(n) · O(n) |

**Key concepts:** memoization, tail recursion, higher-order memoize decorator.

---

## String Reversal — `src/reverse/`

| File | Function(s) | What it does | Complexity |
|------|-------------|-------------|-----------|
| `string.reverse.ts` | `String.reverse` (4 variants) | Reverse string: spread/split/reduce/two-pointer | O(n) · O(n) |
| `array.reverse.ts` | `LocalArray.reverse` (3 variants) | Reverse array: built-in / two-pointer / reduce | O(n) · O(n) |

---

## Utilities — `src/misc/` & `src/companies/`

| File | Function(s) | What it does |
|------|-------------|-------------|
| `misc/equation.ts` | `findXYZ` | Brute-force: all non-neg int solutions to 3x+9y+8z=79 |
| `companies/nested.directory.ts` | `toggleFolder` | Toggle open/close in recursive file-tree structure |

---

## Concept Cheat Sheet

### Sliding Window
- Fixed-size window with two frequency arrays (or maps) compared in O(1) — see `permutation_in_string`.

### Bit Manipulation
- `n & (n-1)` clears lowest set bit (Kernighan) — count bits in O(set-bits).
- `n & 1` checks parity; right-shift for each bit.

### Dynamic Programming
- Edit distance: `dp[i][j] = dp[i-1][j-1]` (match) or `1 + min(insert, delete, replace)`.
- Optimize space: only need previous row → O(min(m,n)).

### Trie
- Reverse words before inserting → suffix queries become prefix lookups.

### Stack
- Balanced brackets: push on open, pop+match on close.
- RPN: push operands, pop two on operator.

### Memoization
- Wrap any pure function: cache by serialized args — see `memoize` decorator in `fib.official.ts`.

### Digit Root
- `digitalRoot(n) = 1 + (n-1) % 9` (O(1)) — see `sumDigitsImproved`.

### DFS on Grids
- Recurse right/down; carry expression state — see `expression.matrix.ts`.
