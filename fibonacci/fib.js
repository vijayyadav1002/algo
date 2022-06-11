
// Self made function without memoization and optimized to certain degree so that its notation is O(n)
export const fib = (finalIndex, currentIndex = 0, n_1_val = 0, n_2_val = 1) => {
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