const { stdout, stdin, stderr, exit } = process;
const fs = require('fs');
const checkArgs = require('./src/checkArgs.js');
// const streams = require('./src/streams.js');
// const caesar = require('./src/caesar.js');

const flags = process.argv.slice(2);
checkArgs.isArgsOk(flags, (error) => {
  if(error){
    stderr.write('Error: ' + error.message);
    exit(1);
  }
});



// console.log(message);
// console.log(found);
// if (!allowedFlags.includes(flag)) {
//     stdout.write('Попробуйте ещё раз запустить файл с флагом -s или -m');
//     exit();
// }
// stdout.write('Введите, пожалуйста, два числа\n');
// stdin.on('data', data => {
//     const numString = data.toString();
//     const numStringsArray = numString.split(' ');
//     const hasIncorrectLength = numStringsArray.length !== 2;
//     const hasIncorrectValues = numStringsArray.some(numStr => Number.isNaN(+numStr));
//     if (hasIncorrectLength || hasIncorrectValues) {
//         stdout.write('Нужно ввести 2 числа, разделенных пробелом');
//         exit();
//     }
//     const [firstNum, secondNum] = numStringsArray.map(numStr => +numStr);
//     if (flag === '-s') {
//         const sum = firstNum + secondNum;
//         stdout.write(`${firstNum} + ${secondNum} = ${sum}`);
//     } else {
//         const mult = firstNum * secondNum;
//         stdout.write(`${firstNum} * ${secondNum} = ${mult}`);
//     }
//     exit();
// });