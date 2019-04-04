'use strict';
const a = require("./core");
Object.assign(a, require("./prelude"));
Object.assign(a, require("./stream"));
module.exports = a;