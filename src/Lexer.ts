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

export class Lexer {
  public readonly words: string[] = [];
  public readonly tokens: Token[] = [];

  constructor(input: string) {
    this.words = Array.from(this.readWords(input));
    this.tokens = this.lex(this.words);
  }

  private readWords(input: string) {
    const wordlist: string[] = [];
    const inputArray = input.split("");

    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] === " ") continue;
      let word = "";
      for (; i < inputArray.length && inputArray[i] !== " "; i++) {
        word += inputArray[i];
      }

      const regex = new RegExp(/\S+/g);

      word = word.replaceAll("\n", " ").trim();

      const words = regex.exec(word);
      if (words) {
        for (const word of words) {
          if (word) {
            if (!isNaN(Number(word))) {
              wordlist.push(word);
              continue;
            }

            for (const symbol of symbols) {
              if (word.includes(symbol)) {
                if (word === symbol) {
                  wordlist.push(word);
                  continue;
                }
                if (word.startsWith(symbol) && word !== symbol) {
                  wordlist.push(symbol);
                  wordlist.push(word.slice(word.indexOf(symbol) + 1));
                  continue;
                }
                if (word.endsWith(symbol) && word !== symbol) {
                  wordlist.push(word.slice(0, word.indexOf(symbol)));
                  wordlist.push(symbol);
                  continue;
                }
                // separate words if they contain a symbol

                const words = word.split(symbol);
                for (const word of words) {
                  if (word) wordlist.push(word);
                  wordlist.push(symbol);
                }
              }
            }
          }
        }
        continue;
      }

      if (word) wordlist.push(word);
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

const input = `module test

let a: string = "sla"

  


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
