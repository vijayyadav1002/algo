import { fibonacci } from './fib.official';

describe('Fibonacci', () => {
  it('should return 0 for fib(0)', () => {
    expect(fibonacci(0)).toBe(0);
  });

  it('should return 1 for fib(1)', () => {
    expect(fibonacci(1)).toBe(1);
  });

  it('should return 1 for fib(2)', () => {
    expect(fibonacci(2)).toBe(1);
  });

  it('should return 2 for fib(3)', () => {
    expect(fibonacci(3)).toBe(2);
  });

  it('should return 3 for fib(4)', () => {
    expect(fibonacci(4)).toBe(3);
  });

  it('should return 5 for fib(5)', () => {
    expect(fibonacci(5)).toBe(5);
  });

  it('should return 8 for fib(6)', () => {
    expect(fibonacci(6)).toBe(8);
  });

  it('should return 13 for fib(7)', () => {
    expect(fibonacci(7)).toBe(13);
  });
});
