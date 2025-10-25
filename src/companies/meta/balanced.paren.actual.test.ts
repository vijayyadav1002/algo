import { balancedString, balancedStringBetter } from '@/companies/meta/balanced.paren.actual';

describe('balanced String', () => {
  test('return balanced string', () => {
    expect(balancedString('()')).toBe('()');
    expect(balancedString('a(b)c)')).toBe('a(b)c');
    expect(balancedString('(a(b(c)d)')).toBe('a(b(c)d)');
    expect(balancedString('((((((')).toBe('');
    expect(balancedString('(()()(')).toBe('()()');
  });
  test('return balanced string better', () => {
    expect(balancedStringBetter('()')).toBe('()');
    expect(balancedStringBetter('a(b)c)')).toBe('a(b)c');
    expect(balancedStringBetter('(a(b(c)d)')).toBe('a(b(c)d)');
    expect(balancedStringBetter('((((((')).toBe('');
    expect(balancedStringBetter('(()()(')).toBe('()()');
  });
});
