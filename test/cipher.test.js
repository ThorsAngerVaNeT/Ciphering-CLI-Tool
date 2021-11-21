const { cipherCaesar, cipherAtbash } = require('../src/cipher.js');

describe('Cipher Module Tests - cipherCaesar function', () => {
  test('should encode aAa to bBb by Caesar', () => {
    expect(cipherCaesar('aAa', 1)).toBe('bBb');
  });

  test('should decode aAa to zZz by Caesar', () => {
    expect(cipherCaesar('aAa', -1)).toBe('zZz');
  });

  test('should encode a#Aa to i#Ii by ROT-8', () => {
    expect(cipherCaesar('a#Aa', 8)).toBe('i#Ii');
  });
});

describe('Cipher Module Tests - cipherAtbash function', () => {
  test('should encode aAa to zZz', () => {
    expect(cipherAtbash('aAa')).toBe('zZz');
  });

  test('should encode a1A!a to z1Z!z', () => {
    expect(cipherAtbash('a1A!a')).toBe('z1Z!z');
  });

  test('should encode aАa to zАz', () => {
    expect(cipherAtbash('aАa')).toBe('zАz');
  });
});