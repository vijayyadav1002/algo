export {};

declare global {
  interface String {
    reverse(): string;
    reverse2(): string;
    reverse3(): string;
    reverse4(): string;
  }
}

String.prototype.reverse = function (): string {
  const inArray = this.split('');
  const result = [];
  for (let index = inArray.length - 1; index >= 0; index--) {
    result.push(inArray[index]);
  }
  return result.join('');
};

String.prototype.reverse2 = function (): string {
  const inArray = this.split('');
  for (let start = 0, end = inArray.length - 1; start < end; ) {
    let tmp = inArray[start];
    inArray[start] = inArray[end];
    inArray[end] = tmp;
    start++;
    end--;
  }
  return inArray.join('');
};

String.prototype.reverse3 = function (): string {
  return this.split('').reduce((acc, value) => value + acc, '');
};

String.prototype.reverse4 = function (): string {
  const inArray = this.split('');
  for (let start = 0, end = inArray.length - 1; end > start; start++, end--) {
    let tmp = inArray[start];
    inArray[start] = inArray[end];
    inArray[end] = tmp;
  }
  return inArray.join('');
};
