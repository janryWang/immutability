'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
//types.js
var isType = function isType(type) {
  return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
};
exports.isType = isType;
var isObj = isType('Object');
exports.isObj = isObj;
var isStr = isType('String');
exports.isStr = isStr;
var isNum = isType('Number');
exports.isNum = isNum;
var isReg = isType('RegExp');
exports.isReg = isReg;
var isBool = isType('Boolean');
exports.isBool = isBool;
var isFunc = isType('Function');
exports.isFunc = isFunc;
var isArr = Array.isArray || isType('Array');
exports.isArr = isArr;