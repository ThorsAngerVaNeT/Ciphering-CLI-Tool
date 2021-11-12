const { ArgRequiredError, ArgDuplicateError, IncorrectConfigError } = require('./errors.js');

const allowedConfig = ['C0', 'C1', 'A', 'R0', 'R1'];
const allowedArgs = ['-c', '--config', '-i', '--input', '-o', '--output'];
const shortArgs = {'--config': '-c', '--input': '-i', '--output': '-o'};

const simplifyArgs = () => {
  process.argv.forEach((element, index) => {
    if(element.startsWith('--') && shortArgs[element]) process.argv[index] = shortArgs[element];
  });
}

const isArgsOk = () => {
  simplifyArgs();
  args = process.argv.slice(2);
  if(!args.includes('-c')){
      throw new ArgRequiredError('-c (--config)');
  }

  if((new Set(args)).size !== args.length){
    throw new ArgDuplicateError();
  }

  const configVal = getValue('-c');
  const configArr = configVal.indexOf('-') ? configVal.split('-') : configVal;
  if(!configArr.every(el => (allowedConfig.includes(el)))){
    throw new IncorrectConfigError();
  }
}

const getValue = (flag) => {
  const flagIndex = process.argv.indexOf(flag);
  return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}

module.exports = { isArgsOk }