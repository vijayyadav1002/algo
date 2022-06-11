// Implementing reverse() for arrays
Array.prototype.reverse = function () {
    const arr = this.slice();
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}


var arr = new Array(1, 2, 3, 4);

console.log(arr.reverse());