const allowedConfig = ['C0', 'C1', 'A', 'R0', 'R1'];
const allowedArgs = ['-c', '--config', '-i', '--input', '-o', '--output'];

const simplifyArgs = (args) => {
  args.forEach((element, index) => {
    if(element.startsWith('--')) args[index] = '-' + element[2];
  });
  return args;
}

const isArgsOk = (args, done) => {
  args = simplifyArgs(args);
  if(!args.includes('-c')){
      return done(new Error('Config option (-c, --config) is required!'));
  }

  if((new Set(args)).size !== args.length){
      return done(new Error('Duplicated options are not allowed!'));
  }

  const configArr = getValue('-c').split('-');
  if(!configArr.every(el => (allowedConfig.includes(el)))){
    return done(new Error('Incorrect config definition!'));
  }
}

const getValue = (flag) => {
  const flagIndex = process.argv.indexOf(flag);
  return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}

module.exports = {isArgsOk}