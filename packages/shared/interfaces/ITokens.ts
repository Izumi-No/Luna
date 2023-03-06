export interface Token {
  type: string;
  value?: string;
  line: number;
  range: [number, number];
}

export interface spanedToken {
  token: string;
  range: {
    start: number;
    end: number;
  };
}
