export function memoize(func: Function) {
  var memo: { [key: string]: any } = {};
  var slice = Array.prototype.slice;

  return function (this: unknown) {
    var args = slice.call(arguments);
    var key = JSON.stringify(args);

    if (key in memo) return memo[key];
    else return (memo[key] = func.apply(this, args));
  };
}

// With exracting the logic outside the memoization function if memory is not the constraint
export const fibOfficial = (n: number): number => {
  if (n < 2) {
    return n;
  }
  return fibMemoize(n - 1) + fibMemoize(n - 2);
};

export const fibMemoize = memoize(fibOfficial) as (n: number) => number;

// Memoization and implementation at one place
export const fibonacci = (function () {
  const memo: Record<number, number> = {};

  function f(n: number): number {
    if (n in memo) {
      return memo[n];
    }
    memo[n] = n < 2 ? n : f(n - 1) + f(n - 2);

    return memo[n];
  }

  return f;
})();
