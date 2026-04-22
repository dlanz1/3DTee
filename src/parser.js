import fs from "node:fs"
import ohm from "ohm-js"

const grammar = ohm.grammar(fs.readFileSync(new URL("./3DTee.ohm", import.meta.url), "utf-8"))

export default function parse(sourceCode) {
    const match = grammar.match(sourceCode)
    if (match.succeeded()) {
        return match
    }
    throw new Error(match.message)
}
