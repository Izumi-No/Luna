export type TokenType =
  | "keyword"
  | "operator"
  | "symbol"
  | "string"
  | "identifier";

export interface IToken {
  type: TokenType;
  value: string;
}
