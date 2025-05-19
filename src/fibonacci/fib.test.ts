import { fib2025NoMemo, fib2025Memo } from './fib';

describe('fib2025NoMemo No Memoization', () => {
  it('should return 1 for fib(1)', () => {
    expect(fib2025NoMemo(1)).toBe(1);
  });

  it('should return 1 for fib(2)', () => {
    expect(fib2025NoMemo(2)).toBe(1);
  });

  it('should return 2 for fib(3)', () => {
    expect(fib2025NoMemo(3)).toBe(2);
  });

  it('should return 3 for fib(4)', () => {
    expect(fib2025NoMemo(4)).toBe(3);
  });

  it('should return 5 for fib(5)', () => {
    expect(fib2025NoMemo(5)).toBe(5);
  });

  it('should return 8 for fib(6)', () => {
    expect(fib2025NoMemo(6)).toBe(8);
  });

  it('should return 13 for fib(7)', () => {
    expect(fib2025NoMemo(7)).toBe(13);
  });
  it('should return 40 for fib(40)', () => {
    console.time('outmemo');
    expect(fib2025NoMemo(42)).toBe(267914296);
    console.timeEnd('outmemo');
  });
});

describe('fib2025memo with Memoization', () => {
  it('should return 1 for fib(1)', () => {
    expect(fib2025Memo(1)).toBe(1);
  });

  it('should return 1 for fib(2)', () => {
    expect(fib2025Memo(2)).toBe(1);
  });

  it('should return 2 for fib(3)', () => {
    expect(fib2025Memo(3)).toBe(2);
  });

  it('should return 3 for fib(4)', () => {
    expect(fib2025Memo(4)).toBe(3);
  });

  it('should return 5 for fib(5)', () => {
    expect(fib2025Memo(5)).toBe(5);
  });

  it('should return 8 for fib(6)', () => {
    expect(fib2025Memo(6)).toBe(8);
  });

  it('should return 13 for fib(7)', () => {
    expect(fib2025Memo(7)).toBe(13);
  });
  it('should return 40 for fib(40)', () => {
    console.time('memo');
    expect(fib2025Memo(42)).toBe(267914296);
    console.timeEnd('memo');
  });
});
