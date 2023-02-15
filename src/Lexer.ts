import { IToken as Token } from "./interfaces/IToken.ts";

import { signTable } from "./signTable.ts";

export class Lexer {
  static *generateLexems(input: string): Generator<string, string[]> {
    const wordList: string[] = [];
    let currentWord = "";
    let inQuotes = false;

    for (const char of input) {
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
        currentWord += char;
      } else if (inQuotes) {
        currentWord += char;
      } else if (/\s/.test(char)) {
        if (currentWord) {
          wordList.push(currentWord);
          yield currentWord;
          currentWord = "";
        }
      } else if (signTable.symbols.includes(char)) {
        if (currentWord) {
          wordList.push(currentWord);
          yield currentWord;
          currentWord = "";
        }
        wordList.push(char);
        yield char;
      } else {
        currentWord += char;
      }
    }

    if (currentWord) {
      wordList.push(currentWord);
      yield currentWord;
    }

    return wordList;
  }

  static *classifyLexems(lexemList: string[]): Generator<Token, Token[]> {
    const tokens: Token[] = [];
    for (const lexem of lexemList) {
      if (signTable.keywords.includes(lexem)) {
        tokens.push({ type: "keyword", value: lexem });
        yield { type: "keyword", value: lexem };
      } else if (signTable.operators.includes(lexem)) {
        tokens.push({ type: "operator", value: lexem });
        yield { type: "operator", value: lexem };
      } else if (signTable.symbols.includes(lexem)) {
        tokens.push({ type: "symbol", value: lexem });
        yield { type: "symbol", value: lexem };
      } else if (
        (lexem[0] === '"' && lexem[lexem.length - 1] == '"') ||
        (lexem[0] === "'" && lexem[lexem.length - 1] == "'")
      ) {
        tokens.push({ type: "string", value: lexem });
        yield { type: "string", value: lexem };
      } else if (!isNaN(Number(lexem))) {
        tokens.push({ type: "number", value: lexem });
        yield { type: "number", value: lexem };
      } else {
        tokens.push({ type: "identifier", value: lexem });
        yield { type: "identifier", value: lexem };
      }
    }

    return tokens;
  }

  static classifyLexem(lexem: string): Token {
    if (signTable.keywords.includes(lexem)) {
      return { type: "keyword", value: lexem };
    } else if (signTable.operators.includes(lexem)) {
      return { type: "operator", value: lexem };
    } else if (signTable.symbols.includes(lexem)) {
      return { type: "symbol", value: lexem };
    } else if (
      (lexem[0] === '"' && lexem[lexem.length - 1] == '"') ||
      (lexem[0] === "'" && lexem[lexem.length - 1] == "'")
    ) {
      return { type: "string", value: lexem };
    } else if (!isNaN(Number(lexem))) {
      return { type: "number", value: lexem };
    } else {
      return { type: "identifier", value: lexem };
    }
  }

  static *lex(input: string): Generator<Token, Token[]> {
    const lexemGenerator = Lexer.generateLexems(input);
    const tokens: Token[] = [];
    for (const lexem of lexemGenerator) {
      const token = Lexer.classifyLexem(lexem);
      tokens.push(token);
      yield token;
    }
    return tokens;
  }
}
