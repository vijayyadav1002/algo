import { urlify } from './urlify';

type TestCase = [string, number, string];

describe('Urlify Tests', () => {
  const testCase: TestCase[] = [
    ['Mr John Smith    ', 13, 'Mr%20John%20Smith'],
    ['  Hello World  ', 13, '%20%20Hello%20World'],
    ['HelloWorld', 10, 'HelloWorld'],
  ];
  testCase.forEach(([input, trueLen, output]: TestCase) => {
    test(`Testing ${input} with true length ${trueLen} should be ${output}`, () => {
      expect(urlify(input, trueLen)).toBe(output);
    });
  });
});
