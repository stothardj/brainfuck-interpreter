import {Token, Lexer} from "./lexer";

class Interpreter {
  constructor(output, input) {
    this.data = new Array(30000);
    this.instr_ptr = 0;
    this.data_ptr = 0;

    this.output = output;
    this.input = input;
  }

  getData() {
    return this.data[this.data_ptr] || 0;
  }

  setData(val) {
    this.data[this.data_ptr] = val;
  }

  nextInstruction(lexer, instrs) {
    let instr;
    if (this.instr_ptr < instrs.length) {
      instr = instrs[this.instr_ptr]
    } else {
      let tok = lexer.nextToken();
      if (tok == null) return null;
      instr = tok;
      instrs.push(tok);
    }
    this.instr_ptr++;
    return instr;
  }

  skipToMatchingBrace(next_instr) {
    let depth = 1;
    while (depth) {
      const instr = next_instr();
      if (instr == null) throw new Error('No matching close brace');
      if (instr == Token.LEFT_BRACE) depth++;
      if (instr == Token.RIGHT_BRACE) depth--;
    }
  }

  eval(input) {
    const lex = new Lexer(input);
    let instrs = [];
    const next_instr = () => this.nextInstruction(lex, instrs);
    const return_stack = [];
    for(;;) {
      const instr = next_instr();
      if (instr == null) break;

      switch (instr) {
        case Token.PLUS:
          this.setData(this.getData() + 1);
          break;
        case Token.MINUS:
          this.setData(this.getData() - 1);
          break;
        case Token.LEFT_SHIFT:
          this.data_ptr--;
          break;
        case Token.RIGHT_SHIFT:
          this.data_ptr++;
          break;
        case Token.LEFT_BRACE:
          if (this.getData()) {
            return_stack.push(this.instr_ptr - 1);
          } else {
            this.skipToMatchingBrace(next_instr);
          }
          break;
        case Token.RIGHT_BRACE:
          const return_ptr = return_stack.pop();
          if (this.getData()) {
            this.instr_ptr = return_ptr;
          }
          break;
        case Token.OUTPUT:
          this.output(this.getData());
          break;
        case Token.INPUT:
          this.setData(this.input());
          break;
        default:
          throw Error('Unknown instruction ' + instr)
          break;
      }
    }
  }
}

export { Interpreter }
