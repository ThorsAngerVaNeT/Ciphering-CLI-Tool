const { stdout, stdin, stderr, exit } = process;
const fs = require('fs');
const { pipeline } = require('stream');
const checkArgs = require('./src/checkArgs.js');
const {myReadable, myWritable, CTransform, RTransform, ATransform} = require('./src/streams.js');

try {
  checkArgs.isArgsOk();
  const streamReader = (iVal = checkArgs.getValue('-i')) ? new myReadable(iVal) : stdin;
  let transformArr = [];
  checkArgs.getValue('-c').split('-').forEach(el => {
    switch (el) {
      case 'C1':
        transformArr.push(new CTransform(true));
        break;
        
      case 'C0':
        transformArr.push(new CTransform(false));
        break;

      case 'R1':
        transformArr.push(new RTransform(true));
        break;

      case 'R0':
        transformArr.push(new RTransform(false));
        break;

      case 'A':
        transformArr.push(new ATransform());
        break;
    
      default:
        break;
    }
  });
  // console.log(transformArr);
  const streamWriter = (oVal = checkArgs.getValue('-o')) ? new myWritable(oVal) : stdout;
  pipeline(
    streamReader,
    ...transformArr,
    streamWriter,
    (err) => {
      if (err) {
        stderr.write('Error: ' + err.message);
        exit(1)
      }
    }
  )
}
catch (e){
  stderr.write('Error: ' + e.message);
  exit(1);
}
