import {Interpreter} from "./interpreter";

const codeform = document.getElementById('codeform');
const outdiv = document.getElementById('output');

function output(data) {
  let out;
  // Allow certain portions of the ascii table, otherwise display data as a number
  if (data > 96 && data < 123 // uppercase letters
    || data > 64 && data < 91 // lowercase letters
    || data > 31 && data < 48 // symbols. stop before numbers since that would be confusing
    || data > 8 && data < 12 // whitespace
  ) {
    out = String.fromCharCode(data);
  } else {
    out = data;
  }
  outdiv.textContent = outdiv.textContent + out;
}

function input() {
  const input = window.prompt('Input value for script');
  return parseInt(input);
}

function runSource() {
  console.log('Running...');
  const interpreter = new Interpreter(output, input);
  const formdata = new FormData(codeform);
  const source = formdata.get('source');
  interpreter.eval(source);
  output('\n');
  console.log('Done');
}

codeform.addEventListener('submit', () => {
  runSource()

  // Don't clear the form or redirect
  event.preventDefault();
  return false;
});
