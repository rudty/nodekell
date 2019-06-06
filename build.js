"use strict";
const fs = require("fs");
try{
    fs.unlinkSync("./src/index.js");
}catch{}

const files = fs.readdirSync("./src");
let l = `"use strict"\r\n`;
for (const f of files) {
    l += `export * from "./${f}"\r\n`
}
fs.writeFileSync("./src/index.js", l);
