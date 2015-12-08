//types.js
export let isType = type => obj => obj != null && Object.prototype.toString.call(obj) === `[object ${ type }]`
export let isObj = isType('Object')
export let isStr = isType('String')
export let isNum = isType('Number')
export let isReg = isType('RegExp')
export let isBool = isType('Boolean')
export let isFunc = isType('Function')
export let isArr = Array.isArray || isType('Array')

export default {
	isType,
	isObj,
	isStr,
	isNum,
	isReg,
	isBool,
	isFunc,
	isArr
}