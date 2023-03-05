// add.rs
use deno_bindgen::deno_bindgen;
use logos::Logos;

#[derive(Logos, Debug, PartialEq)]
enum Token {
    #[regex(r"[0-9]+", |lex| lex.slice().parse())]
    Integer(i32),

    #[regex(r"[0-9]+\.[0-9]+", |lex| lex.slice().parse())]
    Float(f32),

    #[token("=")]
    Equals,

    #[token("true")]
    True,

    #[token("false")]
    False,

    #[token("module")]
    Module,

    #[token("fn")]
    Fn,

    #[token("let")]
    Let,

    #[token("const")]
    Const,

    #[token("if")]
    If,

    #[token("else")]
    Else,

    #[token("elif")]
    Elif,

    #[token("for")]
    For,

    #[token("struct")]
    Struct,

    #[token("interface")]
    Interface,

    #[token("return")]
    Return,

    #[token(":")]
    Period,

    #[token(",")]
    Comma,

    #[token(";")]
    Semicolon,

    #[token("{")]
    LeftBrace,

    #[token("}")]
    RightBrace,

    #[token("(")]
    LeftParen,

    #[token(")")]
    RightParen,

    #[token("[")]
    LeftBracket,

    #[token("]")]
    RightBracket,

    #[token("+")]
    Plus,

    #[token("-")]
    Minus,

    #[token("*")]
    Star,

    #[token("/")]
    Slash,

    #[token("%")]
    Percent,

    //identifier
    #[regex(r"[a-zA-Z_][a-zA-Z0-9_]*", |lex| lex.slice().to_string())]
    Identifier(String),

    #[regex(r#""([^"\\]|\\.)*""#, |lex| lex.slice().to_string())]
    String(String),

    #[error]
    #[regex(r"[ \t\n\f]+", logos::skip)]
    Error,
}

#[deno_bindgen]
fn lex(input: &str) -> String {
    let mut lex = Token::lexer(input);
    let mut result = String::new();
    while let Some(token) = lex.next() {
        result.push_str(&format!("{:?}", token));
        result.push_str("\n");
    }
    result
}
