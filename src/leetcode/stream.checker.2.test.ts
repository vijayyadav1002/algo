import { StreamChecker } from './stream.checker.2';

describe('StreamChecker', () => {
  test('should return true for suffix match', () => {
    const streamChecker = new StreamChecker(['cd', 'f', 'kl']);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
    expect(streamChecker.query('c')).toBe(false);
    expect(streamChecker.query('d')).toBe(true);
    expect(streamChecker.query('e')).toBe(false);
    expect(streamChecker.query('f')).toBe(true);
    expect(streamChecker.query('g')).toBe(false);
    expect(streamChecker.query('h')).toBe(false);
    expect(streamChecker.query('i')).toBe(false);
  });

  test('should return false when no suffix match', () => {
    const streamChecker = new StreamChecker(['xd', 'ax', 'kl']);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
    expect(streamChecker.query('c')).toBe(false);
    expect(streamChecker.query('d')).toBe(false);
    expect(streamChecker.query('e')).toBe(false);
  });

  test('should handle single character words', () => {
    const streamChecker = new StreamChecker(['a', 'b', 'c']);
    expect(streamChecker.query('a')).toBe(true);
    expect(streamChecker.query('b')).toBe(true);
    expect(streamChecker.query('c')).toBe(true);
    expect(streamChecker.query('d')).toBe(false);
  });

  test('should handle empty words list', () => {
    const streamChecker = new StreamChecker([]);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
  });

  test('should handle large input efficiently', () => {
    const streamChecker = new StreamChecker(['a', 'aa', 'aaa', 'aaaa', 'aaaaa']);
    for (let i = 0; i < 10000; i++) {
      expect(streamChecker.query('a')).toBe(true);
    }
  });
});
