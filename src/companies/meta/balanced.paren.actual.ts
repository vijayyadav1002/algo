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
  const openingParensMap: Map<string, string> = new Map<string, string>([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ]);
  const openingParensSet: Set<string> = new Set<string>(['(', '{', '[']);
  let idx = 0;
  let stack: number[] = [];
  let indicesToRemove: Set<number> = new Set<number>();
  while (idx < input.length) {
    const ch = input[idx];
    if (openingParensMap.has(ch)) {
      if (stack.length !== 0 && input[stack[stack.length - 1]] === openingParensMap.get(ch)) {
        stack.pop();
      } else {
        indicesToRemove.add(idx);
      }
    } else if (openingParensSet.has(ch)) {
      stack.push(idx);
    }
    idx++;
  }
  if (stack.length > 0) {
    for (const index of stack) {
      indicesToRemove.add(index);
    }
  }

  let result = '';
  for (let i = 0; i < input.length; i++) {
    if (!indicesToRemove.has(i)) {
      result += input[i];
    }
  }

  return result;
}

// Better approach since problem only talking about parentheses '()' not curly or square braces
export function balancedStringBetter(input: string): string {
  const indices = new Set<number>();
  const stack: number[] = [];

  // First pass: mark indices of unbalanced parentheses
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      stack.push(i);
    } else if (input[i] === ')') {
      if (stack.length === 0) {
        indices.add(i); // Unmatched closing parenthesis
      } else {
        stack.pop(); // Matched pair
      }
    }
  }

  // Add remaining unmatched opening parentheses
  while (stack.length > 0) {
    indices.add(stack.pop()!);
  }

  // Build result string excluding marked indices
  let result = '';
  for (let i = 0; i < input.length; i++) {
    if (!indices.has(i)) {
      result += input[i];
    }
  }

  return result;
}
