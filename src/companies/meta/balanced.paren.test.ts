import { isBalancedParen } from '@/companies/meta/balanced.paren';

describe('Balanced Paren', () => {
  test('Valid ones', () => {
    const balancedStrings = ['()[]{}', '([]{})', '{[()()]()}', '', '((()))', '[{()}](){}'];
    balancedStrings.forEach((str) => {
      expect(isBalancedParen(str)).toBe(true);
    });
  });
  test('Invalid ones', () => {
    const invalidStrings = ['([]()', ')()[]{}', '([)]', '[{})'];
    invalidStrings.forEach((str) => {
      console.log(`Testing invalid string: ${str}`);
      expect(isBalancedParen(str)).toBe(false);
    });
  });
});
