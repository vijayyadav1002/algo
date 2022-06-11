function memoize(func) {
    var memo = {};
    var slice = Array.prototype.slice;

    return function () {
        var args = slice.call(arguments);

        if (args in memo)
            return memo[args];
        else
            return (memo[args] = func.apply(this, args));

    }
}

// With exracting the logic outside the memoization function if memory is not the constraint
export const fibOfficial = (n) => {
    if (n < 2) {
        return n;
    }
    return fibMemoize( n - 1) + fibMemoize(n - 2);
}

export const fibMemoize = memoize(fibOfficial);


// Memoization and implementation at one place
export const fibonacci = (function () {
    const memo = {};

    function f(n) {
        if (n in memo) {
            return memo[n];
        }
        memo[n] = n < 2 ? n : f(n - 1) + f(n - 2);

        return memo[n];
    }

    return f;
})();
