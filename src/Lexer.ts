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
  "module",
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

/*export class Lexer {
  public readonly words: string[] = [];
  public readonly tokens: Token[] = [];

  constructor(input: string) {
    this.words = Array.from(this.ReadWords(input));
    this.tokens = this.lex(this.words);
  }

  private ReadWords(input: string): string[] {
    let sla = /(?=([^'"]*['"][^'"]*['"])*[^'"]*$)(?<!\\)(\n)/gm;
    let inputArray = input.split("");
    const wordlist: string[] = [];

    for (let i = 0; i < inputArray.length; i++) {
      let word = "";
      if (inputArray[i] === " ") continue;

      if (inputArray[i] === '"') {
        word += inputArray[i];
        i++;
        while (inputArray[i] !== '"') {
          word += inputArray[i];
          i++;
        }
        word += inputArray[i];
        wordlist.push(word);
      }
      if (inputArray[i] === "'") {
        word += inputArray[i];
        i++;
        while (inputArray[i] !== "'") {
          word += inputArray[i];
          i++;
        }
        word += inputArray[i];
        wordlist.push(word);
      }

      if (symbols.includes(inputArray[i])) {
        wordlist.push(inputArray[i]);
        continue;
      }

      for (const symbol of symbols) {
        if (inputArray[i] === symbol) {
          wordlist.push(symbol);
        }
        if (word.includes(symbol) && word !== symbol) {
          // verifica se o símbolo está no inicio da palavra
          if (word.indexOf(symbol) === 0) {
            wordlist.push(symbol);
            word = word.replace(symbol, "");
          }
          // verifica se o símbolo está no fim da palavra
          if (word.indexOf(symbol) === word.length - 1) {
            wordlist.push(word.replace(symbol, ""));
            wordlist.push(symbol);
            word = "";
          }
          // verifica se o símbolo está no meio da palavra
          if (word.indexOf(symbol) > 0) {
            wordlist.push(word.slice(0, word.indexOf(symbol)));
            wordlist.push(symbol);
            word = word.slice(word.indexOf(symbol) + 1);
          }
        }
      }
    }
    return wordlist;
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
      } else if (!isNaN(Number(word))) {
        tokens.push({ type: "number", value: word });
      } else {
        tokens.push({ type: "identifier", value: word });
      }
    }

    return tokens;
  }
}

const a = new Lexer(`module test

let a: string = "sla"

  


  struct Person {
    name: string
    age: number
  }

`);

console.log(a.words);
*/
