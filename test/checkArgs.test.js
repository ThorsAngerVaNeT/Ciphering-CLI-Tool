const { expect } = require("@jest/globals");
const { isArgsOk, getValue } = require('../src/checkArgs.js');
const { ArgRequiredError, ArgDuplicateError, IncorrectConfigError} = require('../src/errors.js');

describe('Caesar Cipher CLI checkArgs isArgsOk Tests', () => {
  test('should throw error Duplicated options are not allowed', () => {
    //Input: User passes the same cli argument twice; Result: Error message is shown
    process.argv = ['folder-path', 'file-path', '-c', 'C1-C1-A-R0', '--config', 'C0'];
    try {
      isArgsOk();
    } catch (error) {
      expect(error).toEqual(new ArgDuplicateError());
    }
  });

  test('should throw error Missing required argument -c (--config)', () => {
    //Input: User doesn't pass -c or --config argument; Result: Error message is shown
    process.argv = ['folder-path', 'file-path'];
    try {
      isArgsOk();
    } catch (error) {
      expect(error).toEqual(new ArgRequiredError('-c (--config)'));
    }
  });

  test('should throw error Incorrect config definition', () => {
    process.argv = ['folder-path', 'file-path', '-c', 'C1-C1-A-R0-'];
    try {
      isArgsOk();
    } catch (error) {
      expect(error).toEqual(new IncorrectConfigError());
    }
  });
});

describe('Caesar Cipher CLI checkArgs getValue Tests', () => {
  test('should return C1-C1-A-R0', () => {
    process.argv = ['folder-path', 'file-path', '-c', 'C1-C1-A-R0'];
    try {
      getValue('-c');
    } catch (error) {
      expect(error).toEqual('C1-C1-A-R0');
    }
  });
  test('should return null', () => {
    process.argv = ['folder-path', 'file-path', '-c', 'C1-C1-A-R0'];
    try {
      getValue('-i');
    } catch (error) {
      expect(error).toEqual(null);
    }
  });
});