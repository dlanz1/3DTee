import { describe, it } from "node:test"
import assert from "node:assert/strict"
import parse, { match } from "../src/parser.js"

const okPrograms = [
    [
        "minimal program",
        `
teeOff
clubHouse
`,
    ],
    [
        "declarations and assignment",
        `
teeOff
  bag score = 72;
  pin par = 72;
  score = score - 1;
clubHouse
`,
    ],
    [
        "function with optional and array types",
        `
teeOff
  swing pick(a: int?, b: [int]): int {
    sink a ?? b[0];
  }
clubHouse
`,
    ],
    [
        "struct declaration and member access",
        `
teeOff
  course Hole { number: int distance: float }
  bag h = hazard Hole;
  bag value = h?.number ?? 0;
clubHouse
`,
    ],
    [
        "if / else-if / else chain",
        `
teeOff
  bag x = 3;
  readLie x < 0 { x = 0; } otherwise readLie x == 0 { x = 1; } otherwise { x = 2; }
clubHouse
`,
    ],
    [
        "while and repeat loops",
        `
teeOff
  bag i = 0;
  whileBall i < 3 { i++; }
  practice 2 { i--; }
clubHouse
`,
    ],
    [
        "range and collection loops",
        `
teeOff
  bag xs = [1, 2, 3];
  play i through 1...3 { bag a = i; }
  play j through 0..<2 { bag b = j; }
  play x through xs { bag c = x; }
clubHouse
`,
    ],
    [
        "typed empty array literal",
        `
teeOff
  bag xs = [int]();
clubHouse
`,
    ],
    [
        "unicode identifier and string escapes",
        `
teeOff
  bag コンパイラ = 1;
  bag s = "line\\n\\t\\u{1f3cc}";
clubHouse
`,
    ],
    [
        "comments",
        `
teeOff
  bag x = 1; // keep score
clubHouse
`,
    ],
]

const badPrograms = [
    ["missing teeOff", "bag x = 1; clubHouse", /Line 1, col 1/],
    ["missing semicolon", "teeOff bag x = 1 clubHouse", /Line 1/],
    ["bad float", "teeOff bag x = 2.; clubHouse", /Line 1/],
    ["bad unicode escape", 'teeOff bag s = "\\u{1111111}"; clubHouse', /Line 1/],
    ["missing block braces in whileBall", "teeOff whileBall fairway bag x = 1; clubHouse", /Line 1/],
]

describe("The parser", () => {
    for (const [scenario, source] of okPrograms) {
        it(`matches ${scenario}`, () => {
            assert.ok(match(source).succeeded())
            assert.ok(parse(source).succeeded())
        })
    }
    for (const [scenario, source, errorPattern] of badPrograms) {
        it(`throws on ${scenario}`, () => {
            assert.throws(() => parse(source), errorPattern)
        })
    }
})