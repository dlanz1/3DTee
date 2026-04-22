#! /usr/bin/env node

import * as fs from "node:fs/promises"
import util from "node:util"
import compile from "./compiler.js"

const help = `3DTee compiler 

Syntax: 3DTee <filename> <outputType>

Prints to stdout according to <outputType>, which must be one of:

    - parsed:     a message that the program was matched ok by the grammar
    - analyzed:   the statically analyzed representation
    - optimized:  the optimized semantically analyzed representation
    - js:         the translation to JavaScript
`

async function compileFromFile(filename, outputType) {
    try {
        const buffer = await fs.readFile(filename)
        const compiled = compile(buffer.toString(), outputType)
        if (typeof compiled === "string") {
            console.log(compiled)
        } else {
            console.log(util.inspect(compiled, { depth: null, colors: false }))
        }
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e)
        console.error(message)
        process.exitCode = 1
    }
}

if (process.argv.length === 4) {
    await compileFromFile(process.argv[2], process.argv[3])
} else {
    console.log(help)
    process.exitCode = 2
}