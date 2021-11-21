const path = require("path");
const { isArgsOk, getValue } = require('../src/checkArgs.js');

beforeEach(() => {
  process.argv = [process.execPath, path.resolve('./..', 'caesar-cli.js')]
});

test('should correct config with mocking function', () => {
  process.argv.push('-c', 'C1-C1-A-R0-');
  const correctConfig = jest.fn(() => process.argv[3] = process.argv[3].slice(0, -1));
  correctConfig();
  expect(isArgsOk()).toBe(true);
});

describe('Caesar Cipher CLI checkArgs Module', () => {
  describe('isArgsOk Unit Tests', () => {
    //There are unit tests, to check tests from task2 decription see caesar-cli.test.js
    test('should throw error Duplicated options are not allowed', () => {    
    });

    test('should throw error Missing required argument -c (--config)', () => {
      expect(isArgsOk).toThrowError("Missing required argument: -c (--config)");
    });

    test('should throw error Incorrect config definition', () => {
      process.argv.push('-c', 'C1-C1-A-R0-');
      expect(isArgsOk).toThrowError(/Incorrect config definition/);
    });
    
    test('should pass test because config is valid', () => {
      process.argv.push('--config', 'C1-C1-A-R0');
      expect(isArgsOk()).toBe(true);
    });
  });

  describe('getValue Unit Tests', () => {
    test('should return C1-C1-A-R0', () => {
      process.argv.push('-c', 'C1-C1-A-R0');
      expect(getValue('-c')).toEqual('C1-C1-A-R0');
    });

    test('should return C1', () => {
      process.argv.push('-c', 'C1');
      expect(getValue('-c')).toEqual('C1');
    });

    test('should return null', () => {
      process.argv.push('-c', 'C1-C1-A-R0');
      expect(getValue('-i')).toEqual(null);
    });
  });
});
