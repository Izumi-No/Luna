import { Either, left, right } from "./utils/either.ts";
import { lex } from "../bindings/bindings.ts";
import { input } from "../../mocks/compilerMocks.ts";
import { Token } from "../../shared/interfaces/ITokens.ts";

export class Lexer {
  static lex(input: string): Either<unknown, Token[]> {
    const regexForParentesis = /^([^()]+)\(([^()]*)\)$/;
    const regexWithoutParentesis = /^([^()]+)$/;

    const rawTokens = lex(input).split("\n");

    const tokens: Token[] = [];

    for (const rawtoken of rawTokens) {
      let match = rawtoken.match(regexForParentesis);

      if (!match?.[2]) {
        match = rawtoken.match(regexWithoutParentesis);
      }

      if (match?.[1]) {
        tokens.push({
          type: match?.[1],
          value: match?.[2] ? match?.[2].replace(/\\/g, "") : undefined,
        });
      }
    }
    return right(tokens);
  }
}

console.log(Lexer.lex(input));
