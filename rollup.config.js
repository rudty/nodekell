"use strict"
require("./build.js");
const cleanup = require("rollup-plugin-cleanup");
const terser = require("rollup-plugin-terser").terser;
const tsc = require("rollup-plugin-typescript2");
const tsconfig = require("./tsconfig.json");
module.exports = [{
    input: "./src/index.ts",
    module:"ES2015",
    plugins: [
        tsc({
            target:"ES2015",
    module:"ES2015",
        
            tsconfig: "./tsconfig.json"
        }),
        cleanup(),
        
    ],
    output: [{
        file: "./index.ts",
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