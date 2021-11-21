const path = require("path");
const { expect } = require("@jest/globals");
const { isArgsOk, getValue } = require('../src/checkArgs.js');
// const { ArgRequiredError, ArgDuplicateError, IncorrectConfigError} = require('../src/errors.js');

beforeEach(() => {
  process.argv = [process.execPath, path.resolve('./..', 'caesar-cli.js')]
});

describe('Caesar Cipher CLI checkArgs isArgsOk Tests', () => {
  test('should throw error Duplicated options are not allowed', () => {
    //1. Input: User passes the same cli argument twice; Result: Error message is shown
    process.argv.push('-c', 'C1-C1-A-R0', '--config', 'C0');
    expect(isArgsOk).toThrowError(/Duplicated options are not allowed/);
  });

  test('should throw error Missing required argument -c (--config)', () => {
    //2. Input: User doesn't pass -c or --config argument; Result: Error message is shown
    expect(isArgsOk).toThrowError("Missing required argument: -c (--config)");
  });

  test('should throw error Incorrect config definition', () => {
    //5. Input: User passes incorrent symbols in argument for --config; Result: Error message is shown;
    process.argv.push('-c', 'C1-C1-A-R0-');
    expect(isArgsOk).toThrowError(/Incorrect config definition/);
  });
});

describe('Caesar Cipher CLI checkArgs getValue Tests', () => {
  test('should return C1-C1-A-R0', () => {
    process.argv.push('-c', 'C1-C1-A-R0');
    expect(getValue('-c')).toEqual('C1-C1-A-R0');
  });
  test('should return null', () => {
    process.argv.push('-c', 'C1-C1-A-R0');
    expect(getValue('-i')).toEqual(null);
  });
});