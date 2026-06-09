# Matrix Algorithms — Code Reference

> Capital One focuses 6 of 57 coding questions on matrix problems. Master these 7 patterns — DFS/BFS traversal, pathfinding, in-place modification, boundary processing — and you cover everything they test.

---

## Table of Contents
1. [Number of Islands](#1-number-of-islands)
2. [Flood Fill](#2-flood-fill)
3. [Rotate Image](#3-rotate-image)
4. [Set Matrix Zeroes](#4-set-matrix-zeroes)
5. [Unique Paths](#5-unique-paths)
6. [Spiral Matrix](#6-spiral-matrix)
7. [Search a 2D Matrix II](#7-search-a-2d-matrix-ii)

---

## 1. Number of Islands

**Problem:** Given a 2D grid of `'1'`s (land) and `'0'`s (water), count the number of distinct islands (connected regions of `'1'`s).  
**Key Idea:** DFS from each unvisited `'1'`. Sink every reachable land cell (mark it `'0'`) during traversal so it's never double-counted. Each DFS call from the outer loop = one new island.

```typescript
// O(m·n) time, O(m·n) space (call stack)
function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';   // sink visited land
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === '1') { dfs(r, c); count++; }

  return count;
}

// BFS variant — avoids deep call stack on large grids
function numIslandsBFS(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1') continue;
      count++;
      const queue: [number, number][] = [[r, c]];
      grid[r][c] = '0';
      while (queue.length) {
        const [cr, cc] = queue.shift()!;
        for (const [dr, dc] of dirs) {
          const nr = cr + dr, nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
            grid[nr][nc] = '0';
            queue.push([nr, nc]);
          }
        }
      }
    }
  }
  return count;
}
```

---

## 2. Flood Fill

**Problem:** Starting from `(sr, sc)`, replace all cells reachable (4-directionally) that share the same color as the source with `newColor`.  
**Key Idea:** DFS exactly like Number of Islands, but instead of sinking, paint. Guard against `originalColor === newColor` to prevent infinite recursion.

```typescript
// O(m·n) time, O(m·n) space
function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
  const originalColor = image[sr][sc];
  if (originalColor === newColor) return image;
  const rows = image.length, cols = image[0].length;

  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== originalColor) return;
    image[r][c] = newColor;
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  };

  dfs(sr, sc);
  return image;
}
```

---

## 3. Rotate Image

**Problem:** Rotate an `n×n` matrix 90° clockwise **in-place**.  
**Key Idea:** Two steps — (1) **transpose** (swap `matrix[i][j]` and `matrix[j][i]` for `j > i`), then (2) **reverse each row**. This maps `(i, j) → (j, n-1-i)` without extra space.

```typescript
// O(n²) time, O(1) space
function rotateImage(matrix: number[][]): void {
  const n = matrix.length;

  // Step 1: transpose — reflect across main diagonal
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];

  // Step 2: reverse each row
  for (let i = 0; i < n; i++)
    matrix[i].reverse();
}

// Counter-clockwise 90° variant: reverse each row FIRST, then transpose
function rotateImageCCW(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n; i++) matrix[i].reverse();
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
}
```

---

## 4. Set Matrix Zeroes

**Problem:** If `matrix[i][j] === 0`, set the entire row `i` and column `j` to 0, **in-place**.  
**Key Idea (O(1) space):** Use the first row and first column as marker arrays. Track separately whether row-0 or col-0 themselves need zeroing. Pass 1: mark. Pass 2: apply. Pass 3: zero out row-0 / col-0 if needed.

```typescript
// O(m·n) time, O(1) space — first row/col as markers
function setZeroes(matrix: number[][]): void {
  const rows = matrix.length, cols = matrix[0].length;
  let firstRowZero = matrix[0].some(v => v === 0);
  let firstColZero = false;
  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColZero = true;

  // Pass 1: mark zero positions in first row/col
  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; }

  // Pass 2: apply marks to interior
  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;

  // Pass 3: zero first row/col if needed
  if (firstRowZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  if (firstColZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;
}
```

---

## 5. Unique Paths

**Problem:** Count distinct paths from top-left to bottom-right of an `m×n` grid, moving only right or down.  
**Key Idea:** DP. `dp[r][c]` = paths to reach cell `(r, c)` = `dp[r-1][c] + dp[r][c-1]`. First row and column are all 1s (only one way to reach them).  
**Space optimization:** Keep only one row — update left-to-right since `dp[c]` already holds the value from the row above.

```typescript
// O(m·n) time, O(n) space — single row DP
function uniquePaths(m: number, n: number): number {
  const dp = new Array(n).fill(1);
  for (let r = 1; r < m; r++)
    for (let c = 1; c < n; c++)
      dp[c] += dp[c - 1];   // dp[c] = above, dp[c-1] = left
  return dp[n - 1];
}

// With obstacles: skip cells where obstacleGrid[r][c] === 1
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length, n = obstacleGrid[0].length;
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) return 0;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (obstacleGrid[r][c] === 1) { dp[c] = 0; continue; }
      if (c > 0) dp[c] += dp[c - 1];
    }
  return dp[n - 1];
}
```

---

## 6. Spiral Matrix

**Problem:** Return all elements of an `m×n` matrix in spiral order (right → down → left → up → repeat).  
**Key Idea:** Shrink four boundaries (`top`, `bottom`, `left`, `right`) after each direction pass. Stop when `top > bottom` or `left > right`. Handle partial layers (single row/column) with direction checks inside the loop.

```typescript
// O(m·n) time, O(1) extra space (result array not counted)
function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++)       result.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++)       result.push(matrix[r][right]);
    right--;
    if (top <= bottom)
      for (let c = right; c >= left; c--)    result.push(matrix[bottom][c]);
    bottom--;
    if (left <= right)
      for (let r = bottom; r >= top; r--)    result.push(matrix[r][left]);
    left++;
  }
  return result;
}
```

---

## 7. Search a 2D Matrix II

**Problem:** Search for `target` in a matrix where each row is sorted left-to-right and each column is sorted top-to-bottom.  
**Key Idea (staircase search):** Start at **top-right corner**. If `cell > target` → move left (eliminate column). If `cell < target` → move down (eliminate row). If equal → found. Each step eliminates one row or one column → O(m+n).

```typescript
// O(m+n) time, O(1) space — staircase from top-right
function searchMatrix(matrix: number[][], target: number): boolean {
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    if (matrix[r][c] === target) return true;
    if (matrix[r][c] > target)  c--;   // too large — eliminate this column
    else                        r++;   // too small — eliminate this row
  }
  return false;
}

// Bonus: searchMatrix I — rows AND full matrix sorted (binary search on flattened)
function searchMatrixSorted(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target)  lo = mid + 1;
    else               hi = mid - 1;
  }
  return false;
}
```

---

## Quick Mental Model Map

| Pattern | When you see it | Reach for |
|---------|----------------|-----------|
| Count connected regions | "islands", "groups", "components" | DFS/BFS — sink visited cells |
| Paint/fill a region | "flood fill", "replace color", "mark region" | DFS — guard `original === new` |
| Rotate grid in-place | "90° clockwise" | transpose + reverse rows |
| Zero propagation | "set row & col to 0" | first-row/col as markers, 3-pass |
| Count paths right/down | "grid paths", "unique paths" | 1D DP, `dp[c] += dp[c-1]` |
| Traverse in spiral | "spiral order", "layer by layer" | shrink 4 boundaries per pass |
| Search sorted 2D matrix | sorted rows & cols | staircase from top-right, O(m+n) |

## Recommended Practice Order

1. Flood Fill (pure DFS skeleton)
2. Number of Islands (DFS + counter)
3. Unique Paths (DP warm-up)
4. Set Matrix Zeroes (in-place markers)
5. Rotate Image (index math)
6. Spiral Matrix (boundary shrinking)
7. Search a 2D Matrix II (staircase search)
