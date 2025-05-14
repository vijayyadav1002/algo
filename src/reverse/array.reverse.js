// Implementing reverse() for arrays
Array.prototype.reverse = function () {
    const arr = [...this];
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

Array.prototype.reverse2 = function () {
    return this.reduce((acc, curr) => {
        acc.unshift(curr);
        return acc;
    }, []);
}


var arr = new Array(1, 2, 3, 4);

console.log(arr.reverse());
console.log(arr.reverse2());
console.log('original array: ', arr);