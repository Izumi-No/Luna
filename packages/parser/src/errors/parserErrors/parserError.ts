import { IParserError } from "../interfaces/IParserError.ts";

export class ParserError extends Error implements IParserError {
  constructor(message: string, public readonly type: string) {
    super(message);
    this.name = "ParserError";
  }
}
