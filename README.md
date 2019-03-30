# nodekell
node js async functional library

```npm install nodekell```


require module 
```javascript
const F = require("nodekell");
```


async functional library for node 

all functions are curried and can be used in combination with other functions like haskell


# Examples
---
*    [run](#run)
*    [head](#head)
*    [tail](#tail)
*    [drop](#drop)
*    [dropWhile](#dropWhile)
*    [distinct](#distinct)
*    [distinctBy](#distinctBy)
*    [seq](#seq)
*    [collect](#collect)
*    [collectMap](#collectMap)
*    [reverse](#reverse)
*    [curry](#curry)
*    [filter](#filter)
*    [fmap](#fmap)
*    [flat](#flat)
*    [forEach](#forEach)
*    [map](#map)
*    [range](#range)
*    [foldl](#foldl)
*    [foldl](#foldl)1
*    [sleep](#sleep)
*    [foldr](#foldr)
*    [take](#take)
*    [takeWhile](#takeWhile)
*    [reduce](#reduce)
*    [zip](#zip)
*    [zipWith](#zipWith)



### filter
```javascript
const a = [1,2,3,4,5];
const filtered = F.filter(e=> e % 2 == 0, a)
for await (const e of filtered) {
       console.log(e);
}
//print
//2
//4
```
```javascript
const r = await F.run(
 [1,2,3,4,5], 
 F.filter(e => e % 2 == 0));

for await (const e of r) {
 console.log(e);
}
//print 
//2
//4
```
### run
use a combination of 4 functions
```javascript
const v = await F.run(
            F.range(10),//[0~9]
            F.filter(e => e % 2 == 0), //[0,2,4,6,8] 
            F.map(e => e + 1), //[1,3,5,7,9]
            F.reduce((acc, e) => acc + e)) // 1+3+5+7+9
console.log(v);//25
```

### foreach
```javascript
const beginTime = Date.now();
await F.run(
    F.range(100), 
    F.forEach(async e => {
        await F.sleep(100)
    }));
const endTime = Date.now();
console.log(endTime - beginTime); // print 121
```

### collect
```javascript
const v = await F.run(
    F.range(Infinity),//[0,1,2....]
    F.filter(e => (e % 3) === 0), //[0,3,6...] 
    F.map(e => e + 1), //[1,4,7...]
    F.take(5), // generator([1,4,7,10,13])
    F.collect);  // generator => array
console.log(v); //[1,4,7,10,13]
```

### curry
```javascript
const myAdd = F.curry((a,b,c) => a + b + c);
const myAdd1 = myAdd(1);
const myAdd2 = myAdd1(2);
const myAdd3 = myAdd2(3);//<- real call
console.log(myAdd3);
```

