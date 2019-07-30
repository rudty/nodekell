"use strict";
const F = require("../index");
const assert = require("assert");

describe('test fnil', () => {
    it('sayhello', async () => {
        function sayHello(who) {
            return "hello " + who;
        }

        const sayHelloWithDefault = F.fnil(sayHello, "javascript");
        assert.deepStrictEqual(sayHelloWithDefault(),"hello javascript");
        assert.deepStrictEqual(sayHelloWithDefault("leanne"), "hello leanne");
    });

    it('no arg', async () => {
        function fn0() {
            return "hello world";
        }
        const fn0WithDefault = F.fnil(fn0);
        assert.deepStrictEqual(fn0WithDefault(),"hello world");
        assert.deepStrictEqual(fn0WithDefault(1,2,4,3,56,7,8,9,9,1,23,1,1),"hello world");

        const fn0WithDefault2 = F.fnil(fn0,1,{},3,5);
        assert.deepStrictEqual(fn0WithDefault2(),"hello world");
    });
    
    it('arg2', async () => {
        function fn2(a,b) {
            return "hello world" + a + b;
        }
        const fn2WithDefault = F.fnil(fn2,"a",3);
        assert.deepStrictEqual(fn2WithDefault(),"hello worlda3");
        assert.deepStrictEqual(fn2WithDefault("c"),"hello worldc3");
        assert.deepStrictEqual(fn2WithDefault(1,2,4,3,56,7,8,9,9,1,23,1,1),"hello world12");
    });

});