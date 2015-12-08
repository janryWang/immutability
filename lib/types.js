'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
//types.js
var isType = exports.isType = function isType(type) {
	return function (obj) {
		return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
};
var isObj = exports.isObj = isType('Object');
var isStr = exports.isStr = isType('String');
var isNum = exports.isNum = isType('Number');
var isReg = exports.isReg = isType('RegExp');
var isBool = exports.isBool = isType('Boolean');
var isFunc = exports.isFunc = isType('Function');
var isArr = exports.isArr = Array.isArray || isType('Array');

exports.default = {
	isType: isType,
	isObj: isObj,
	isStr: isStr,
	isNum: isNum,
	isReg: isReg,
	isBool: isBool,
	isFunc: isFunc,
	isArr: isArr
};