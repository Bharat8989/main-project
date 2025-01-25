var assert = require('assert')
var stringFun = require("../index.js")


describe('StringFun', function(){
    it('should return the uppercase version of the string', function(){
		var str = "hello world";
		var strUpper = stringFun.upperCase(str);
		assert.strictEqual(strUpper, "HELLO WORLD");
    })
})