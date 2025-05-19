import { is_unique, is_unique_sol2 } from './is_unique';

describe('is_unique', () => {
  test('abcde is true', () => {
    const result = is_unique('abcde');
    expect(result).toBe(true);
  });
  test('aabbcc is false', () => {
    const result = is_unique('aabbcc');
    expect(result).toBe(false);
  });
  test('abcdeabcde is false', () => {
    const result = is_unique('abcdeabcde');
    expect(result).toBe(false);
  });
});

describe('is_unique_sol2', () => {
  test('abcde is true', () => {
    const result = is_unique_sol2('abcde');
    expect(result).toBe(true);
  });
  test('aabbcc is false', () => {
    const result = is_unique_sol2('aabbcc');
    expect(result).toBe(false);
  });
  test('abcdeabcde is false', () => {
    const result = is_unique_sol2('abcdeabcde');
    expect(result).toBe(false);
  });
});
