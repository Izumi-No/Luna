import { IToken as Token } from "./interfaces/IToken.ts";
import { ASTNode } from "./interfaces/IAST.ts";

export function parse(tokens: Token[]): ASTNode {
  let Program: ASTNode = {
    type: "Program",
    children: [],
  };
}

/*

const ast = {
  type: "module",
  body: [
    {
      type: "declaration",
      kind: "let",
      name: "a",
      dataType: "string",
      value: "sla",
    },
    {
      type: "function",
      name: "add",
      params: [
        { type: "param", name: "a", dataType: "number" },
        { type: "param", name: "b", dataType: "number" },
      ],
      dataType: "number",
      body: {
        type: "block",
        body: [
          {
            type: "return",
            value: {
              type: "binaryOp",
              operator: "+",
              left: { type: "identifier", name: "a" },
              right: { type: "identifier", name: "b" },
            },
          },
        ],
      },
    },
    {
      type: "declaration",
      kind: "let",
      name: "person",
      dataType: "Person",
      value: {
        type: "object",
        properties: [
          { name: "name", value: "John" },
          { name: "age", value: 20.5 },
        ],
      },
    },
  ],
};
*/
