

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Parser } from './Parser';


Deno.test('Parser', () => {



const input = `

`

let parser = new Parser()

const output = {
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

assertEquals(parser.parse(''), )

});