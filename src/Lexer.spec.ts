import { Lexer } from "./Lexer.ts";
import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import * as compilerMocks from "./mocks/compilerMocks.ts";


Deno.test("Lexer", () => {
  const tokens = Array.from(Lexer.lex(compilerMocks.input));
  const words = Array.from(Lexer.readWords(compilerMocks.input));
  assertEquals(words, compilerMocks.words);

  assertEquals(tokens, compilerMocks.tokens);
});
