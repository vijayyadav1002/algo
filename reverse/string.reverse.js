String.prototype.reverse = function () {
    const inArray = this.split('');
    const result = [];
    for (let index = inArray.length - 1; index >= 0; index--) {
        result.push(inArray[index]);
    }
    return result.join('');
}

const str = new String('abcd');

console.log(str.reverse());