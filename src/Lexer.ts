/*
lang input

let a: string = "sla"
*/

import { IToken as Token } from "./interfaces/IToken.ts";

const keywords = [
  "let",
  "const",
  "if",
  "else",
  "elif",
  "for",
  "return",
  "fn",
  "struct",
  "interface",
];

const operators = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "=",
  "==",
  "!=",
  ">",
  "<",
  ">=",
  "<=",
];

const symbols = ["(", ")", "{", "}", "[", "]", ",", ".", ":", ";", "->"];

export class Lexer {
  public readonly words: string[] = [];
  public readonly tokens: Token[] = [];

  constructor(input: string) {
    this.words = Array.from(this.ReadWords(input));
    this.tokens = this.lex(this.words);
  }

  private ReadWords(input: string): string[] {
    const inputSliced = input.split("");
    const wordList: string[] = [];

    for (let i = 0; i < inputSliced.length; i++) {
      if (inputSliced[i] === " ") continue;

      if (inputSliced[i] === '"') {
        let word = "";
        i++;
        while (inputSliced[i] !== '"') {
          word += inputSliced[i];
          i++;
        }
        wordList.push(`"${word}"`);
        continue;
      }

      if (inputSliced[i] === "\n") continue;

      let word = "";
      for (; i < inputSliced.length; i++) {
        if (inputSliced[i] === " ") break;
        word += inputSliced[i];
      }

      for (const symbol of symbols) {
        if (word.includes(symbol) && word !== symbol) {
          if (word.slice(0, symbol.length) === symbol) {
            // separate symbol from word if it's at the start
            wordList.push(symbol);
            word = word.slice(symbol.length);
            word = word.replace("\n", "");
            continue;
          }
          if (word.slice(-symbol.length) === symbol) {
            // separate symbol from word if it's at the end
            wordList.push(word.slice(0, -symbol.length));
            word = symbol;
            continue;
          }
          wordList.push(word.slice(0, word.indexOf(symbol)));
          wordList.push(symbol);
          word = word.slice(word.indexOf(symbol) + symbol.length);
          word = word.replace("\n", "");
          continue;
        }
      }
      word = word.replace("\n", "");

      if (word === "") continue;
      if (word.includes("\n")) continue;

      wordList.push(word);
    }

    return wordList;
  }

  lex(wordlist: string[]) {
    const tokens: Token[] = [];
    for (const word of wordlist) {
      if (keywords.includes(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (operators.includes(word)) {
        tokens.push({ type: "operator", value: word });
      } else if (symbols.includes(word)) {
        tokens.push({ type: "symbol", value: word });
      } else if (
        (word[0] === '"' && word[word.length - 1] == '"') ||
        (word[0] === "'" && word[word.length - 1] == "'")
      ) {
        tokens.push({ type: "string", value: word });
      } else {
        tokens.push({ type: "identifier", value: word });
      }
    }

    return tokens;
  }
}

const a = new Lexer(`let a: string = "sla"

  fn main() {
    return "hello world"
  }


  struct Person {
    name: string
    age: number
  }

`);

console.log(a.tokens);
