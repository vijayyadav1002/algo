/** 
evaluating an expression in Reverse Polish notation (also known as postfix notation), where operands precede the operator. In other words, the operator comes after the two numbers on which it is supposed to operate.

Your task is to write a function that processes such an expression and returns the result. Remember, in a Reverse Polish Notation expression like "1 2 + 4 -", the operation is performed from left to right. This means you first add 1 and 2, and then subtract 3 from the result, getting -1 as a final result.

Assume the expression only includes + and - operators.
 */

// TODO: Define a function named evaluateReversePolishNotation that accepts an expression as a parameter

// TODO: Initialize an empty array to act as the stack

// TODO: Split the expression into tokens and iterate over them

// TODO: If the token is an operator ('+', '-'), pop the top two elements from the stack for operation

// TODO: Based on the operator, perform the appropriate operation and push the result back onto the stack

// TODO: Otherwise, treat the token as an operand and push it onto the stack

// TODO: Return the top element of the stack as the result of the expression evaluation

// Example usage
// expression = "1 2 + 4 -"
// console.log(evaluateReversePolishNotation(expression))  // Expected output: -1
// expression = "2 3 4 + -"
// console.log(evaluateReversePolishNotation(expression))  // Expected output: -5

function evaluateReversePolishNotation(expression: string): number {
  const operands = ['+', '-'];
  const input = expression.split(' ');
  let values: number[] = [];
  for (let char of input) {
    if (operands.includes(char) && values.length >= 2) {
      const last = values.pop();
      const secondLast = values.pop();
      if (char === '+') {
        values.push(secondLast! + last!);
      }
      if (char === '-') {
        values.push(secondLast! - last!);
      }
    } else if (!isNaN(parseInt(char))) {
      values.push(parseInt(char));
    }
  }
  if (values.length === 0) {
    return 0;
  }
  return values.pop()!;
}

// const expression = "2 3 4 + -";
// console.log(evaluateReversePolishNotation(expression))  // Expected output: -5

export { evaluateReversePolishNotation };
