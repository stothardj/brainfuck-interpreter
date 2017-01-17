
const Token = {
  PLUS : '+',
  MINUS : '-',
  LEFT_SHIFT : '<',
  RIGHT_SHIFT : '>',
  LEFT_BRACE : '[',
  RIGHT_BRACE : ']',
  OUTPUT : '.',
  INPUT : ',',
};

class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
  }

  nextToken() {
    while (this.pos < this.input.length) {
      const c = this.input[this.pos];
      this.pos++;
      if (c == '+') return Token.PLUS;
      if (c == '-') return Token.MINUS;
      if (c == '<') return Token.LEFT_SHIFT;
      if (c == '>') return Token.RIGHT_SHIFT;
      if (c == '[') return Token.LEFT_BRACE;
      if (c == ']') return Token.RIGHT_BRACE;
      if (c == '.') return Token.OUTPUT;
      if (c == ',') return Token.INPUT;
    }
    return null;
  }
}

export { Token, Lexer }
