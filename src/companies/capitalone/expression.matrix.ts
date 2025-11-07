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
  const cols = matrix[0].length;
  let maxValue = -Infinity;

  const evaluatePath = (x: number, y: number, currentValue: number, operation: string) => {
    if (x >= rows || y >= cols) return;

    const cell = matrix[x][y];

    if (typeof cell === 'number') {
      if (operation === '+') {
        currentValue += cell;
      } else if (operation === '-') {
        currentValue -= cell;
      } else {
        currentValue = cell; // First number
      }
    } else if (cell === '+' || cell === '-') {
      operation = cell;
    }

    if (x === rows - 1 && y === cols - 1) {
      maxValue = Math.max(maxValue, currentValue);
      return;
    }

    evaluatePath(x + 1, y, currentValue, operation); // Move down
    evaluatePath(x, y + 1, currentValue, operation); // Move right
  };
  evaluatePath(0, 0, 0, '');
  return maxValue;
}

export { evaluateExpressionMatrix };

console.log(
  evaluateExpressionMatrix([
    [1, '+', 2],
    ['-', 3, '+'],
    [4, '+', 5],
  ]),
); // Output: 9
