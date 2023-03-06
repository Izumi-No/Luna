import { AST, VariableDeclarationAST } from "../../shared/interfaces/IASTs.ts";
import { Token } from "../../shared/interfaces/ITokens.ts";
import { Either, left } from "../../shared/utils/either.ts";
import { ParserError } from "./errors/parserErrors/parserError.ts";

type ParserResult<A extends AST> = { updatedIndex: number; value: A };
type EitherParserResult<
  E extends ParserError & unknown,
  A extends AST
> = Either<E, ParserResult<A>>;

export class Parser {
  static parseLet(
    tokens: Token[],
    index: number
  ): EitherParserResult<ParserError, VariableDeclarationAST> {
    return left(new ParserError("Not implemented", "NotImplemented"));
  }
}
