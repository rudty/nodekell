# nodekell
node js functional library

```npm install nodekell```


require module 
```node
const F = require("nodekell");
```


functional library for node 

all functions are curried and can be used in combination with other functions like haskell


# Examples
---
using filter function
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



use a combination of 4 functions
```node
const v = await F.run(
            F.range(10),//[0~9]
            F.filter(e => e % 2 == 0), //[0,2,4,6,8] 
            F.map(e => e + 1), //[1,3,5,7,9]
            F.reduce((acc, e) => acc + e)) // 1+3+5+7+9
console.log(v);//25
```


use and collect 
```node
const v = await F.run(
    F.range(Infinity),//[0,1,2....]
    F.filter(e => (e % 3) === 0), //[0,3,6...] 
    F.map(e => e + 1), //[1,4,7...]
    F.take(5), // generator([1,4,7,10,13])
    F.collect);  // generator => array
console.log(v); //[1,4,7,10,13]
```

creating a currying function
```node
const myAdd = F.curry((a,b,c) => a + b + c);
const myAdd1 = myAdd(1);
const myAdd2 = myAdd1(2);
const myAdd3 = myAdd2(3);//<- real call
console.log(myAdd3);
```

# Functions
---
```
    run
    head
    seq
    collect
    reverse
    curry
    filter
    fmap
    flat
    map
    range
    foldl
    foldl1
    reduce
    foldr
    take
    takeWhile
    reduce
    zip
    zipWith
```
