import { IToken as Token } from "./interfaces/IToken.ts";

interface AST {
  type: string;
  left?: AST;
  right?: AST;
  value: string;
}

function parse(tokens: Token[]): AST {}
