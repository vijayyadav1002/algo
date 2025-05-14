const { palindrome } = require('./palindrome');

describe('palindrome is a function', () => {
    test('Input 1 with referrer', () => {
        const data = 'referrer';
        expect(palindrome(data)).toBe('Found Palindrome: erre');
    });

    test('Input 2 with random', () => {
        const data = 'random';
        expect(palindrome(data)).toBe('No Palindrome exists');
    });

    test('Input 3 with wow', () => {
        const data = 'wow';
        expect(palindrome(data)).toBe('No Second Palindrome exists');
    });
});