import { balancedString } from '@/companies/meta/balanced.paren.actual';

describe('balancedString', () => {
  test('return balanced string', () => {
    expect(balancedString('()')).toBe('()');
    expect(balancedString('a(b)c)')).toBe('a(b)c');
    expect(balancedString('(a(b(c)d)')).toBe('a(b(c)d)');
    expect(balancedString('((((((')).toBe('');
    expect(balancedString('(()()(')).toBe('()()');
  });
});
