'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _isFunc$isBool$isArr$isStr = require('./types');

var _IB_TYPE = require('./constans');

var createWrapper = function createWrapper(context) {
	return function (name, func) {
		return context[name] = func(context[name]);
	};
};

function toArray() {
	var _arguments = arguments;
	var _again = true;

	_function: while (_again) {
		args = undefined;
		_again = false;

		var args = _arguments;
		if (args.length == 1) {
			return Array.prototype.slice.apply(args[0]);
		} else {
			_arguments = [args];
			_again = true;
			continue _function;
		}
	}
}

function shallowExtend(obj1, obj2, callback) {
	if (obj1) {
		if (obj2) {
			for (var name in obj2) {
				if (_isFunc$isBool$isArr$isStr.isFunc(callback) && !callback(obj2[name], name)) continue;
				if (obj2.hasOwnProperty(name)) {
					obj1[name] = obj2[name];
				}
			}
		}
		return obj1;
	} else {
		return obj2;
	}
}

function extend() {
	var args = toArray(arguments),
	    argLength,
	    filter;
	if (_isFunc$isBool$isArr$isStr.isFunc(args[args.length - 1]) && _isFunc$isBool$isArr$isStr.isBool(args[0]) && args[0] === true) {
		filter = args[args.length - 1];
		args = args.slice(1, args.length - 2);
	}
	argLength = args.length;
	if (argLength == 1) {
		return args[0];
	} else if (argLength == 2) {
		return shallowExtend(args[0], args[1], filter);
	} else if (argLength > 2) {
		return shallowExtend(args[0], extend.apply(null, args.slice(1)), filter);
	}
}

function createKeyWordsFilter(keywords) {
	return function (_, key) {
		return keywords.indexOf(key) > -1;
	};
}

function resolveGetterPath(path) {
	function parse(path) {
		var res = [],
		    l = 0;
		for (var i = 0; i < path.length; i++) {
			if (path[i] == '.' || path[i] == '[') {
				l++;
			} else if (path[i] != ']') {
				res[l] = res[l] || '';
				res[l] += path[i];
			}
		}
		return res;
	}

	return _isFunc$isBool$isArr$isStr.isArr(path) ? path : _isFunc$isBool$isArr$isStr.isStr(path) ? parse(path) : [];
}

function isImmutable(data) {
	return data && data[_IB_TYPE.IB_TYPE];
}

function getProto(obj) {
	return _isFunc$isBool$isArr$isStr.isFunc(obj) ? obj.prototype : obj;
}

exports['default'] = {
	createWrapper: createWrapper,
	toArray: toArray,
	shallowExtend: shallowExtend,
	extend: extend,
	createKeyWordsFilter: createKeyWordsFilter,
	resolveGetterPath: resolveGetterPath,
	isImmutable: isImmutable,
	getProto: getProto
};
module.exports = exports['default'];