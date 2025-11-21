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

  const inBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < rows && y < cols;

  // DFS from a starting numeric cell. expectOperator indicates what the next cell
  // along the path should be (true => operator, false => number).
  const dfs = (
    x: number,
    y: number,
    currentValue: number,
    lastOp: string | null,
    expectOperator: boolean,
  ) => {
    // At any time after visiting a number we can consider the current expression
    // as a valid sub-expression and update maxValue.
    maxValue = Math.max(maxValue, currentValue);

    // Try moving right and down
    const moves: Array<[number, number]> = [
      [x + 1, y],
      [x, y + 1],
    ];
    for (const [nx, ny] of moves) {
      if (!inBounds(nx, ny)) continue;
      const cell = matrix[nx][ny];

      if (expectOperator) {
        if (typeof cell === 'string' && (cell === '+' || cell === '-')) {
          // consume operator and expect a number next
          dfs(nx, ny, currentValue, cell, false);
        }
      } else {
        // expecting a number
        if (typeof cell === 'number') {
          let newValue = currentValue;
          if (lastOp === '+') newValue = currentValue + cell;
          else if (lastOp === '-') newValue = currentValue - cell;
          else newValue = cell; // Shouldn't normally happen after a starting number

          // after a number, next we expect an operator
          dfs(nx, ny, newValue, null, true);
        }
      }
    }
  };

  // Start DFS from every numeric cell (a valid expression can start anywhere)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (typeof matrix[i][j] === 'number') {
        // start with this number, next we expect an operator
        dfs(i, j, matrix[i][j] as number, null, true);
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
