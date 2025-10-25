/**
 * Actual question that was asked in Meta question
 * Given a string with alpha-nemeric characters and paranethesis, return a string
 * with balanced parenthese by removing the fewest characters possible.
 * You cannot add anything to the string.
 * "()" => "()"
 * "a(b)c)" => "a(bc)"
 * "(a(b(c)d)" => "a(b(c)d)"
 * "((((((" => ""
 * "(()()(" => "()()"
 */

export function balancedString(input: string): string {
  let inputToArray = input.split('');
  const openingParensMap: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '[',
  };
  let idx = 0;
  let stack: { value: string; index: number }[] = [];
  while (idx < inputToArray.length) {
    const ch = inputToArray[idx];
    if (ch in openingParensMap) {
      if (stack.length !== 0 && stack[stack.length - 1].value === openingParensMap[ch]) {
        stack.pop();
      } else {
        stack.push({
          value: ch,
          index: idx,
        });
      }
    } else if (Object.values(openingParensMap).includes(ch)) {
      stack.push({
        value: ch,
        index: idx,
      });
    }
    idx++;
  }
  if (stack.length > 0) {
    inputToArray = inputToArray.filter((val, idx) => {
      const exist = stack.find(({ index }) => index === idx);
      return !exist;
    });
  }

  return inputToArray.join('');
}
