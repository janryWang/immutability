import Immutable,{fromJS,toJS,is,Iterable} from 'immutable';
import {Component} from 'react';

const NativeSetState = Component.prototype.setState;

const IBGetIn = Immutable.Collection.prototype.getIn;

const IB_DATA = '@@_IB_DATA_@@',IB_TYPE ='@@__IMMUTABLE_ITERABLE__@@',PACK_GETIN = '@@_pack_getIn_@@';

const DEFAULT_KEYWORDS = ['constructor','setState','getState'];

const Utils = {

	toArray(){
		var args = arguments;
		return args.length == 1 ? Array.prototype.slice.apply(args[0]) : Utils.toArray(args);
	},

	isFunction(val){
		return Object.prototype.toString.call(val) === '[object Function]';
	},

	isNumber(val){
		return Object.prototype.toString.call(val) === '[object Number]';
	},

	isBoolean(val){
		return Object.prototype.toString.call(val) === '[object Boolean]';
	},

	isObject(val){
		return Object.prototype.toString.call(val) === '[object Object]';
	},

	isString(val){
		return Object.prototype.toString.call(val) === '[object String]';
	},

	isArray(val){
		return Object.prototype.toString.call(val) === '[object Array]';
	},

	isRegExp(val){
		return Object.prototype.toString.call(val) === '[object RegExp]';
	},

	resolveGetterPath(path) {
		function parse(path) {
			var res = [], l = 0;
			for (var i = 0; i < path.length; i++) {
				if (path[i] == '.' || path[i] == '[') {
					l++;
				} else if (path[i] != ']') {
					res[l] = res[l] || '';
					res[l] += path[i]
				}
			}
			return res;
		}

		return Utils.isArray(path) ? path : Utils.isString(path) ? parse(path) : [];
	},

	isImmutable(data){
		return data && data[IB_TYPE];
	}

};



const MixinMethods = {
	...Immutable,
	setState(nextState,callback){
		var preState = this.state[IB_DATA];
		if(Utils.isFunction(nextState)){
			nextState = nextState.call(this,preState,this.props);
		}

		if(Utils.isObject(nextState) || Utils.isArray(nextState)){
			if(preState){
				nextState = {
					[IB_DATA]:Utils.isImmutable(preState) ? preState.merge(nextState) : fromJS(preState).merge(nextState)
				}
			} else {
				nextState = {
					[IB_DATA]:fromJS(this.state).merge(nextState)
				}
			}

			return NativeSetState.call(this,nextState,callback);
		}

	},
	getState(path){
		if(!this.state) return {};
		var selfState = this.state[IB_DATA];
		if(!path) return selfState ? selfState : fromJS(this.state);
		if(selfState){
			return selfState.getIn(path);
		} else {
			return fromJS(this.state).getIn(path);
		}

	},
	shouldComponentUpdate(newProps, newState) {
		return !is(this.props,newProps) || !is(newState[IB_DATA],this.state[IB_DATA]);
	},
	getCurrentState(immutable){
		let state = this.getState();
		return state ? immutable ? state : state.toJS() : {};
	},

	getAllState(vars){
		vars = vars.replace(/(\n|\s)*/g, "");
		let arrays = /\[([^\[\]]+)\]/.exec(vars);
		let objs = /\{([^{}]+)\}/.exec(vars);
		let self = this;
		arrays = arrays ? arrays[1] : null;
		objs = objs ? objs[1] : null;
		if (arrays) {
			arrays = arrays.split(",");
			return arrays.map((_var_)=> {
				return self.getState(_var_);
			})
		}
		if (objs) {
			objs = objs.split(",");
			return objs.reduce((res, _var_)=> {
				res[_var_] = self.getState(_var_);
				return res;
			}, {})
		}
	}
};



function shallowExtend(obj1,obj2,callback){
	if(obj1){
		if(obj2){
			for(var name in obj2){
				if(Utils.isFunction(callback) && !callback(obj2[name],name)) continue;
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

function extend(){
	var args = Utils.toArray(arguments),argLength,filter;
	if(Utils.isFunction(args[args.length - 1]) && Utils.isBoolean(args[0]) && args[0] === true){
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

function createKeyWordsFilter(keywords){
	return (_,key)=>{
		return keywords.indexOf(key) > -1;
	};
}


function getIn(path){
	if(Iterable.isIterable(path)) return IBGetIn.call(this,path);
	if(Utils.isArray(path)) return IBGetIn.call(this,path);
	if(Utils.isString(path)) return IBGetIn.call(this,Utils.resolveGetterPath(path));
	return {};
}

getIn[PACK_GETIN] = true;

Immutable.Collection.prototype.getIn = getIn;

function getProto(obj){
	return Utils.isFunction(obj) ? obj.prototype : obj;
}

function IBDecorate(mixins){
	var newClass = mixins && mixins.prototype ? extend(getProto(mixins),MixinMethods) : undefined;
	return newClass || function(_class_){
			extend(getProto(_class_),MixinMethods);
			extend(true,getProto(_class_),mixins,createKeyWordsFilter(DEFAULT_KEYWORDS));
			return _class_;
		}
}

IBDecorate.utils = Utils;


export default IBDecorate;

