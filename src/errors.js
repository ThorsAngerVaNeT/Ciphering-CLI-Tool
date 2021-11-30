class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError { }

class ArgRequiredError extends ValidationError {
  constructor(arg) {
    super("Missing required argument: " + arg);
    this.arg = arg;
  }
}

class ArgDuplicateError extends ValidationError {
  constructor() {
    super("Duplicated options are not allowed!");
  }
}

class IncorrectConfigError extends ValidationError {
  constructor() {
    super("Incorrect config definition!");
  }
}

module.exports = {ArgRequiredError, ArgDuplicateError, IncorrectConfigError}