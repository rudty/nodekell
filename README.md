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
*    [foldl1](#foldl1)
*    [sleep](#sleep)
*    [foldr](#foldr)
*    [take](#take)
*    [takeWhile](#takeWhile)
*    [reduce](#reduce)
*    [zip](#zip)
*    [zipWith](#zipWith)



### range
```javascript
for (const e of F.range(10)) {
    console.log(e);
}
//print 0 ~ 9

for (const e of F.range(10, 0, -1)) {
    console.log(e);
}
//print 10 ~ 1
```


### curry
```javascript
const myAdd = F.curry((a,b,c) => a + b + c);
const myAdd1 = myAdd(1);
const myAdd2 = myAdd1(2);
const myAdd3 = myAdd2(3);//<- real call
console.log(myAdd3);
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

## map
```javascript
const a = [1,2,3,4,5];
for await (const e of F.map(e=> e * 2, a)) {
    console.log(e);
}
//print 2 4 6 8 10
```
```javascript
const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.collect);
console.log(v);
//print 2 3 4 5 6        
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
console.log(endTime - beginTime); // works concurrency, print 121
```

### collect
iterator or asyncIterator to Array 
```javascript
const mapped = F.map(e => e + 1, a); 
console.log(mapped); // print asyncGenerator
const collected = await F.collect(mapped);
console.log(collected); //print [2,3,4,5,6]
```
```javascript
const v = await F.run(
    F.range(Infinity),//[0,1,2....]
    F.filter(e => (e % 3) === 0), //[0,3,6...] 
    F.map(e => e + 1), //[1,4,7...]
    F.take(5), // generator([1,4,7,10,13])
    F.collect);  // generator => array
console.log(v); //[1,4,7,10,13]
```


### foldl
```javascript
const a = [1,2,3,4,5];
const sum = await F.foldl((acc, e) => acc + e, 0, a); 
console.log(sum); // print 15
```
```javascript
const a = ["w","o","r","l","d"];
const sum = await F.foldl((acc, e) => acc + e, "hello", a); 
console.log(sum); // print "helloworld"
```




### take
```javascript
const a = [1,2,3,4,5];
const t = F.take(3, a);
console.log(await F.collect(t)); // print 1 2 3
```
```javascript
const v = await F.run(
    F.range(Infinity),
    F.take(2),
    F.collect
);
console.log(v);
```


