import { IToken as Token } from "./interfaces/IToken.ts";
import { ASTNode } from "./interfaces/IAST.ts";

export function parse(tokens: Token[]): ASTNode {
  let Program: ASTNode = {
    type: "Program",
    children: [],
  };
}


