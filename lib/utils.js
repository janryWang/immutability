'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createWrapper = undefined;
exports.toArray = toArray;
exports.shallowExtend = shallowExtend;
exports.extend = extend;
exports.createKeyWordsFilter = createKeyWordsFilter;
exports.resolveGetterPath = resolveGetterPath;
exports.isImmutable = isImmutable;
exports.getProto = getProto;
exports.isValid = isValid;

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

var _constans = require('./constans');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws_reg = /^(\s|\n\t)+$/;

var pathCache = {};

var parsePath = function parsePath(path) {
	if (pathCache[path]) return pathCache[path];
	var res = [],
	    l = 0;
	for (var i = 0; i < path.length; i++) {
		if (path[i] == '.' || path[i] == '[' && i != 0) {
			l++;
		} else if (path[i] != ']' && path[i] != '[' && !ws_reg.test(path[i])) {
			res[l] = res[l] || '';
			res[l] += path[i];
		}
	}
	pathCache[path] = res;
	return res;
};

var createWrapper = exports.createWrapper = function createWrapper(context) {
	return function (name, func) {
		return context[name] = func(context[name]);
	};
};

function toArray() {
	var args = arguments;
	return args.length == 1 ? Array.prototype.slice.apply(args[0]) : toArray(args);
}

function shallowExtend(obj1, obj2, callback) {
	if (obj1) {
		if (obj2) {
			for (var name in obj2) {
				if ((0, _types.isFunc)(callback) && !callback(obj2[name], name)) continue;
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
	if ((0, _types.isFunc)(args[args.length - 1]) && (0, _types.isBool)(args[0]) && args[0] === true) {
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
	return (0, _types.isArr)(path) ? path : (0, _types.isStr)(path) ? parsePath(path) : [];
}

function isImmutable(data) {
	return data && data[_constans.IB_TYPE];
}

function getProto(obj) {
	return (0, _types.isFunc)(obj) ? obj.prototype : obj;
}

function isValid(obj) {
	return obj !== undefined && obj !== null;
}

exports.default = {
	createWrapper: createWrapper,
	toArray: toArray,
	types: _types2.default,
	shallowExtend: shallowExtend,
	extend: extend,
	isValid: isValid,
	createKeyWordsFilter: createKeyWordsFilter,
	resolveGetterPath: resolveGetterPath,
	isImmutable: isImmutable,
	getProto: getProto
};