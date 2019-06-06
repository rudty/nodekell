"use strict"
const cleanup = require("rollup-plugin-cleanup")
const resolve = require("rollup-plugin-node-resolve");
module.exports = {
    plugins: [
        cleanup(),
        resolve({extensions:[".js"]})
    ],
    input: "./src/index.js",
    output: {
        file: "./index.js",
        format: "cjs" 
    }
}
// ./node_modules/rollup/bin/rollup -c 