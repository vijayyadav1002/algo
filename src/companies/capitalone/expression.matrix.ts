/**
 * you have a 2D matrix, where each row has either number or '+' or '-'.
 * You need to evaluate the valid expression which possibility of sub expressions.
 * You can traverse from left to right or top to bottom only.
 * And return the maximum value of the expression.
 * Example:
 * 1. [
 *  [1, '+', 2],
 *  ['-', 3, '+'],
 *  [4, '+', 5]
 * ]
 * Possible expressions:
 * 1 + 2 = 3
 * 1 - 4 = -3
 * 2 + 5 = 7
 * 4 + 5 = 9
 * Maximum value is 9
 *  2. [
 * [1, '+', 2, '-', 3],
 * ['+', 4, '+', 5, '+'],
 * [6, '-', 7, '+', 8],
 * ['+', 9, '-', 10, '+'],
 * ]
 *
 * Possible expressions:
 * 1 + 2 - 3 = 0
 * 1 + 2 = 3
 * 1 + 6 = 7
 * 4 + 5 = 9
 * 6 - 7 + 8 = 7
 * 5 + 10 = 15
 * 9 - 10 = -1
 * Maximum value is 15
 */

function evaluateExpressionMatrix(matrix: (number | string)[][]): number {
  const rows = matrix.length;
  if (rows === 0) return 0;
  const cols = matrix[0].length;
  let maxValue = -Infinity;

  // dir: 'right' = col increases, 'down' = row increases.
  // Once chosen at the first step, direction never changes within an expression.
  const dfs = (
    x: number,
    y: number,
    currentValue: number,
    lastOp: string | null,
    expectOperator: boolean,
    dir: 'right' | 'down',
  ) => {
    maxValue = Math.max(maxValue, currentValue);

    const [nx, ny] = dir === 'right' ? [x, y + 1] : [x + 1, y];
    if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) return;
    const cell = matrix[nx][ny];

    if (expectOperator) {
      if (cell === '+' || cell === '-') {
        dfs(nx, ny, currentValue, cell as string, false, dir);
      }
    } else {
      if (typeof cell === 'number') {
        const newValue =
          lastOp === '+' ? currentValue + cell : lastOp === '-' ? currentValue - cell : cell;
        dfs(nx, ny, newValue, null, true, dir);
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (typeof matrix[i][j] === 'number') {
        maxValue = Math.max(maxValue, matrix[i][j] as number);
        dfs(i, j, matrix[i][j] as number, null, true, 'right');
        dfs(i, j, matrix[i][j] as number, null, true, 'down');
      }
    }
  }

  return maxValue === -Infinity ? 0 : maxValue;
}

export { evaluateExpressionMatrix };

console.log(
  evaluateExpressionMatrix([
    [1, '+', 2],
    ['-', 3, '+'],
    [4, '+', 5],
  ]),
); // Output: 9
