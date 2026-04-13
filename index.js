const fs = require('fs');
const ohm = require('ohm-js');

// Load grammar
const grammarSource = fs.readFileSync('grammar.ohm', 'utf-8');
const grammar = ohm.grammar(grammarSource);

// --- Semantics ---
const semantics = grammar.createSemantics();

// --- Run ---
const input = process.argv[2];
if (!input) {
  console.error('Usage: node index.js "<program>"');
  process.exit(1);
}

const match = grammar.match(input);
if (match.failed()) {
  console.error(match.message);
  process.exit(1);
}

console.log('Match succeeded.');
