"use strict";
const fs = require("fs");
try{
    fs.unlinkSync("./src/index.js");
}catch{}

const files = fs.readdirSync("./src");
let l = `"use strict";\r\n`;
for (const f of files) {
    if (f.endsWith(".js")) {
        l += `export * from "./${f}";\r\n`
    }
}
fs.writeFileSync("./src/index.js", l);

try{
    fs.unlinkSync("./src/index.ts");
}catch{}

const files2 = fs.readdirSync("./src");
let l2 = `"use strict";\r\n`;
for (const f of files2) {
    if (f.endsWith(".ts")) {
        l2 += `export * from "./${f.substring(0, f.length - 3)}";\r\n`
    }
}
fs.writeFileSync("./src/index.ts", l2);
