# nodekell
Functional library for nodejs 

[![NPM Version](https://img.shields.io/npm/v/nodekell.svg?style=flat-square)](https://www.npmjs.com/package/nodekell)
[![NPM Downloads](https://img.shields.io/npm/dt/nodekell.svg)](https://www.npmjs.com/package/nodekell)
[![Build Status](https://travis-ci.org/rudty/nodekell.svg?branch=master)](https://travis-ci.org/rudty/nodekell)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frudty%2Fnodekell.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frudty%2Fnodekell?ref=badge_shield)
[![DeepScan grade](https://deepscan.io/api/teams/3359/projects/5005/branches/38973/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3359&pid=5005&bid=38973)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/594190c07d124e2494ff857d872f372b)](https://app.codacy.com/app/rudty/nodekell?utm_source=github.com&utm_medium=referral&utm_content=rudty/nodekell&utm_campaign=Badge_Grade_Dashboard)


- almost all functions support [currying](#curry)
- supports [parallel functions](#pfilter)
- supports async generator
- supports lazy evaluation
- support typescript (ver 3.4 or higher)
 


### Installation
```npm install nodekell```



### Import Module 
nodejs

```javascript
import * as F from "nodekell"
```
or
```javascript
const F = require("nodekell");
```

browser

download or link to a CDN such as [jsDelivr](https://www.jsdelivr.com/package/npm/nodekell) nodekell.min.js

### Quick Example
```javascript
const v = await F.run(
    F.range(Infinity),//[0,1,2...]
    F.filter(e => e % 2 == 0), //[0,2,4...] 
    F.map(e => e + 1), //[1,3,5...]
    F.take(5), // [1,3,5,7,9]
    F.reduce((acc, e) => acc + e)); // 1+3+5+7+9
console.log(v);//25
```
```javascript
const v = await F.run(
    F.repeat(2), //[2,2,2,..]
    F.map(e => e + 1), //[3,3,3...]
    F.take(5), // [3,3,3,3,3]
    F.distinct, // [3]
    F.collect); // generator to array
console.log(v);//[3]
```

# Functions / Examples
## currying 
*    [run](#run)
*    [pipe](#pipe)
*    [compose](#compose)
*    [curry](#curry)

## functional
*    [filter](#filter)
*    [filterIndexed](#filterindexed)
*    [map](#map)
*    [mapIndexed](#mapindexed)
*    [take](#take)
*    [takeWhile](#takewhile)
*    [fmap](#fmap)
*    [flatMap](#flatmap)
*    [flat](#flat)
*    [dflat](#dflat)
*    [reverse](#reverse)
*    [forEach](#foreach)
*    [forEachIndexed](#foreachindexed)
*    [zip](#zip)
*    [zip3](#zip3)
*    [zipWith](#zipwith)
*    [zipWith3](#zipwith3)
*    [drop](#drop)
*    [dropLast](#dropLast)
*    [dropWhile](#dropwhile)
*    [emptyThen](#emptythen)
*    [distinct](#distinct)
*    [distinctBy](#distinctby)
*    [distinctUntilChanged](#distinctuntilchanged)
*    [distinctUntilChangedBy](#distinctuntilchangedby)
*    [splitBy](#splitby)
*    [innerJoin](#innerjoin)
*    [leftInnerJoin](#leftinnerjoin)
*    [rightInnerJoin](#rightinnerjoin)
*    [outerJoin](#outerjoin)
*    [leftOuterJoin](#leftouterjoin)
*    [rightOuterJoin](#rightouterjoin)
*    [then](#then)
*    [tap](#tap)
*    [concat](#concat)
*    [union](#union)
*    [scanl](#scanl)
*    [scanl1](#scanl1)
*    [buffer](#buffer)
*    [peek](#peek)
*    [juxtA](#juxtA)

## functional / parallel
*    [parallel_set_fetch_count](#parallel_set_fetch_count)
*    [pfilter](#pfilter)
*    [pmap](#pmap)
*    [pfmap](#pfmap)
*    [pcalls](#pcalls)

## functional / string
*    [reFind](#refind)
*    [reFindSubmatch](#refindsubmatch)
*    [reFindAll](#refindall)
*    [reFindAllSubmatch](#refindallsubmatch)

## generator
*    [range](#range)
*    [seq](#seq)
*    [repeat](#repeat)
*    [rangeInterval](#rangeinterval)
*    [iterate](#iterate)
*    [enumerate](#enumerate)

## aggregate
*    [foldl](#foldl)
*    [foldl1](#foldl1)
*    [reduce](#reduce)
*    [foldr](#foldr)
*    [foldr1](#foldr1)
*    [collect](#collect)
*    [collectMap](#collectmap)
*    [collectSet](#collectset)
*    [collectObject](#collectobject)
*    [collectInt8](#collectint8)
*    [collectInt16](#collectint16)
*    [collectInt32](#collectint32)
*    [collectUint8](#collectuint8)
*    [collectUint16](#collectuint16)
*    [collectUint32](#collectuint32)
*    [collectUint8Clamped](#collectuint8clamped)
*    [maxBy](#minby)
*    [minBy](#maxby)
*    [max](#max)
*    [min](#min)
*    [some](#some)
*    [every](#every)
*    [count](#count)
*    [sum](#sum)
*    [average](#average)
*    [groupBy](#groupby)
*    [orderBy](#orderby)
*    [sortBy](#sortby)      [**change**]
*    [order](#order)
*    [sort](#sort)          [**change**]
*    [frequencies](#frequencies)
*    [frequenciesBy](#frequenciesby)
*    [associateBy](#associateby)
*    [block](#block)

## util / else
*    [_](#_)
*    [sleep](#sleep)
*    [head](#head)
*    [tail](#tail)
*    [interval](#interval)
*    [timeout](#timeout)
*    [withTimeout](#withtimeout)
*    [isNil](#isNil)
*    [cond](#cond)
*    [otherwise](#otherwise)
*    [get](#get)
*    [getOrElse](#getorelse)
*    [prop](#prop)
*    [has](#has)
*    [find](#find)
*    [findLast](#findLast)
*    [memoize](#memoize)
*    [memoizeBy](#memoizeby)
*    [equals](#equals)
*    [random](#random)
*    [shuffle](#shuffle)
*    [sample](#sample)
*    [match](#match)
*    [fnil](#fnil)
*    [assign](#assign)
*    [assign3](#assign3)
*    [mergeMap](#mergemap)
*    [mergeMapRight](#mergemapright)
*    [mergeObject](#mergeobject)
*    [mergeObjectRight](#mergeobjectright)
---


### run
combination left to right functions

first arguments received second functions argument

from second received combine functions

returns promise

```javascript
const v = await F.run(
            F.range(10),//[0~9]
            F.filter(e => e % 2 == 0), //[0,2,4,6,8] 
            F.map(e => e + 1), //[1,3,5,7,9]
            F.reduce((acc, e) => acc + e)) // 1+3+5+7+9
console.log(v + 1); // 25 + 1
```
this expands to
```javascript
const v = await F.reduce((acc, e) => acc + e, // 1+3+5+7+9
                    F.map(e => e + 1, //[1,3,5,7,9]
                        F.filter(e => e % 2 == 0, //[0,2,4,6,8]
                            F.range(10)))); //[0~9]
```


### pipe
combination left to right functions

only **first** function can use multiple arguments.

return value is promise.

see also [compose](#compose)
```javascript
const rs = F.pipe(
    e => e.sort(), //[1,2,3,4,5]
    F.reverse, //[5,4,3,2,1]
    F.collect); //generator to array
const a = [1,5,4,3,2];
const result = await rs(a);//call
console.log(result); //[5,4,3,2,1]
```
```javascript
const double1 = F.pipe(
    F.map(e => e + e), //[2,4,6,8]
    F.collect);
const a = [1,2,3,4];
const r1 = await double1(a);
console.log(r1); // [2,4,6,8]
```
```javascript
const double2 = F.pipe(
    t => t.map(e => e + e)); // Array.map

const a = [1,2,3,4];
const r2 = await double2(a); // return promise
console.log(r2); // [2,4,6,8]
```


### compose
combination right to left functions

only **last** function can use multiple arguments.

return value is promise.

see also [pipe](#pipe)
```javascript
const rs = F.compose(
    F.collect, //generator to array
    F.reverse, //[5,4,3,2,1]
    e => e.sort() //[1,2,3,4,5]
);
const a = [1,5,4,3,2];
const result = await rs(a);//call
console.log(result); //[5,4,3,2,1]
```
```javascript
const double1 = F.compose(
    F.collect,
    F.map(e => e + e) //[2,4,6,8]
);
const a = [1,2,3,4];
const r1 = await double1(a);
console.log(r1); // [2,4,6,8]
```
```javascript
const double2 = F.compose(
    t => t.map(e => e + e)); // Array.map

const a = [1,2,3,4];
const r2 = await double2(a); // return promise
console.log(r2); // [2,4,6,8]
```


### curry
if all arguments are not given for the function, 
it returns the function that stored the argument
```javascript
const myAdd = F.curry((a,b,c) => a + b + c);
const myAdd1 = myAdd(1);
const myAdd2 = myAdd1(2);
const myAdd3 = myAdd2(3);//<- real call
console.log(myAdd3); // print 6
```
```javascript
const myAdd = F.curry((a,b,c) => a + b + c);
const r = myAdd(1,2,3); // <- real call
console.log(r); // print 6
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


### filterIndexed
filter with loop counter
```javascript
const a = ["Apple", "Banana", "Orange", "Strawberry"];
const filtered = F.filterIndexed((i, e) => {
    return e[i] === "a";
}, a);
//i => 0,1,2,3 
//b[a]nana
//or[a]nge
//str[a]wberry

for await (const e of filtered) {
    console.log(e);
}
//print
//"Banana"
//"Orange"
//"Strawberry"
```


### filterNot
filter return false
```javascript
const a = [1,2,3,4,5];
const filtered = F.filterNot(e=> e % 2 == 0, a)
for await (const e of filtered) {
    console.log(e);
}
//print
//1
//3
//5
```
```javascript
const r = await F.run(
       [1,2,3,4,5], 
       F.filterNot(e => e % 2 == 0));

for await (const e of r) {
    console.log(e);
}
//print 
//1
//3
//5
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

### mapIndexed
map with loop counter
```javascript
const a = ['a','b','c','d','e'];
const mapped = F.mapIndexed((i, e) => {
    return e + i;
}, a);

for await (const e of mapped) {
    console.log(e);
}
//print 
//a0
//b1
//c2
//d3
//34
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
const a = [[1],[2],[3],[4],[5]];
const f = F.fmap(e => e, a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```
```javascript
const a = [ 
        [Promise.resolve(1)],
        Promise.resolve([2]),
        [3],
        [4],
        [5]];
const f = F.fmap(e => e, a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```


### flatMap
same as [fmap](#fmap)


### flat
```javascript
const a = [ 
        [Promise.resolve(1)],
        Promise.resolve([2]),
        [3],
        4,
        5];
const f = F.flat(a);
console.log(await F.collect(f)); // print [1,2,3,4,5]
```


### dflat
Similar to flat, but works recursively
```javascript
const r = F.dflat([[[1],[2]]],[[3]],[4]);
const c = await F.collect(r);
console.log(c);//print [1,2,3,4]
```
```javascript
const r = F.dflat("HELLO");
const c = await F.collect(r);
console.log(c);//print ["H","E","L","L","O"]
```



### reverse
```javascript
const a = [1,2,3,4,5];
const t = F.reverse(a);
console.log(await F.collect(t)); // print 5,4,3,2,1
```


### forEach
works concurrency
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
```

### forEachIndexed
forEach with loop counter

works concurrency
```javascript
const beginTime = Date.now();
const arr = ['a','b','c','d','e'];
await F.forEachIndexed(async (i, e) => {
    await F.sleep(100);
    console.log(i, e);
}, arr);
const endTime = Date.now();
console.log(endTime - beginTime); 
// print 
// 0 'a'
// 1 'b'
// 2 'c'
// 3 'd'
// 4 'e'
```


### zip
```javascript
const a = [1,2,3,4,5];
const b = [6,7,8,9,10];
const z = F.zip(a, b);
const arr = await F.collect(z);
for (const e of arr) {
    console.log(e);
}
//print
//[1,6]
//[2,7]
//[4,9]
//[5,0]
```


### zip3
```javascript
const a = [1,2,3];
const b = [4,5,6];
const c = [7,8,9];
const z = F.zip3(a,b,c);
const arr = await F.collect(z);
for (const e of arr) {
    console.log(e);
}
//print
//[1,4,7]
//[2,5,8]
//[3,6,9]
```
```javascript
const a = [1,2];
const b = [4,5,6];
const c = [7,8,9];
const z = F.zip3(a,b,c);
const arr = await F.collect(z);
for (const e of arr) {
    console.log(e);
}
//print
//[1,4,7]
//[2,5,8]
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


### zipWith3
```javascript
const a = [1,2,3];
const b = [4,5,6];
const c = [7,8,9];
const z = F.zipWith3((f,s,t)=>f+s+t, a, b,c);
const arr = await F.collect(z);
console.log(arr);
//print [12,15,18]
```


### drop
drop first element
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


### dropLast
drop last element
```javascript
const a = [1,2,3,4,5];
const r = F.dropLast(3, a)
const result = await F.collect(r);
console.log(result); // print [1, 2]
```
```javascript
const a = [1,2,3,4,5];
const r = F.dropLast(Infinity, a)
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


### distinctUntilChanged
```javascript
const a = [{num:1}, {num:1}, {num:2}];
const r = F.distinctUntilChanged(a);
for await (const e of r) {
    console.log(e);
}
//print
//{ num: 1 }
//{ num: 2 }
```
```javascript
const a = [1,2,2,3,3,3,4,4,5,5,5,5];
const r = F.distinctUntilChanged(a);
for await (const e of r) {
    console.log(e);
}
//print
//1
//2
//3
//4
//5
```


### distinctUntilChangedBy
```javascript
const a = [{num:1}, {num:1}, {num:2}];
const r = F.distinctUntilChangedBy(e => e.num, a);
for await (const e of r) {
    console.log(e);
}
//print
//{ num: 1 }
//{ num: 2 }
```
```javascript
const a = [1,2,2,3,3,3,4,4,5,5,5,5];
const r = F.distinctUntilChangedBy(F.identity, a);
for await (const e of r) {
    console.log(e);
}
//print
//1
//2
//3
//4
//5
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


### innerJoin
same as [leftInnerJoin](#leftinnerjoin)


### leftInnerJoin
support Map, Object({})
```javascript
const a = [{id:1, name:"foo"}, {id: 2, name:"bar"}, {id: 3, name:"hoo"}];
const b = [{id:1, value:3}, {id: 2, value: 4}];
const j = await F.innerJoin((v1,v2) => v1.id === v2.id , a, b);
const r = await F.collect(j);
console.log(r);
// print
// [{id:1, name:"foo", value:3},
// {id:2, name:"bar", value:4}]
```


### rightInnerJoin
support Map, object({})

the result is the same as innerJoin, but the output order is right iterator
```javascript
const a = [{id:1, value:3}]; 
const b = [{id:1, name:"foo"}, {id: 2, name:"bar"}, {id: 3, name:"hoo"}];
const j = await F.rightInnerJoin((v1,v2) => v1.id === v2.id , a, b);
const r = await F.collect(j);
console.log(r);
//  print
// [{id:1, name:"foo", value:3}]
```


### outerJoin 
same as [leftOuterJoin](#leftOuterJoin)


### leftOuterJoin
support Map, object({})
```javascript
const a = [{id:1, name:"foo"}, {id: 2, name:"bar"}, {id: 3, name:"hoo"}];
const b = [{id:1, value:3}, {id: 2, value: 4}];
const j = await F.outerJoin((v1,v2) => v1.id === v2.id, a, b);
const r = await F.collect(j)
console.log(r);
// print
// [{id:1, name:"foo", value:3},
// {id:2, name:"bar", value:4},
// {id:3, name:"hoo"}]
```


### rightOuterJoin
support Map, object({})
```javascript
const a = [{id:1, value:3}]; 
const b = [{id:1, name:"foo"}, {id: 1, name:"bar"}, {id: 1, name:"hoo"}];
const j = await F.rightOuterJoin((v1,v2) => v1.id === v2.id , a, b);
const r = await F.collect(j);
console.log(r);
// print
// [{id:1, name:"foo", value:3},
// {id:1, name:"bar", value:3},
// {id:1, name:"hoo", value:3}]
```


### then
like promise then

see also [tap](#tap)
```javascript
const v = await F.run([1,2,3,4,5],
    F.then(async function*(iter) {
        for await(const e of iter) {
            console.log(e);
            yield e;
        }
    }),
    F.map(e => e + 1),
    F.collect);
console.log(v);
//print
//1
//2
//3
//4
//5
//[2,3,4,5,6]
```
```javascript
const v = await F.run([1,2,3,4,5],
    F.then(iter => {
        return iter; //do nothing
    }),
    F.collect);
console.log(v);
// print
// [1,2,3,4,5]
```


### tap
call first argument with second argument

then returns the second argument

return promise wrap

see also [then](#then)

see also [peek](#peek)
```javascript
const v = await F.run([1,2,3,4,5],
    F.tap(console.log), //print and return Promise([1,2,3,4,5])
    F.map(e => e + 1),
    F.collect);
```


### concat
combines two iterables
```javascript
const c = F.concat([1,2,3],[4,5,6]);
for await(const e of c) {
    console.log(e);
}
//print [1,2,3,4,5,6]
```
```javascript
const v = await F.run(
    F.concat([1,2,3],[4,5,6]),
    F.collect);
console.log(v);
//print [1,2,3,4,5,6]
```


### union
same as [concat](#concat)


### scanl
```javascript
const s = F.scanl((a,b) => a + b, 0, [1,2,3]);
const r = await F.collect(s);
console.log(r);
//print [0,1,3,6]
```
```javascript
const r = F.scanl((a, b) => a/b, 64, [4,2,1]);
const r = await F.collect(s);
console.log(r);
//print [64,16,8,8]
```


### scanl1
```javascript
const s = F.scanl((a,b) => a + b, [1,2,3]);
const r = await F.collect(s);
console.log(r);
//print [1,3,6]
```
```javascript
const r = F.scanl1((a, b) => a/b, [64,4,2,1]);
const r = await F.collect(s);
console.log(r);
//print [64,16,8,8]
```


### buffer
creates a list by dividing the iterator at specified interval
```javascript
const b = F.buffer(1, [1,2,3,4,5]);
const c = await F.collect(b);
console.log(c); //print [[1],[2],[3],[4],[5]]
```
```javascript
const b = F.buffer(2, [1,2,3,4,5]);
const c = await F.collect(b);
console.log(c); //print [[1,2],[3,4],[5]]
```


### peek
function that perform a function on each element like a [map](#map) but returns the original instead of the result

this function is useful for debugging.

see also [tap](#tap)
```javascript
const v = await F.run([1,2,3,4,5],
    F.map(e => e + 1),
    F.peek(console.log),
    F.map(e => e + 1),
    F.collect);
//print 
//2
//3
//4
//5
//6
```
```javascript
const a = [1,2,3,4,5];
const p = F.peek(e=> e + 1, a)
const result = await F.collect(p);
console.log(result); //not change 
//print [1,2,3,4,5]
```


### juxtA
```javascript
const a = await F.juxtA([Math.max, Math.min], [1,2,3,4,5]);
console.log(a);
//print [5,1]
```
```javascript
const a = await F.juxtA([Math.max, Math.min], []);
console.log(a);
//print [undefined, undefined]
```


### parallel_set_fetch_count
Set the fetch count of the parallel functions. 

after setting, the parallel function is called by count at the same time.


**default fetch count is 100**
```javascript
F.parallel_set_fetch_count(3);

await F.run(
    F.range(Infinity),
    F.pmap(async e =>{
        console.log(e);
        return e + 1;
    }),
    F.take(1),
    F.collect);
//print
//0
//1
//2
```
```javascript
F.parallel_set_fetch_count(200);

await F.run(
    F.range(Infinity),
    F.pmap(async e =>{
        console.log(e);
        return e + 1;
    }), // fetch and execute first [0..199]
    F.take(1), // take 0 and execute 200. in pmap:[3..102]
    F.collect);
//print
//0
//1
//2
//3
//4
//5
//...
//...
//198
//199
//200
```


### pfilter
Same as [filter](#filter), but calls a [fetch count](#parallel_set_fetch_count) of functions concurrently. 


useful for async function or return promise.
```javascript
//F.parallel_set_fetch_count(100);  default is 100
const v = await F.run(
    F.range(Infinity),
    F.pfilter(async e =>{
        console.log(e);

        //somthing async work...

        return e % 2 === 0;
    }),// fetch and execute first [0..99]
    F.take(2),// take 2 and execute 100, 101, 102 in pmap:[3..102]
    F.collect);
console.log(v);
//print
//1
//2
//3
//...
//...
//99
//[0,2]
```


### pmap
Same as [map](#map), but calls a [fetch count](#parallel_set_fetch_count) of functions concurrently. 


useful for async function or return promise.
```javascript
//F.parallel_set_fetch_count(100); default is 100
const v = await F.run(
    F.range(Infinity),
    F.pmap(async e =>{
        console.log(e);

        //somthing async work...

        return e + 1;
    }), // fetch and execute first [0..99]
    F.take(2), // fetch 0, 1, excute 100, 101 in pmap:[2..101]
    F.collect);
console.log(v);
//print
//0
//1
//2
//...
//...
//99
//100
//101
//[1,2]
```


### pfmap
Same as [fmap](#fmap), but calls a [fetch count](#parallel_set_fetch_count) of functions concurrently. 


useful for async function or return promise.
```javascript
// F.parallel_set_fetch_count(100); default is 100
const v = await F.run(
    F.range(Infinity),  //0,1,2,...
    F.map(e=> [e]),     //[0],[1],[2]...
    F.pfmap(async e =>{
        console.log(e); //print [0] ...

        //somthing async work...

        e.push(42);     // [0,42],[1,42],[2,42]... 
        return e ;
    }),
    F.take(5),          //[0,42,1,42,2]
    F.collect);         //iterator to array
console.log(v);
//print
//[0]
//[1]
//[2]
//...
//...
//[99]
//[0,42,1,42,2]
```


### pcalls
1. async function generator
```javascript
const gfn2 = async function* () {
    yield _ => Promise.resolve(1);
    yield _ => 2;
    yield async _ => await Promise.resolve(3);
    yield async _ => await 4;
};
const c = F.pcalls(gfn2());
const r = await F.collect(c);
console.log(r);
//print [1,2,3,4]
```
2. call vaarg async functions
```javascript
/*like*/Promise.all([fn1(),fn2(),fn3(),fn4()])
```
```javascript
const fn1 = () => {
    return 1;
};
const fn2 = () => {
    return Promise.resolve(2);
};
const fn3 = async () => {
    return 3;
};
const fn4 = async () => {
    return Promise.resolve(4);
};
const c = F.pcalls(fn1, fn2, fn3, fn4);
const r = await F.collect(c);
console.log(r); //print [1,2,3,4]
```


### reFind
Use regular expression
return first matching in str
```javascript
const r = F.reFind(/H(\d)/, "H1ello H2World");
console.log(r); // print H1
```


### reFindSubmatch
Use regular expression
return first matching in str and groups
```javascript 
const r = F.reFindSubmatch(/H(\d)/, "H1ello H2World");
console.log(r[0]); // print H1
console.log(r[1]); // print 1
```


### reFindAll
Use regular expression
return all matching in str
```javascript
const r = F.reFindAll(/H(\d)/, "H1ello H2World");
console.log(r);
//print ['H1', 'H2']
```


### reFindAllSubmatch
Use regular expression
return all matching in str and groups
```javascript
const r = F.reFindAllSubmatch(/H(\d)/, "H1ello H2World");
console.log(r[0][0]); // print H1
console.log(r[0][1]); // print 1

console.log(r[1][0]); // print H2
console.log(r[1][1]); // print 2
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
```javascript
const r = F.repeat(3, 5);
for await(const e of r) {
    console.log(e);
}
//print 
//5
//5
//5
```


### rangeInterval
first argument is set to the repeat interval 
```javascript
for await (const e of F.rangeInterval(100, 5)) {
    console.log(e);
}
//print
// [sleep 100]
// 0
// [sleep 100]
// 1
// [sleep 100]
// 2
// [sleep 100]
// 3
// [sleep 100]
// 4
// [sleep 100]
```
```javascript
for await (const e of F.rangeInterval(100, 5, 0, -1)) {
    console.log(e);
}
//print
// [sleep 100]
// 5
// [sleep 100]
// 4
// [sleep 100]
// 3
// [sleep 100]
// 2
// [sleep 100]
// 1
// [sleep 100]
```


### iterate
apply a function to an argument to produce a sequence
```javascript
const r = await F.run(
            F.iterate(F.inc, 1),
            F.take(5),
            F.collect);
console.log(r);
//print 
//[1,2,3,4,5]
```
```javascript
const fibo = (a) => [a[1], a[0] + a[1]];
const r = await F.run(
    F.iterate(fibo, [0, 1]),//[0, 1], [1, 1], [1, 2], [2, 3] ...
    F.map(F.head),//[0,1,1,2 ... 
    F.take(10),//[0,1,1,2,3,5,8,13,21,34]
    F.collect);//generator to array
console.log(r);
//print
//[0,1,1,2,3,5,8,13,21,34]
```


### enumerate
like python enumerate
```javascript
const arr = ["a", "b", "c", "d", "e"];
for await (const [i, e] of F.enumerate(arr)) {
   console.log(i, e);
}
//print
// 0 'a'
// 1 'b'
// 2 'c'
// 3 'd'
// 4 'e'
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
take 1 items and call [foldl](#foldl)
```javascript
const a = [1,2,3,4,5];
const sum = await F.foldl1((acc, e) => acc + e, a); 
console.log(sum); // print 15;
```


### reduce
same as [foldl1](#foldl1)
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


### foldr1
```javascript
const arr = [1,2,3,4,5];
const r = await F.foldr1((a, b) => a + b, 0, arr);
console.log(r); // print 15
```
```javascript
const arr = [64,2,1];
const r = await F.foldr1((a, b) => a / b, arr);
console.log(r); // print 32
```
```javascript
const arr = ["1","2","3","4","5"];
const r = await F.foldr1((a, b) => a + b, arr);
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


### collectObject
```javascript
const a = [[1,2],[3,4]];
const m = await F.collectObject(a); // {1:2,3:4}
console.log(m);
//print { '1': 2, '3': 4 }
```


### collectInt8
collect native array(char)

support async generator(collect + Int8Array.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectInt8(arr);
console.log(c); 
//print Int8Array [ 1, 2, 3, 4 ]
```


### collectInt16
collect native array(short)

support async generator(collect + Int16Array.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectInt16(arr);
console.log(c); 
//print Int16Array [ 1, 2, 3, 4 ]
```


### collectInt32
collect native array(int32)

support async generator(collect + Int32Array.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectInt32(arr);
console.log(c); 
//print Int32Array [ 1, 2, 3, 4 ]
```


### collectUint8
collect native array(unsigned char)

support async generator(collect + Uint8Array.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectUint8(arr);
console.log(c); 
//print Uint8Array [ 1, 2, 3, 4 ]
```


### collectUint16
collect native array(unsigned short)

support async generator(collect + Uint16Array.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectUint16(arr);
console.log(c); 
//print Uint16Array [ 1, 2, 3, 4 ]
```


### collectUint32
collect native array(unsigned int32)

support async generator(collect + Uint32Array.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectUint32(arr);
console.log(c); 
//print Uint32Array [ 1, 2, 3, 4 ]
```


### collectUint8Clamped
collect native array(unsigned char)

support async generator(collect + Uint8ClampedArray.from)

if the element is not a number, 0 is assigned

see also [collect](#collect)
```javascript
const arr = [1,2,3,4];
const c = await F.collectUint8Clamped(arr);
console.log(c); 
//print Uint32Array [ 1, 2, 3, 4 ]
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


### average
```javascript
const a = [1,2,3,4,5];
const s = await F.average(a);
console.log(s); // print 3
```
```javascript
const a = [1.0,2.0,3.0,4.0,5.5];
const s = await F.average(a)
console.log(s); //print 3.1
```


### groupBy
returns a Map that is aggregated through a function. 

key is the return value of the function, and value is the source.
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


### orderBy
```javascript
const a = [{ year: 1990 }, { year: 2005 }, { year: 1958 }];

const ASC = 'ASC'; // or 'asc'
const DESC = 'desc'; // or 'DESC'

const sortedByASC0 = F.sortBy(e => e.year, F.asc, a);
const sortedByASC1 = F.sortBy(e => e.year, ASC, a);
const sortedByDESC0 = F.sortBy(e => e.year, F.desc, a);
const sortedByDESC1 = F.sortBy(e => e.year, DESC, a);

await F.collect(sortedByASC0);
// [{ year: 1958 }, { year: 1990 }, { year: 2005 }]
await F.collect(sortedByDESC1);
// [{ year: 2005 }, { year: 1990 }, { year: 1958 }]
```

```javascript
const a = [3, 6, 2, 3, 7, 10, 23, 21, 22, 16, 13, 14, 17, 20];

const sortedByASC = F.sortBy(e => e, F.asc, a);
const sortedByDESC = F.sortBy(e => e, F.desc, a);

await F.collect(sortedByASC);
// [2, 3, 3, 6, 7, 10, 13, 14, 16, 17, 20, 21, 22, 23]
await F.collect(sortedbyDESC);
// [23, 22, 21, 20, 17, 16, 14, 13, 10, 7, 6, 3, 3, 2]
```

```javascript
const a = 'Haskell Brooks Curry';

const sortedByASC = F.sortBy(e => e, F.asc, a);
const sortedByDESC = F.sortBy(e => e, F.desc, a);

await F.collect(sortedByASC).then(e => [e.join('')]);
// ['  BCHaekklloorrrssuy']
await F.collect(sortedByDESC).then(e => [e.join('')]);
// ['yussrrroollkkeaHCB  ']
```


### order
```javascript
const a = [3, 6, 2, 3, 7, 10, 23, 21, 22, 16, 13, 14, 17, 20];

const sortedByASC = F.sort(F.asc, a);
const sortedByDESC = F.sort(F.desc, a);

await F.collect(sortedByASC);
// [2, 3, 3, 6, 7, 10, 13, 14, 16, 17, 20, 21, 22, 23]
await F.collect(sortedbyDESC);
// [23, 22, 21, 20, 17, 16, 14, 13, 10, 7, 6, 3, 3, 2]
```

```javascript
const a = 'Haskell Brooks Curry';

const sortedByASC = F.sort(F.asc, a);
const sortedByDESC = F.sort(F.desc, a);

await F.collect(sortedByASC).then(e => [e.join('')]);
// ['  BCHaekklloorrrssuy']
await F.collect(sortedByDESC).then(e => [e.join('')]);
// ['yussrrroollkkeaHCB  ']
```


### sortBy
sorts an array

Returns a new sorted array.

```javascript
const arr = [4, 3, 2, 5, 1];
const res = await F.sortBy((a, b) => a - b, arr);
console.log(res); // print [1,2,3,4,5]
```


### sort
sorts an array

Returns a new sorted array.

```javascript
const arr = [4, 3, 2, 5, 1];
const res = await F.sortBy(arr);
console.log(res); // print [1,2,3,4,5]
```


### frequencies
returns a Map. keys are the items that remove duplicates
value is the number of times key appears
```javascript
const arr = [1,1,2,3,4,5,5];
const r = await F.frequencies(arr);
console.log(r);
//print
//Map { 1 => 2, 2 => 1, 3 => 1, 4 => 1, 5 => 2 }
```


### frequenciesBy
returns a Map. keys are the items that remove duplicates
value is the number of times key appears
```javascript
const arr = [1,1,2,3,4,5,5];
const r = await F.frequenciesBy(F.identity, arr);
console.log(r);
//print
//Map { 
//      1 => 2, 
//      2 => 1, 
//      3 => 1, 
//      4 => 1, 
//      5 => 2 }
```
```javascript
const obj = [{a:1},{a:2},{a:1},{a:3}];
const r = await F.frequenciesBy(e => e.a, obj);
console.log(r);
//print
//Map { 
//      1 => 2, 
//      2 => 1, 
//      3 => 1 }
```


### associateBy
returns a Map using iterator.
when the function returns Array

it uses the first argument as key and the second argument as value.

when not in an array, the key and value are both return values.
```javascript
const arr0 = [1, 2, 3];
const m0 = await F.associateBy(e => [e, e * 2], arr0);
console.log(m0);
//print Map { 1 => 2, 2 => 4, 3 => 6 }
```
```javascript
const arr1 = [1, 2, 3];
const m1 = await F.associateBy(e => e + 1, arr1);
console.log(m1);
//print Map { 2 => 2, 3 => 3, 4 => 4 
 ```


### block
1. await promise
2. Fetch all the elements of type iterator. 
    When an element returns a promise, it waits for it to finish. 
3. Fetch all elements of async iterator type.
```javascript
const r = await F.run([1,2,3,4,5],
    F.map(SomethingNetworkJob), 
    F.map(console.log),
    F.block);
```
```javascript
const somethingNetworkJob = Promise.resolve(1);
const somthingNetworkIterator = async function*() {
    yield 1;
};
await F.block(somethingNetworkJob, somthingNetworkIterator());
```


### _
always returns true when used in [equals](#equals)

always matches when used in [match](#match)
```javascript
const r = F.equals(1, F._);
console.log(r); 
//print true
```
```javascript
const value = [1, 2];
F.match(value,
    [0, 1], () => console.log("match [0, 1]"),
    F._, () => console.log("match F._")
);
//print match F._
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


### interval
works like built-in function setInterval
- timer works same time start of the function
- available async function.
- only one function is executed at a time.
```javascript
F.interval(10, async () => {
    await F.sleep(1000);
    console.log("WORK!");
});
///print 
//WORK!
// 1 sec 
//WORK!
// 1 sec
//... 
```

### timeout
@changed iterator timeout use [withTimeout](#withtimeout) instead.

```javascript
const foo = async () => {
    await F.sleep(1);/*something work*/
    return 1;
};
const v = await F.timeout(40, foo());
console.log(v);
//print 1;
```

```javascript
try{
    await F.timeout(40, async ()=>{
        await F.sleep(1000);
    });
} catch(e) {
   console.log(e); 
}
//print
//timeout error
//callstack...
```

### withTimeout

it is effective to use timeout at the bottom of the [run](#run)

```javascript
const res = [];
try{
    const iter = await F.run(
        F.range(Infinity),
        F.map(e => e + 1),
        F.map(async e => {
            await F.sleep(5);
            return e;
        }),
        F.take(10)
        F.withTimeout(40));
    
    for await (const e of iter) {
        res.push(e);
    }
} catch(ex) {
    console.log(ex);
}
console.log(res);
//print 
//timeout error
//callstack...
//[1,2,3,4,5,6]
```
```javascript
try{
    const a = [1,2,3,4,5];
    const t = F.withTimeout(50, 
        F.map(async e => {
            await F.sleep(5);
            return e;
        }, a));
    const v = await F.collect(t);
    console.log(v);
}catch(ex) {
    console.log(ex);
}
//print 
//timeout error
//callstack....
```


### isNil
return false null, undefined, NaN true otherwise
```javascript
console.log(F.isNil(NaN)); // true
console.log(F.isNil(undefined)); //true
console.log(F.isNil(null)); //true
console.log(F.isNil("null")); // false 
console.log(F.isNil("NaN")); //false
console.log(F.isNil(0)); // false
console.log(F.isNil(false)); // false
console.log(F.isNil([])); // false
console.log(F.isNil({})); // false
```


### cond
Requires an even number of arguments

if the first argument is true, it returns the second argument
```javascript
const r = await F.cond( 
    false, "ff",
    true, "tt",
    F.otherwise, "oo"
);
console.log(r); // "tt"
```
```javascript
const r = await F.cond( 
    Promise.resolve(false), "ff",
    Promise.resolve(true), "tt",
    F.otherwise, "oo"
);
console.log(r); // "tt"
```


### otherwise
```javascript
if (F.otherwise) {
    console.log("WORK!");
}
if (F.otherwise()) {
    console.log("WORK!");
}
//print 
//WORK!
//WORK!
```


### get 
call **get** function or object property

if there is no value, returns undefined

see also [prop](#prop)
see also [getOrElse](#getorelse)
```javascript
const obj = { name: "hello", value: 42 };
console.log(F.get("name", obj)); //print hello
```
```javascript
const m = new Map([
    ["name", "hello map"]
]);
console.log(F.get("name", m)); //print hello map
console.log(F.get("size", m)); //print 1
```


### getOrElse
if object have a get function, 

call it or get the properties of that object. 

if there is no value, it returns defaultValue.

support Map, Set, any Object

see also [get](#get)
```javascript
const m = new Map([
    ["name", "hello map"],
    ["value", 84]
]);
const r0 = F.getOrElse("name", "world", m);
console.log(r0); // print hello map

const r1 = F.getOrElse("foo", "world", m);
console.log(r1); // print world
```


### prop
get object property

if there is no value, returns undefined

see also [get](#get)


```javascript
const obj = { name: "hello", value: 42 };
console.log(F.prop("name", obj)); //print hello
```


### propOrElse
get the properties of that object. 

if there is no value, it returns defaultValue.

see also [prop](#prop)
```javascript 
const arr = [1, 2, 3];
const r0 = F.propOrElse("0", 100, arr); // arr[0]
console.log(r0); // print 1

const r1 = F.propOrElse("5", 100, arr); // arr[100]
console.log(r1); // print 100
```
  


### has
if there is a **has** function, check if the value is true after the call. if the **has** function is missing or returned false, check that the property is not undefined.

```javascript
const r = F.has("hello", {hello:"world"});
console.log(r); //print true
```
```javascript
const r = F.has("hello", new Map([["hello","world"]]));
console.log(r); //print true
```
```javascript
const r = F.has("size", new Map());
console.log(r); //print true
```


### find
```javascript
const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
const r = await F.find(e => "a" in e , arr);
console.log(r); // print {a:"a1"}
```
```javascript
const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
const r = await F.find(e => "hello" in e , arr);
console.log(r); // print undefined
```


### find
returns first element
```javascript
const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
const r = await F.find(e => "a" in e , arr);
console.log(r); // print {a:"a1"}
```
```javascript
const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
const r = await F.find(e => "hello" in e , arr);
console.log(r); // print undefined
```


### findLast
returns last element
```javascript
const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
const r = await F.findLast(e => "a" in e , arr);
console.log(r); // print {a:"a3"}
```
```javascript
const arr = [{a:"a1"}, {b:"a2"}, {a:"a3"}];
const r = await F.findLast(e => "hello" in e , arr);
console.log(r); // print undefined
```

### memoize
result of the call is stored in the internal cache, and the next call returns the result of the cache

function returns promise
```javascript
const memFn = () => {
    console.log("callOnce");
};
const m = F.memoize(memFn);
await m(); 
await m(); 
await m(); 
//print
//callOnce
```
```javascript
const beginTime = Date.now();
const memFibo = F.memoize(async (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return await memFibo(n - 1) + await memFibo(n - 2);
});
console.log(await memFibo(30));
console.log(`Elapsed time:${Date.now()-beginTime}msec`);
// print
// 832040
// Elapsed time:1msec
```

### memoizeBy
result of the call is stored in the internal cache, and the next call returns the result of the cache

first argument is the key value to be stored in the internal cache

function returns promise
```javascript
const memFn = () => {
    console.log("callOnce");
};
const m = F.memoizeBy(F.identity, memFn);
await m(); 
await m(); 
await m(); 
//print
//callOnce
```
```javascript
const beginTime = Date.now();
const memFibo = F.memoizeBy(F.identity, async (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return await memFibo(n - 1) + await memFibo(n - 2);
});
console.log(await memFibo(30));
console.log(`Elapsed time:${Date.now()-beginTime}msec`);
// print
// 832040
// Elapsed time:1msec
```


### random
internally use crypto.randomBytes 
```javascript
const r0 = F.random(); // print 0 ~ 4294967295
const r1 = F.random(10); // print 0 ~ 9
const r2 = F.random(1, 42); // print 1 ~ 41, maximum range: 4294967295 
```

### equals
compares deep strict equals
```javascript
const a = 1;
F.equals(a, 1); // true
F.equals(a, 0); // false
```
```javascript
const o = {a:1};
F.equals({a:1}, o); // true
```
```javascript
F.equals(NaN, NaN); // true
F.equals([0,1], [0,1]); // true
```


### shuffle
return a random permutation of iterator

**await** is not required to use for an array.
```javascript
const arr = [1,2,3,4,5];
const sf = F.shuffle(arr);
console.log(sf);
//print [5,3,2,1,4]
```
```javascript
const a = function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};
const sf = await F.shuffle(a()); // await required
console.log(sf);
//print [5,3,2,1,4];
```
```javascript
const a = async function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};
const sf = await F.shuffle(a()); // await required
console.log(sf);
//print [5,3,2,1,4];
```


### sample
return a random element of iterator

**await** is not required to use for an array.
```javascript
const r = F.sample([1,2,3,4,5,6]);
console.log(r); //print 1 ~ 6 random
```
```javascript
const r = await F.sample(F.range(100));
console.log(r); //print 0 ~ 100 random 
```


### match
pattern matching

call or return first match

From the second argument requires a pair of arguments. 

 pair first argument is the value to compare, second argument is the function to use

[F._](#_) matches all patterns.

see also [_](#_)
```javascript
const value = [1, 2];

F.match(value,
    [0, 1], () => console.log("match [0, 1]"),
    [1, F._], () => console.log("match [1, any]")
);

//print match [1, any]
```
```javascript
const value = [1, 2];
const res = F.match(value,
    [0, 1], () => 3,
    [1, 2], () => 4
);
console.log("match returns " + res);
//print match 4
```


### fnil
first argument is the calling function. from the second argument, 

the argument is entered as the first argument.

returns a function calls first argument,

if a function has a argument, it acts as a substitute for an existing argument.
```javascript
function sayHello(who) {
    console.log("hello " + who);
}

const sayHelloWithDefault = F.fnil(sayHello, "javascript");
sayHelloWithDefault(); // print hello javascript
sayHelloWithDefault("leanne"); // print hello leanne
```


### assign
curry with Object.assign

Returns the target object.
```javascript
const obj0 = { a: 1 };
const obj1 = { b: 1 };
const r = F.assign(obj0);
console.log(r(obj1));
//print { a: 1, b: 1 };
```


### assign3
curry with Object.assign

Returns the target object.

must have at least 3 arguments
```javascript
const obj0 = { a: 1 };
const obj1 = { b: 1 };
const obj2 = { c: 1 };
const r = F.assign3(obj0, obj1);
console.log(r(obj2));
//print { a: 1, b: 1, c: 1 };
```

### mergeMap
Create a new Map by combining the arguments of the function.

If the key exists, the value on the right is used.
```javascript
const m1 = new Map([[1, 2], [3, 4]]);
const m2 = new Map([[5, 6], [7, 8]]);
const r1 = await F.mergeMap(m1, m2);
console.log(r1); // print Map { 1 => 2, 3 => 4, 5 => 6, 7 => 8 }

const m3 = new Map([[1, 2], [3, 4]]);
const o1 = { 5: 6, 7: 8 };
const r2 = await F.mergeMap(m3, o1);
console.log(r2); // print Map { 1 => 2, 3 => 4, '5' => 6, '7' => 8 }
```


### mergeMapRight
Create a new Map by combining the arguments of the function.

If the key exists, the value on the left is used.
```javascript
const m1 = new Map([[1, 2], [3, 4]]);
const m2 = new Map([[5, 6], [7, 8]]);
const r1 = await F.mergeMapRight(m1, m2);
console.log(r1); // print Map { 5 => 6, 7 => 8, 1 => 2, 3 => 4 }

const m2 = new Map([[1, 2], [3, 4]]);
const o2 = { 5: 6, 7: 8 };
const r2 = await F.mergeMapRight(m2, o2);
console.log(r2); // Map { '5' => 6, '7' => 8, 1 => 2, 3 => 4 }
```


### mergeObject
Create a new object by combining the arguments of the function.

If the key exists, the value on the right is used.
```javascript
const m1 = new Map([[1, 2], [3, 4]]);
const o1 = { 5: 6, 7: 8 };
const r1 = await F.mergeObject(m1, o1);
console.log(r1); // print { '1': 2, '3': 4, '5': 6, '7': 8 }
```


### mergeObjectRight
Create a new object by combining the arguments of the function.

If the key exists, the value on the left is used.

```javascript
const m1 = new Map([[1, 2], [3, 4]]);
const o1 = { 5: 6, 7: 8 };
const r1 = await F.mergeObjectRight(m1, o1);
console.log(r1); // print { '1': 2, '3': 4, '5': 6, '7': 8 }

```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frudty%2Fnodekell.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frudty%2Fnodekell?ref=badge_large)
