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

const symbols = ["(", ")", "{", "}", "[", "]", ",", ".", ":", ";"];

export class Lexer {
  public readonly words: string[] = [];
  public readonly tokens: Token[] = [];

  constructor(input: string) {
    this.words = Array.from(this.readWords(input));
    this.tokens = this.lex(this.words);
  }

  private readWords(input: string): string[] {
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
          currentWord = "";
        }
      } else if (symbols.includes(char)) {
        if (currentWord) {
          wordList.push(currentWord);
          currentWord = "";
        }
        wordList.push(char);
      } else {
        currentWord += char;
      }
    }

    if (currentWord) {
      wordList.push(currentWord);
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
      } else if (!isNaN(Number(word))) {
        tokens.push({ type: "number", value: word });
      } else {
        tokens.push({ type: "identifier", value: word });
      }
    }

    return tokens;
  }
}

const input = `module test

let a: string = "sla"

  
  fn add(a: number, b: number): number {
    return a + b
  }

  struct Person {
    name: string
    age: number
  }
  
  let person: Person = Person {
    name: "John",
    age: 20.5 
  }
  `;

const a = new Lexer(input);

console.log(a);
