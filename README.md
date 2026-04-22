<p align="center">
  <img src="./3DTee-Logo.svg" alt="3DTee Logo" width="200">
</p>

# 3DTee — A Golf-Themed Programming Language

3DTee is a golf-themed language where each program starts at `teeOff` and ends at `clubHouse`. The current repository includes a working grammar/parser layer and a compiler pipeline scaffold.

## Features

- Grammar-driven parser implemented with Ohm (`src/3DTee.ohm`, `src/parser.js`)
- Golf-themed syntax (`bag`, `pin`, `course`, `swing`, `readLie`, `play`, etc.)
- Expressions include `?:`, `??`, logical/bitwise/shift/arithmetic operators, `#`, and unary helpers
- Literals include numeric forms, strings with escapes, typed empty arrays (`[T]()`), and array literals
- `//` line comments and Unicode identifiers
- Analyzer, optimizer, and generator are currently scaffolded only (**not yet implemented**)

## Pipeline

3DTee follows a classic compiler pipeline:

```
source → parser → analyzer → optimizer → generator → JavaScript
```

| Stage       | File                  | Role                                              |
|-------------|-----------------------|---------------------------------------------------|
| Parser      | `src/parser.js`       | Matches source against `src/3DTee.ohm` (implemented) |
| Analyzer    | `src/analyzer.js`     | Static semantic analysis (**not yet implemented**) |
| Optimizer   | `src/optimizer.js`    | Optimization passes (**not yet implemented**) |
| Generator   | `src/generator.js`    | JavaScript emission (**not yet implemented**) |
| Driver      | `src/3DTee.js`        | CLI entry point |
| Compiler    | `src/compiler.js`     | Orchestrates stage calls |

## Installation

```bash
git clone https://github.com/dlanz1/3DTee.git
cd 3DTee
npm install
```

## Usage

Compile a 3DTee source file and choose what the CLI emits:

```bash
node src/3DTee.js <filename> <outputType>
```

Where `<outputType>` is one of:

- `parsed` — confirms the program was matched by the grammar
- `analyzed` — analyzer stage output (**currently not implemented**)
- `optimized` — optimizer stage output (**currently not implemented**)
- `js` — JavaScript translation (**currently not implemented**)

## Example

```
teeOff
  bag score = 72;
  pin par = 72;

  swing relativeToPar(s: int): int {
    sink s - par;
  }

  readLie score <= par {
    print("Under or at par!");
  } otherwise {
    print("Keep practicing.");
  }
clubHouse
```

More syntax-valid examples are in `examples/`.

## Testing

Tests use Node's built-in test runner:

```bash
npm test
```

Current emphasis is parser coverage; analyzer/optimizer/generator suites are placeholder TODO blocks until those modules are implemented.

## Project Structure

```
3DTee/
├── examples/             # Syntax-valid 3DTee programs
├── src/
│   ├── 3DTee.js        # CLI entry point
│   ├── 3DTee.ohm       # Authoritative grammar
│   ├── compiler.js     # Pipeline orchestrator
│   ├── parser.js       # Grammar-driven parser
│   ├── core.js         # AST scaffolding placeholders
│   ├── analyzer.js     # Semantic analysis (pending)
│   ├── optimizer.js    # Optimizations (pending)
│   └── generator.js    # JavaScript emitter (pending)
├── test/               # Node test runner suites
└── package.json
```

## Collaborators

- [Derek Lanz](https://github.com/dlanz1) — Collaborator
- [Daniel Lee](https://github.com/DanielJLee0917) — Collaborator
- [Devan Joaquin Abiva](https://github.com/DevanJoaquin) — Collaborator
- [Trevor Leung](https://github.com/TrevorLeung05) — Collaborator
- [Bill Nguyen](https://github.com/BillNg2801) — Collaborator

## License

This project is licensed under the terms of the included [LICENSE](./LICENSE) file.
