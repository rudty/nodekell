"use strict"
require("./build.js");
const cleanup = require("rollup-plugin-cleanup");
const terser = require("rollup-plugin-terser").terser;
const tsc = require("rollup-plugin-typescript2");
const tsconfig = require("./tsconfig.json");
module.exports = [{
    input: "./src/index.ts",
    plugins: [
        cleanup(),
        tsc({
            tsconfig: "./tsconfig.json"
        }),
    ],
    output: [{
        file: "./index.js",
        format: "cjs"
    }, 
    // {
    //     file: "./nodekell.js",
    //     name: "F",
    //     format: "umd"
    // }
    ]
   }, 
// {
//     input: "./src/index.js",
//     plugins: [
//         cleanup(),
//         terser(),
//     ],
//     output: [{
//         file: "./nodekell.min.js",
//         name: "F",
//         format: "umd"
//     }]
// }
];