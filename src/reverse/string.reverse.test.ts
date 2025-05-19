import './string.reverse';

describe('String reverse 1', () => {
  const localString = new String('abc');
  test('reverse abc', () => {
    expect(localString.reverse()).toBe('cba');
    expect(localString.reverse2()).toBe('cba');
    expect(localString.reverse3()).toBe('cba');
    expect(localString.reverse4()).toBe('cba');
  });
});
