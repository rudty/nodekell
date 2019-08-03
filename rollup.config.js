"use strict"
require("./build.js");
const cleanup = require("rollup-plugin-cleanup");
module.exports = {
    input: "./src/index.js",
    plugins: [
        cleanup()
    ],
    output: {
        file: "./index.js",
        format: "cjs" 
    }
}