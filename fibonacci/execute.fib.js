import { fib } from './fib.js';
import { fibOfficial, fibMemoize, fibonacci } from './fib.official.js';

const createArray = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
}

const arr = createArray(1000);


// linear time complexity
console.time('fib');
arr.forEach((item) => {
    console.log(fib(item));
});
console.timeEnd('fib');

// 2^n time complexity
console.time('fib.official');
arr.forEach((item) => {
    console.log(fibOfficial(item));
});
console.timeEnd('fib.official');


// depth of the tree time complexity
console.time('fib.official.memoize');
arr.forEach((item) => {
    console.log(fibMemoize(item));
});
console.timeEnd('fib.official.memoize');


// Another memoization technique
console.time('fib.official.another.memoize');
arr.forEach((item) => {
    console.log(fibonacci(item));
});
console.timeEnd('fib.official.another.memoize');