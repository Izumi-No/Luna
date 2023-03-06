export const input = `
module test

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

  fn ()

  `;

export const words = [
  "module",
  "test",
  "let",
  "a",
  ":",
  "string",
  "=",
  '"sla"',
  "fn",
  "add",
  "(",
  "a",
  ":",
  "number",
  ",",
  "b",
  ":",
  "number",
  ")",
  ":",
  "number",
  "{",
  "return",
  "a",
  "+",
  "b",
  "}",
  "struct",
  "Person",
  "{",
  "name",
  ":",
  "string",
  "age",
  ":",
  "number",
  "}",
  "let",
  "person",
  ":",
  "Person",
  "=",
  "Person",
  "{",
  "name",
  ":",
  '"John"',
  ",",
  "age",
  ":",
  "20",
  ".",
  "5",
  "}",
];

export const tokens = [
  { type: "keyword", value: "module" },
  { type: "identifier", value: "test" },
  { type: "keyword", value: "let" },
  { type: "identifier", value: "a" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "string" },
  { type: "operator", value: "=" },
  { type: "string", value: '"sla"' },
  { type: "keyword", value: "fn" },
  { type: "identifier", value: "add" },
  { type: "symbol", value: "(" },
  { type: "identifier", value: "a" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "number" },
  { type: "symbol", value: "," },
  { type: "identifier", value: "b" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "number" },
  { type: "symbol", value: ")" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "number" },
  { type: "symbol", value: "{" },
  { type: "keyword", value: "return" },
  { type: "identifier", value: "a" },
  { type: "operator", value: "+" },
  { type: "identifier", value: "b" },
  { type: "symbol", value: "}" },
  { type: "keyword", value: "struct" },
  { type: "identifier", value: "Person" },
  { type: "symbol", value: "{" },
  { type: "identifier", value: "name" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "string" },
  { type: "identifier", value: "age" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "number" },
  { type: "symbol", value: "}" },
  { type: "keyword", value: "let" },
  { type: "identifier", value: "person" },
  { type: "symbol", value: ":" },
  { type: "identifier", value: "Person" },
  { type: "operator", value: "=" },
  { type: "identifier", value: "Person" },
  { type: "symbol", value: "{" },
  { type: "identifier", value: "name" },
  { type: "symbol", value: ":" },
  { type: "string", value: '"John"' },
  { type: "symbol", value: "," },
  { type: "identifier", value: "age" },
  { type: "symbol", value: ":" },
  { type: "number", value: "20" },
  { type: "symbol", value: "." },
  { type: "number", value: "5" },
  { type: "symbol", value: "}" },
];

export const AST = {
  type: "module",
  name: "test",
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
