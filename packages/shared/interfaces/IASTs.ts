export interface AST {
  type: string;
}

export interface BinaryExpressionAST extends AST {
  type: "BinaryExpression";
  operator: string;
  left: AST;
  right: AST;
}

export interface UnaryExpressionAST extends AST {
  type: "UnaryExpression";
  operator: string;
  argument: AST;
}

export interface LiteralAST extends AST {
  type: "Literal";
  literalType: string;
  value: string;
}

export interface IdentifierAST extends AST {
  type: "Identifier";
  name: string;
}

export interface AtribuitionExpressionAST extends AST {
  type: "AtribuitionExpression";
  left: IdentifierAST;
  right:
    | AST
    | LiteralAST
    | IdentifierAST
    | BinaryExpressionAST
    | UnaryExpressionAST
    | CallExpressionAST;
}

export interface DeclarationAST extends AST {
  type: "Declaration";
  value: AtribuitionExpressionAST;
}

export interface VariableDeclarationAST extends DeclarationAST {
  kind: "let";
}

export interface ConstantDeclarationAST extends DeclarationAST {
  kind: "const";
}

export interface IfStatementAST extends AST {
  type: "IfStatement";
  test: AST;
  consequent: AST;
  alternate?: AST;
}

export interface FunctionDeclarationAST extends AST {
  type: "FunctionDeclaration";
  name: IdentifierAST;
  params: IdentifierAST[];
  returns?: IdentifierAST;
  body: AST[];
}

export interface typeDelarationAST extends AST {
  type: "TypeDeclaration";
  name: IdentifierAST;
  value: AST;
}

export interface CallExpressionAST extends AST {
  type: "CallExpression";
  callee: IdentifierAST;
  arguments: AST[];
}

export interface ProgramAST extends AST {
  type: "Program";
  body: AST[];
}

export interface ModuleAST extends AST {
  type: "Module";
  body: AST[];
}
