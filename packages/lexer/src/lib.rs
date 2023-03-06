use deno_bindgen::deno_bindgen;
use logos::Logos;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Logos, Debug, PartialEq)]
enum Tokens {
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

    #[regex(r#"[\n]+"#)]
    Newline,

    //TODO: add operations and other tokens
    #[error]
    #[regex(r"[ \t\f]+", logos::skip)]
    Error,
}

#[deno_bindgen]
fn lex(input: &str) -> String {
    let mut lex = Tokens::lexer(input);
    let mut result = String::new();
    while let Some(token) = lex.next() {
        result.push_str(&format!("{:?}", token));
        result.push_str("\n");
    }
    result
}

#[derive(Serialize, Deserialize)]
struct Range {
    start: usize,
    end: usize,
}

#[derive(Serialize, Deserialize)]
struct SpannedToken {
    token: String,
    range: Range,
}

#[deno_bindgen]
fn lex_span(input: &str) -> String {
    let mut lex = Tokens::lexer(input).spanned();
    let mut result: Vec<SpannedToken> = Vec::new();

    while let Some((token, range)) = lex.next() {
        result.push(SpannedToken {
            token: format!("{:?}", token),
            range: Range {
                start: range.start,
                end: range.end,
            },
        });
    }

    let json_result = json!(result);
    json_result.to_string()
}
