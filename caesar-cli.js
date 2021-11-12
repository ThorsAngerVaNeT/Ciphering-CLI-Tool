const { stdout, stdin, stderr, exit } = process;
const fs = require('fs');
const checkArgs = require('./src/checkArgs.js');

try {
  checkArgs.isArgsOk();
}
catch (e){
  stderr.write('Error: ' + e.message);
  exit(1);
}
