# Node.JS-RS-School-2021Q4 Task 1 - Ciphering CLI Tool

This is a command-line tool. It encrypts and decrypts text with Caesar's cipher (1 symbol shift), ROT-8 cipher (8 symbols shift) and Atbash cipher. The tool encrypts and decrypts only letters of latin alphabet. All other characters kept untouchable.

---

## How to install

To install this tool, you must do the following steps:

1. Download tool from this repository.
2. Run the command line and go to the tool folder.
3. Install dependepncies by entering the command "npm install" or "npm i" and wait command to complete.

---

## How to use

After installation to start the tool, into the tool folder, run command "node caesar-cli [options]", where "[options]" are command line arguments that set tool operation (short alias and full name):

- -c, --config: config for ciphers
- -i, --input: a path to input file
- -o, --output: a path to output file

Config is a mandatory option. It's a string with pattern {XY(-)}n, where:

- X is a cipher mark:
  - C is for Caesar cipher (with shift 1)
  - A is for Atbash cipher
  - R is for ROT-8 cipher
- Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
  - 1 is for encoding
  - 0 is for decoding

For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

If the input file option is missed, then you should provide text in command line.

If the output file option is missed, then tool will output proceded text to command line.

You can terminate tool by pressing Ctrl+C.

---

## Usage example

    $ node caesar-cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "\_" nhteru!
