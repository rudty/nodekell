# nodekell
node js functional library

require module 
```node
const F = require("nodekell");
```


functional library for node 





# Examples
---
using a single function
```node
const a = [1,2,3,4,5];
const filtered = F.filter(e=> e % 2 == 0, a)
for await (const e of filtered) {
       console.log(e);
}
/*
print
2
4
*/
```



use a combination of three functions
```node
const v = await F.run(
            F.range(10),//[0~9]
            F.filter(e => e % 2 == 0), //[0,2,4,6,8] 
            F.map(e => e + 1), //[1,3,5,7,9]
            F.reduce((acc, e) => acc + e)) // 1+3+5+7+9
console.log(v);//25
```
