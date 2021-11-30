const path = require("path");
const checkArgs = require('../src/checkArgs.js');

beforeEach(() => {
  process.argv = [process.execPath, path.resolve('./..', 'caesar-cli.js')]
});

describe('Caesar Cipher CLI checkArgs Module', () => {
  describe('isArgsOk Unit Tests', () => {
    //There are unit tests, to check tests from task2 decription see caesar-cli.test.js
    test('should throw error Duplicated options are not allowed', () => {
      process.argv.push('-c', 'C1-C1-A-R0', '--config', 'C0');
      expect(checkArgs.isArgsOk).toThrowError("Duplicated options are not allowed!");
    });

    test('should throw error Missing required argument -c (--config)', () => {
      expect(checkArgs.isArgsOk).toThrowError("Missing required argument: -c (--config)");
    });

    test('should throw error Incorrect config definition', () => {
      process.argv.push('-c', 'C1-C1-A-R0-');
      expect(checkArgs.isArgsOk).toThrowError(/Incorrect config definition/);
    });
    
    test('should pass test because config is valid', () => {
      process.argv.push('--config', 'C1-C1-A-R0');
      expect(checkArgs.isArgsOk()).toBe(true);
    });
  });

  describe('getValue Unit Tests', () => {
    test('should return C1-C1-A-R0', () => {
      process.argv.push('-c', 'C1-C1-A-R0');
      expect(checkArgs.getValue('-c')).toEqual('C1-C1-A-R0');
    });

    test('should return C1', () => {
      process.argv.push('-c', 'C1');
      expect(checkArgs.getValue('-c')).toEqual('C1');
    });

    test('should return null', () => {
      process.argv.push('-c', 'C1-C1-A-R0');
      expect(checkArgs.getValue('-i')).toEqual(null);
    });
  });
});

describe('Mock function implementation', () => {
  test('should correct config with mocking function', () => {
    process.argv.push('-c', 'C1-C1-A-R0-');
    checkArgs.getValue = jest.fn((arg) => {
      const flagIndex = process.argv.indexOf(arg);
      let argVal = flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
      if(argVal.substring(argVal.length-1) == "-"){
        argVal = argVal.slice(0, -1);
        process.argv[flagIndex + 1] = argVal;
      }
      return argVal;
    });
    
    expect(checkArgs.getValue('-c')).toBe('C1-C1-A-R0');
    expect(checkArgs.isArgsOk()).toBe(true);
  });
});