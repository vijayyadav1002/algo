// Self made function without memoization and optimized to certain degree so that its notation is O(n)
export const fib = (
  finalIndex: number,
  currentIndex: number = 0,
  n_1_val: number = 0,
  n_2_val: number = 1,
): number => {
  if (finalIndex < 2) {
    return finalIndex;
  }
  if (currentIndex === finalIndex) {
    return n_1_val + n_2_val;
  }
  const new_n_1_val = currentIndex < 2 ? 0 : n_2_val;
  const new_n_2_val = currentIndex < 2 ? 1 : n_1_val + n_2_val;
  return fib(finalIndex, currentIndex + 1, new_n_1_val, new_n_2_val);
};

export const fib2025NoMemo = (n: number): number => {
  return n < 2 ? n : fib2025NoMemo(n - 1) + fib2025NoMemo(n - 2);
};

export const fib2025 = (index: number): number => {
  return index < 2 ? index : fib2025Memo(index - 1) + fib2025Memo(index - 2);
};

export const memoizationFn = (fn: Function): Function => {
  const memo: { [key: string]: number } = {};
  return (n: number): number => {
    if (n in memo) {
      return memo[n];
    }
    memo[n] = fn(n);
    return memo[n];
  };
};

const fib2025Memo = memoizationFn(fib2025);

export { fib2025Memo };
