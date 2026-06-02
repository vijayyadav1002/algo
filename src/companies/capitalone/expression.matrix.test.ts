import { evaluateExpressionMatrix } from './expression.matrix';

describe('evaluateExpressionMatrix', () => {
  test('returns 0 for empty matrix', () => {
    expect(evaluateExpressionMatrix([])).toBe(0);
  });

  test('returns the number for a single-cell matrix', () => {
    expect(evaluateExpressionMatrix([[5]])).toBe(5);
  });

  test('returns 0 when matrix has no numeric cells', () => {
    expect(evaluateExpressionMatrix([['+', '-']])).toBe(0);
  });

  test('evaluates a single-row expression', () => {
    // 1 + 2 = 3; standalone cells: 1, 2 → max is 3
    expect(evaluateExpressionMatrix([[1, '+', 2]])).toBe(3);
  });

  test('evaluates a single-column expression', () => {
    // path: 1 → (down) '+' → (down) 2 = 3
    expect(evaluateExpressionMatrix([[1], ['+'], [2]])).toBe(3);
  });

  test('picks the standalone number when subtraction produces a lower value', () => {
    // 2 - 5 = -3, but standalone 5 = 5 → max is 5
    expect(evaluateExpressionMatrix([[2, '-', 5]])).toBe(5);
  });

  test('evaluates expressions across both directions (mixed path)', () => {
    // path: (0,0)=1 → down (1,0)='+' → right (1,1)=5 → value 6
    expect(
      evaluateExpressionMatrix([
        [1, '+'],
        ['+', 5],
      ]),
    ).toBe(6);
  });

  test('3x3 example from problem description returns 9', () => {
    // valid paths include: 4+5=9, 1+3+5=9
    expect(
      evaluateExpressionMatrix([
        [1, '+', 2],
        ['-', 3, '+'],
        [4, '+', 5],
      ]),
    ).toBe(9);
  });
});
