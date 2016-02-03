import types,{isFunc,isBool,isArr,isStr} from './types';
import {IB_TYPE} from './constans';

const ws_reg = /^(\s|\n\t)+$/

let pathCache = {}

const parsePath = path=>{
    if(pathCache[path]) return pathCache[path]
	let res = [], l = 0
	for (var i = 0; i < path.length; i++) {
		if (path[i] == '.' || path[i] == '[' && i != 0) {
			l++
		} else if (path[i] != ']' && path[i] != '[' && !ws_reg.test(path[i])) {
			res[l] = res[l] || ''
			res[l] += path[i]
		}
	}
    pathCache[path] = res
	return res
}

export let createWrapper = context => (name,func) => context[name] = func(context[name]);

export function toArray(){
	var args = arguments;
	return args.length == 1 ? Array.prototype.slice.apply(args[0]) : toArray(args);
}

export function shallowExtend(obj1,obj2,callback){
	if(obj1){
		if(obj2){
			for(var name in obj2){
				if(isFunc(callback) && !callback(obj2[name],name)) continue;
				if(obj2.hasOwnProperty(name)){
					obj1[name] = obj2[name];
				}
			}
		}
		return obj1;
	} else {
		return obj2;
	}
}

export function extend(){
	var args = toArray(arguments),argLength,filter;
	if(isFunc(args[args.length - 1]) && isBool(args[0]) && args[0] === true){
		filter = args[args.length - 1];
		args = args.slice(1,args.length -2);
	}
	argLength = args.length;
	if(argLength == 1){
		return args[0];
	} else if(argLength == 2){
		return shallowExtend(args[0],args[1],filter);
	} else if(argLength > 2){
		return shallowExtend(args[0],extend.apply(null,args.slice(1)),filter);
	}
}

export function createKeyWordsFilter(keywords){
	return (_,key)=>{
		return keywords.indexOf(key) > -1;
	};
}


export function resolveGetterPath(path) {
    return isArr(path) ? path : isStr(path) ? parsePath(path) : []
}

export function isImmutable(data){
	return data && data[IB_TYPE];
}

export function getProto(obj){
	return isFunc(obj) ? obj.prototype : obj;
}

export function isValid(obj){
	return obj !== undefined && obj !== null;
}


export default {
	createWrapper,
	toArray,
	types,
	shallowExtend,
	extend,
	isValid,
	createKeyWordsFilter,
	resolveGetterPath,
	isImmutable,
	getProto
};

