const path = require('path');
const spawn = require('child_process').spawn;
const concat = require('concat-stream');

const INPUT_STRING = 'This is secret. Message about "_" symbol!';

beforeEach(() => {
  process.argv = [process.execPath, path.resolve('./', 'caesar-cli.js')]
});

describe('Error scenarios', () => {
  
  test('should show error Duplicated options are not allowed!', async () => {
    //1. Input: User passes the same cli argument twice; Result: Error message is shown
    process.argv.push('-c', 'C1-C1-A-R0', '--config', 'C0');
    try {
      await execute(process.argv[1], process.argv);
    } catch(err) {
      expect(err.trim()).toBe("Error: Duplicated options are not allowed!");
    }
  });

  test('should show error Missing required argument -c (--config)', async () => {
    //2. Input: User doesn't pass -c or --config argument; Result: Error message is shown
    try {
      await execute(process.argv[1], process.argv);
    } catch(err) {
      expect(err.trim()).toBe("Error: Missing required argument: -c (--config)");
    }
  });

  test('should show error for wrong input file - no such file or directory', async () => {
    //3. Input: User passes -i argument with path that doesn't exist or with no read access; Result: Error message is shown;
    process.argv.push('-c', 'C1-C1-A-R0', '-i', './README2.md');
    try {
      await execute(process.argv[1], process.argv);
    } catch(err) {
      expect(err.trim()).toBe("Error: Input file doesn't exist!");
    }
  });

  test('should show error for wrong output file - no such file or directory', async () => {
    //4. Input: User passes -o argument with path to directory that doesn't exist or with no read access; Result: Error message is shown;
    process.argv.push('-c', 'C1-C1-A-R0', '-o', './in2.md');
    try {
      await execute(process.argv[1], process.argv);
    } catch(err) {
      expect(err.trim()).toBe("Error: Output file doesn't exist!");
    }
  });

  test('should show error no such file or directory', async () => {
    //5. Input: User passes incorrent symbols in argument for --config; Result: Error message is shown;
    process.argv.push('-c', 'C1-C1-A-R0-');
    try {
      await execute(process.argv[1], process.argv);
    } catch(err) {
      expect(err.trim()).toBe("Error: Incorrect config definition!");
    }
  });
});


describe('Success scenarios', () => {
  test('should pass test because config is valid and to be encoded like first usage example from task 1', async () => {
    //1. Input: User passes correct sequence of symbols as argument for --config that matches regular expression; Result: test passed
    //2-1. Take cipher usage scenarios from first task description usage examples.
    //To keep tests isolated - input string have been set in childProcess' execute function
    process.argv.push('--config', 'C1-C1-A-R0');
    expect(await execute(process.argv[1], process.argv)).toBe('Wihx hx xlnylw. Dlxxpjl pobvw "_" xrdobe!');
  });

  test('should be encoded like second usage example from task 1', async () => {
    //2-2. Take cipher usage scenarios from first task description usage examples.
    process.argv.push('--config', 'C1-C0-A-R1-R0-A-R0-R0-C1-A');
    expect(await execute(process.argv[1], process.argv)).toBe('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
  });

  test('should be encoded like third usage example from task 1', async () => {
    //2-3. Take cipher usage scenarios from first task description usage examples.
    process.argv.push('--config', 'A-A-A-R1-R0-R0-R0-C1-C1-A');
    expect(await execute(process.argv[1], process.argv)).toBe('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
  });

  test('should be encoded like fourth usage example from task 1', async () => {
    //2-4. Take cipher usage scenarios from first task description usage examples.
    process.argv.push('--config', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1');
    expect(await execute(process.argv[1], process.argv)).toBe('This is secret. Message about "_" symbol!');
  });
});


/* implement child-process start */
createProcess = (processPath, args = [], env = null) => {
  args = [processPath].concat(args);

  return spawn('node', args, {
    env: Object.assign(
      {
        NODE_ENV: 'test'
      },
      env
    )
  });
}

execute = (processPath, args = [], opts = {}) => {
  const { env = null } = opts;
  const childProcess = createProcess(processPath, args, env);
  childProcess.stdin.setEncoding('utf-8');
  if(!args.includes('-i')){
    childProcess.stdin.write(INPUT_STRING);
    childProcess.stdin.end();
  }
  const promise = new Promise((resolve, reject) => {
    childProcess.stderr.once('data', err => {
      // console.log(err.toString());
      reject(err.toString());
    });
    childProcess.on('error', reject);
    childProcess.stdout.pipe(
      concat(result => {
        resolve(result.toString());
      })
    );
  });
  return promise;
}
/* implement child-process end */
