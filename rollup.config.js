"use strict"
require("./build.js");
const cleanup = require("rollup-plugin-cleanup");
const terser = require("rollup-plugin-terser").terser;
module.exports = [{
    input: "./src/index.js",
    plugins: [
        cleanup(),
    ],
    output: [{
        file: "./index.js",
        format: "cjs"
    }, {
        file: "./nodekell.js",
        name: "F",
        format: "umd"
    }]
}, {
    input: "./src/index.js",
    plugins: [
        cleanup(),
        terser(),
    ],
    output: [{
        file: "./nodekell.min.js",
        name: "F",
        format: "umd"
    }]
}];