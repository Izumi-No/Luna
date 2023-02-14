export type TokenType =
  | "keyword"
  | "operator"
  | "symbol"
  | "string"
  | "number"
  | "identifier";

export interface IToken {
  type: TokenType;
  value: string;
}
