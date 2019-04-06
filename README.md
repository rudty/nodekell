# nodekell
node js async functional library

```npm install nodekell```


require module 
```javascript
const F = require("nodekell");
```


async functional library for node 

all functions are curried and can be used in combination with other functions like haskell

```javascript
const v = await F.run(
    F.range(Infinity),//[0,1,2...]
    F.filter(e => e % 2 == 0), //[0,2,4...] 
    F.map(e => e + 1), //[1,3,5...]
    F.take(5), // [1,3,5,7,9]
    F.reduce((acc, e) => acc + e)) // 1+3+5+7+9
console.log(v);//25
```

---
# Functions / Examples
## currying 
*    [run](#run)
*    [curry](#curry)

## functional
*    [filter](#filter)
*    [map](#map)
*    [take](#take)
*    [takeWhile](#takeWhile)
*    [fmap](#fmap)
*    [flatMap](#flatMap)
*    [flat](#flat)
*    [reverse](#reverse)
*    [forEach](#forEach)
*    [zip](#zip)
*    [zipWith](#zipWith)
*    [drop](#drop)
*    [dropWhile](#dropWhile)
*    [emptyThen](#emptyThen)
*    [errorThen](#errorThen)
*    [distinct](#distinct)
*    [distinctBy](#distinctBy)
*    [splitBy](#splitBy)

## generator
*    [range](#range)
*    [seq](#seq)
*    [rangeOf](#rangeOf)
*    [repeat](#repeat)

## aggregate
*    [foldl](#foldl)
*    [foldl1](#foldl1)
*    [reduce](#reduce)
*    [foldr](#foldr)
*    [collect](#collect)
*    [collectMap](#collectMap)
*    [collectSet](#collectSet)
*    [maxBy](#minBy)
*    [minBy](#maxBy)
*    [max](#max)
*    [min](#min)
*    [some](#some)
*    [every](#every)
*    [count](#count)
*    [sum](#sum)
*    [groupBy](#groupBy)

## util
*    [sleep](#sleep)
*    [head](#head)
*    [tail](#tail)



### run
combination functions like haskell $ or .
```javascript
const v = await F.run(
            F.range(10),//[0~9]
            F.filter(e => e % 2 == 0), //[0,2,4,6,8] 
            F.map(e => e + 1), //[1,3,5,7,9]
            F.reduce((acc, e) => acc + e)) // 1+3+5+7+9
console.log(v);//25
```


### curry
```javascript
const myAdd = F.curry((a,b,c) => a + b + c);
const myAdd1 = myAdd(1);
const myAdd2 = myAdd1(2);
const myAdd3 = myAdd2(3);//<- real call
console.log(myAdd3);
```
```javascript
const myAdd = F.curry((a,b,c) => a + b + c);
myAdd(1,2,3); // <- real call
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


### map
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
console.log(v); // print 0 1
```


### takeWhile
```javascript
const a = [1,2,3,1,2,3];
const t = F.takeWhile(e => e < 3, a);
console.log(await F.collect(t)); // print 1, 2
```


### fmap
```javascript
const a = [[1],[2],3,4,5];
const f = F.fmap(e => e, a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```
```javascript
const a = [[Promise.resolve(1)],Promise.resolve([2]),3,4,5];
const f = F.fmap(e => e, a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```


### flatMap
same as fmap
```javascript
const a = [[1],[2],3,4,5];
const f = F.flatMap(e => e, a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```


### flat
```javascript
const a = [[1],[2],3,4,5];
const f = F.flat(a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```


### reverse
```javascript
const a = [1,2,3,4,5];
const t = F.reverse(a);
console.log(await F.collect(t)); // print 5,4,3,2,1
```


### forEach
```javascript
const beginTime = Date.now();
await F.run(
    F.range(100), 
    F.forEach(async e => {
        await F.sleep(100)
    }));
const endTime = Date.now();
console.log(endTime - beginTime); 
// print 121
// works concurrency
```


### zip
```javascript
const a = [1,2,3,4,5];
const b = [6,7,8,9,10];
const z = F.zip(a, b);
const arr = await F.collect(z);
for (const e of arr) {
    console.log(e);
    //print
    //[1,6]
    //[2,7]
    //[4,9]
    //[5,0]
}
```


### zipWith
```javascript
const a = [{id:1}, {id:2}];
const b = [{name:"a"}, {name:"b"}];

const myZip = (f, s) => {
    return [f.id, s.name];
};

const z = F.zipWith(myZip,a, b);
const arr = await F.collect(z);
for (const e of arr) {
    console.log(e);
}
//print
//[1,"a"]
//[2,"b"]
```


### drop
```javascript
const a = [1,2,3,4,5];
const r = F.drop(3, a)
const result = await F.collect(r);
console.log(result); // print [4, 5]
```
```javascript
const a = [1,2,3,4,5];
const r = F.drop(Infinity, a)
const result = await F.collect(r);
console.log(result); // print []
```


### dropWhile
```javascript
const a = [1,2,3,4,1];
const r = F.dropWhile(e=> e < 3, a)
const result = await F.collect(r);
console.log(result); // print [3,4,1]
```
```javascript
const a = [Promise.resolve(1),2,3,4,1];
const r = F.dropWhile(e=> e < 3, a)
const result = await F.collect(r);
console.log(result); // print [3,4,1]
```


### emptyThen
```javascript
const v = await F.run(F.range(Infinity),
            F.take(0), // take 0 
            F.emptyThen([1,2,3,4,5]), // new array
            F.map(e => e + 1), // 2,3,4,5,6
            F.collect);
console.log(v); // 2,3,4,5,6
```
```javascript
const v = await F.run(F.range(Infinity),
    F.take(0),// take 0
    F.emptyThen(()=> { return [1,2,3] }), // new array from function
    F.map(e => e + 1), // 2,3,4
    F.collect) 
console.log(v);// 2,3,4
```
```javascript
const v = await F.run(F.range(Infinity),
    F.take(3), // [0,1,2]
    F.emptyThen(([9,9,9]),//not work
    F.map(e => e + 1), //[1,2,3]
    F.collect);
console.log(v); //2,3,4
```


### errorThen
catch error 
```javascript
const v = await F.run([1,2,3,4,5],
    F.filter(e =>{
        if (e > 2) {
            throw new Error("hello")
        }
        return e;
    }), // [1, 2 error! 
    F.errorThen([9,8]),//catch and return 9,8
    F.collect); // 
console.log(v);
//print 1,2,9,8
```
```javascript
const v = await F.run([1,2,3,4,5],
    F.filter(e =>{
        if (e > 2) {
            throw new Error("hello error");
        }
        return e;
    }), // [1, 2 error! 
    F.errorThen((reason) => {
        console.log(reason); //hello error
        return [9,8];
    }),//catch and return 9,8
    F.collect); // 
console.log(v);
//print 
//hello error 
//callstack... 
//1,2,9,8
```


### distinct
```javascript
const a = [1,2,1,2,2,3];
const r = F.distinct(a);
const result = await F.collect(r);
console.log(result); // print 1,2,3
```


### distinctBy
```javascript
const a = [{num:1}, {num:1}, {num:2}];
const r = F.distinctBy(e=>e.num, a);
const result = await F.collect(r);
for (const m of result) {
    console.log(m);
}
//print
//{num:1}
//{num:2}
```


### splitBy
to iterable from any  
```javascript
const helloWorld = "hello world";
const r = await F.splitBy(e=>e.split(" "), helloWorld);
for await(const e of r) {
    console.log(e);
}
//print 
//hello
//world
```


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


### seq 
make iterable(array, set, map, iteratorObject) to asyncIterator 
```javascript
const a = [1,2,3,4,5];
for await(const e of F.seq(a)) {
    console.log(e);
}
//print 1,2,3,4,5
```
```javascript
const a = new Map([[1,2],[3,4]]);
for await(const e of F.seq(a)) {
    console.log(e);
    //print 
    //[1,2]
    //[3,4]
}
```


### rangeOf
make flatten range
```javascript
const r = await F.rangeOf(1,2,3);
for await(const e of r) {
    console.log(e);
}
//print 1,2,3
```
```javascript
const r = await F.rangeOf([1,2,3],4,5);
for await(const e of r) {
    console.log(e);
}
//print 1,2,3,4,5
```


### repeat

```javascript
const r = F.repeat(3);
for await(const e of r) {
    console.log(e);
}
//print 
//3
//3
//3
//....
```
```javascript
const v = await F.run(
    F.repeat(1), //[1,1,1....]
    F.map(e => e + 1), //[2,2,2....]
    F.take(5), //[2,2,2,2,2]
    F.collect); //generator => array
console.log(v);
//print [2,2,2,2,2]
```
```javascript
const r = F.repeat(()=>{return 3;});
for await(const e of r) {
    console.log(e);
}
//print 
//3
//3
//3
//....
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


### foldl1
take 1 items and call foldl
```javascript
const a = [1,2,3,4,5];
const sum = await F.foldl1((acc, e) => acc + e, a); 
console.log(sum); // print 15;
```


### reduce
same as foldl1
```javascript
const a = [1,2,3,4,5];
const sum = await F.reduce((acc, e) => acc + e, a); 
console.log(sum); // print 15;
```


### foldr
```javascript
const arr = [1,2,3,4,5];
const r = await F.foldr((a, b) => a + b, 0, arr);
console.log(r); // print 15
```
```javascript
const arr = [64,2,1];
const r = await F.foldr((a, b) => a / b, 1, arr);
console.log(r); // print 32
```
```javascript
const arr = ["1","2","3","4"];
const r = await F.foldr((a, b) => a + b, "5", arr);
console.log(r); // print 12345
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


### collectMap
```javascript
const a = [[1,2],[3,4]];
const m = await F.collectMap(a); // new Map([[1,2],[3,4]])
for(const [k,v] of m) {
    console.log(k, v);
}
//print 
//1 2
//3 4
```


### collectSet
```javascript
const a = [1,2,3,1,2,3];
const m = await F.collectSet(a); //new Set([1,2,3])
for(const e of m) {
    console.log(e);
}
//print 
//1
//2
//3
```
```javascript
const a = "hello world";
const m = await F.collectSet(a); //new Set("helo wrd")
for(const e of m) {
    console.log(e);
}
//print 
//helo wrd
```


### maxBy
```javascript
const a = [10,9,8,7];
const r = await F.maxBy(e => e, a);
console.log(r); // print 10;
```
```javascript
const a = [1,10,9,8,7,11];
const r = await F.maxBy(e => Math.floor(e/10), a) //compare [0,1,0,0,0,1]
console.log(r); // print 10
```


### minBy
```javascript
const a = [0,10,9,8,7];
const r = await F.minBy(e => e, a);
console.log(r); // print 0
```
```javascript
const a = [7,10,9,8,1,11];
const r = await F.minBy(e => Math.floor(e/10), a) //compare [0,1,0,0,0,1]
console.log(r); // 7
```


### max
```javascript
const a = [Promise.resolve(10),9,8,7];
const r = await F.max(a);
console.log(r);
//print 10
```


### min
```javascript
const a = [10,9,8,Promise.resolve(7)];
const r = await F.min(a);
console.log(r);
//print 7
```


### some
```javascript
const a = [1,2,3,4,5];
const r = await F.some(e=> e % 2 == 0, a); //found '2' return
console.log(r); // true
```
```javascript
const r = await F.run(
    F.range(Infinity), //[0...Infinity]
    F.some(e=> Promise.resolve(e > 100)) // found '101' return
);
console.log(r); // true
```


### every
```javascript
const a = [1,2,3,4,5];
const r = await F.every(e=> e  >= 0, a); // all elem >= 0 return true
console.log(r); // true
```
```javascript
const a = [1,2,3,4,5];
const r = await F.every(e=> Promise.resolve(e < 3), a); 
//1 ok, 2 ok, 3 no return false
console.log(r); // false
```


### count
```javascript
const a = [1,2,3,4,5];
const n = await F.count(a);
console.log(n); // print 5
```


### sum
```javascript
const a = [1,2,3,4,5];
const n = await F.sum(a);
console.log(n); // print 15
```
```javascript
const a = "abcde";
const n = await F.sum(a);
console.log(n); // print abcde
```


### groupBy
returns a Map that is aggregated through a function. key is the return value of the function, and value is the source.
```javascript
const a = [
    {type: "tea",
        price: 1},
    {type: "tea",
        price: 2},
    {type: "phone",
        price: 3},
    {type: "phone",
        price: 4},
];
//returns new Map(... )
const r = await F.groupBy(e => e.type, a);
console.log(r.get("tea"));
//print [ { type: 'tea', price: 1 }, { type: 'tea', price: 2 } ]
console.log(r.get("phone"));
//print [ { type: 'phone', price: 3 }, { type: 'phone', price: 4 } ]
```


### sleep
like other language 
```javascript
const beginDate = Date.now();
await F.sleep(1000);
const endDate = Date.now();
console.log(endDate - beginDate); // print 1009
```


### head
get first element

warning: if use head for generator, result is not the same
```javascript
const a = [1,2,3,4,5];
console.log(await F.head(a)); //print 1
console.log(await F.head(a)); //print 1
```

```javascript
const a = F.seq([10,9,8,7]); // make generator
console.log(await F.head(a)); //print 9
console.log(await F.head(a)); //print 8
console.log(await F.head(a)); //print 7
```

```javascript
const a = [];
try{
    await F.head(a);
}catch(e) {
    console.log(e);
} 
//print empty iter 
```


### tail
get from the second

warning: if use tail for generator, result is not the same
```javascript
const a = [1,2,3,4,5];
const t = F.tail(a);
console.log(await F.collect(t)); // print 2 3 4 5
```
```javascript
const a = F.seq([10,9,8,7]); //make generator
for await (const e of F.tail(a)){
    console.log(e);
}
for await (const e of a) {
    //a is empty...
    console.log("a is empty");
}
//print 
//9
//8
//7
```
