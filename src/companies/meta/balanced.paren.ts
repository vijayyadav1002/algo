/**
 * A stack can be utilized to verify if parentheses in an expression are well-matched, i.e.,
 *  every bracket has a corresponding pair. For example, parentheses in the string "()[{}]" are well-matched,
 *  while in the strings "([]()", ")()[]{}", "([)]", and "[{})" they are not.
 */

export function isBalancedParen(parenString: string) {
  const openingParens: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  let stack = [];
  let isBalanced = true;
  let idx = 0;
  while (idx < parenString.length) {
    let ch = parenString[idx];
    if (ch in openingParens) {
      if (stack.length === 0 || stack[stack.length - 1] !== openingParens[ch]) return false;
      stack.pop();
    } else {
      stack.push(ch);
    }
    idx++;
  }
  if (stack.length !== 0) {
    isBalanced = false;
  }
  return isBalanced;
}
