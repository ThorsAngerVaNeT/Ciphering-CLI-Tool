const { Readable, Transform, Writable } = require('stream');
const fs = require('fs');
const {cipherCaesar, cipherAtbash} = require('./cipher.js');

class myReadable extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    if (fs.existsSync(this.filename)){
      fs.open(this.filename,'r', (err, fd) => {
        if (err) {
          callback(err);
        } else {
          this.fd = fd;
          callback();
        }
      });
    }
    else{      
      callback(new Error(`Input file doesn't exist!`));
    }
    
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

class myWritable extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    if (fs.existsSync(this.filename)){
      fs.open(this.filename, 'a', (err, fd) => {
        if (err) {
          callback(err);
        } else {
          this.fd = fd;
          callback();
        }
      });
    }
    else{      
      callback(new Error(`Output file doesn't exist!`));
    }
  }
  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

class CTransform extends Transform {
  constructor(options) {
    super(options);
    this.encode = options;
  }
  
  _transform(chunk, encoding, callback) {
    try {
      const resultString = cipherCaesar(chunk.toString('utf8'), this.encode ? 1 : -1);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

class RTransform extends Transform {
  constructor(options) {
    super(options);
    this.encode = options;
  }
  
  _transform(chunk, encoding, callback) {
    try {
      const resultString = cipherCaesar(chunk.toString('utf8'), this.encode ? 8 : -8);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

class ATransform extends Transform {
  constructor(options) {
    super(options);
  }
  
  _transform(chunk, encoding, callback) {
    try {
      const resultString = cipherAtbash(chunk.toString('utf8'));

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}
module.exports = {myReadable, myWritable, CTransform, RTransform, ATransform}