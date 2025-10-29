import { evaluateReversePolishNotation } from './evaluateReversePolishNotation';

describe('evaluateReversePolishNotation', () => {
  test('evaluates simple expression', () => {
    const expression = '2 3 +';
    expect(evaluateReversePolishNotation(expression)).toBe(5);
  });

  test('evaluates expression with multiple operations', () => {
    const expression = '2 3 4 + -';
    expect(evaluateReversePolishNotation(expression)).toBe(-5);
  });
});
