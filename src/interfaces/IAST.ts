export interface ASTNode {
  type: string;
  children?: ASTNode[];
}

export interface NumberASTNode extends ASTNode {
  type: "Number";
  value: number;
}

export interface BinaryASTNode extends ASTNode {
  type: "BinaryOperator";
  operator: string;
  left: ASTNode;
  right: ASTNode;
}
