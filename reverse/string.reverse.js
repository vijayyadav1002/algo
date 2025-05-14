String.prototype.reverse = function () {
    const inArray = this.split('');
    const result = [];
    for (let index = inArray.length - 1; index >= 0; index--) {
        result.push(inArray[index]);
    }
    return result.join('');
}


String.prototype.reverse2 = function () {
    const inArray = this.split('');
    for (let start = 0, end = inArray.length - 1; start < end;) {
        let tmp = inArray[start];
        inArray[start] = inArray[end];
        inArray[end] = tmp;
        start++;
        end--;
    }
    return inArray.join('');
}


const str = new String('abcd');

console.log(str.reverse());
console.log(str.reverse2());