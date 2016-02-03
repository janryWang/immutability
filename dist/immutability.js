(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react"], factory);
	else if(typeof exports === 'object')
		exports["Immutability"] = factory(require("immutable"), require("react"));
	else
		root["Immutability"] = factory(root["Immutable"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mixins = __webpack_require__(5);

	var _mixins2 = _interopRequireDefault(_mixins);

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	var _constans = __webpack_require__(1);

	var _patchs = __webpack_require__(6);

	var _patchs2 = _interopRequireDefault(_patchs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function IBDecorate(mixins) {
		var newClass = undefined;
		if (mixins && mixins.prototype) {
			(0, _utils.extend)((0, _utils.getProto)(mixins), _mixins2.default);
			newClass = mixins;
		}
		return newClass || function (_class_) {
			(0, _utils.extend)((0, _utils.getProto)(_class_), _mixins2.default);
			(0, _utils.extend)(true, (0, _utils.getProto)(_class_), mixins, (0, _utils.createKeyWordsFilter)(_constans.DEFAULT_KEYWORDS));
			return _class_;
		};
	}

	IBDecorate.utils = _utils2.default;

	exports.default = IBDecorate;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DEFAULT_KEYWORDS = exports.IB_TYPE = exports.IB_DATA = exports.NativeSetState = undefined;

	var _react = __webpack_require__(7);

	var NativeSetState = exports.NativeSetState = _react.Component.prototype.setState;

	var IB_DATA = exports.IB_DATA = '@@_IB_DATA_@@';

	var IB_TYPE = exports.IB_TYPE = '@@__IMMUTABLE_ITERABLE__@@';

	var DEFAULT_KEYWORDS = exports.DEFAULT_KEYWORDS = ['constructor', 'setState', 'getState'];

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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

	var _types = __webpack_require__(2);

	var _types2 = _interopRequireDefault(_types);

	var _constans = __webpack_require__(1);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _immutable = __webpack_require__(4);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _types = __webpack_require__(2);

	var _constans = __webpack_require__(1);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function setState(nextState, callback) {
		var preState = this.state[_constans.IB_DATA];
		if ((0, _types.isFunc)(nextState)) {
			nextState = nextState.call(this, preState, this.props);
		}

		if ((0, _types.isObj)(nextState) || (0, _types.isArr)(nextState)) {
			if (preState) {
				nextState = _defineProperty({}, _constans.IB_DATA, (0, _utils.isImmutable)(preState) ? preState.merge(nextState) : (0, _immutable.fromJS)(preState).merge(nextState));
			} else {
				nextState = _defineProperty({}, _constans.IB_DATA, (0, _immutable.fromJS)(this.state).merge(nextState));
			}

			return _constans.NativeSetState.call(this, nextState, callback);
		}
	}

	function getState(path) {
		var isToJS = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		var self = this;
		var _getState = function _getState(path) {
			if (!self.state) return {};
			var selfState = self.state[_constans.IB_DATA];
			if (!path) return selfState ? selfState : (0, _immutable.fromJS)(self.state);
			if (selfState) {
				return selfState.getIn(path);
			} else {
				return (0, _immutable.fromJS)(self.state).getIn(path);
			}
		};

		var _toJS = function _toJS(obj) {
			return obj.toJS ? obj.toJS() : obj;
		};

		if ((0, _types.isBool)(path)) {
			isToJS = path;
		}

		if ((0, _types.isStr)(isToJS)) {
			path = isToJS;
		}

		if ((0, _types.isBool)(path) && (0, _types.isBool)(isToJS)) {
			isToJS = path;
			path = [];
		}

		return isToJS ? _toJS(_getState(path)) : _getState(path);
	}

	function shouldComponentUpdate(newProps, newState) {
		return !(0, _immutable.is)(this.props, newProps) || !(0, _immutable.is)(newState[_constans.IB_DATA], this.state[_constans.IB_DATA]);
	}

	exports.default = _extends({}, _immutable2.default, {
		setState: setState,
		getState: getState,
		shouldComponentUpdate: shouldComponentUpdate
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(3);

	var _types = __webpack_require__(2);

	var _immutable = __webpack_require__(4);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImmutableWrapper = (0, _utils.createWrapper)((0, _utils.getProto)(_immutable2.default.Collection));

	ImmutableWrapper('getIn', function (getIn) {
		return function newGetIn(path) {
			var self = this;
			if (_immutable.Iterable.isIterable(path)) return getIn.call(self, path);
			if ((0, _types.isArr)(path)) return getIn.call(self, path);
			if ((0, _types.isStr)(path)) return getIn.call(self, (0, _utils.resolveGetterPath)(path));
			return {};
		};
	});

	ImmutableWrapper('setIn', function (setIn) {
		return function newSetIn(path) {
			var self = this;
			if (_immutable.Iterable.isIterable(path)) return setIn.call(self, path);
			if ((0, _types.isArr)(path)) return setIn.call(self, path);
			if ((0, _types.isStr)(path)) return setIn.call(self, (0, _utils.resolveGetterPath)(path));
			return {};
		};
	});

	exports.default = _immutable2.default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;