import { Either, right } from "../../shared/utils/either.ts";
import { lex_span } from "../bindings/bindings.ts";
//import { input } from "../../shared/mocks/compilerMocks.ts";
import { spanedToken, Token } from "../../shared/interfaces/ITokens.ts";

export class Lexer {
  static lex_span(input: string): Either<unknown, Token[]> {
    const regexForParentesis = /^([^()]+)\(([^()]*)\)$/;
    const regexWithoutParentesis = /^([^()]+)$/;
    const regexForInnerQuotes = /^"([^()]+)"$/;
    let line = 1;

    const rawTokens: spanedToken[] = JSON.parse(lex_span(input));

    const tokens: Token[] = [];

    for (const spanedToken of rawTokens) {
      let match = spanedToken["token"].match(regexForParentesis);

      if (!match?.[2]) {
        match = spanedToken["token"].match(regexWithoutParentesis);
      }

      if (match?.[1]) {
        if (match?.[1] !== "Newline") {
          tokens.push({
            type: match?.[1],
            line: line,
            range: [spanedToken["range"]["start"], spanedToken["range"]["end"]],
            value: match?.[2]
              ? match?.[2].replace(/\\/g, "").match(regexForInnerQuotes)?.[1]
                ? match?.[2].replace(/\\/g, "").match(regexForInnerQuotes)?.[1]
                : match?.[2].replace(/\\/g, "")
              : undefined,
          });
        }
        if (match?.[1] == "Newline") {
          line++;
          continue;
        }
      }
    }
    return right(tokens);
  }
}
