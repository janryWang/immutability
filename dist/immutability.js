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

	var _constans = __webpack_require__(1);

	__webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function IBDecorate(mixins) {
			var newClass = mixins && mixins.prototype ? (0, _utils.extend)((0, _utils.getProto)(mixins), _mixins2.default) : undefined;
			return newClass || function (_class_) {
					(0, _utils.extend)((0, _utils.getProto)(_class_), _mixins2.default);
					(0, _utils.extend)(true, (0, _utils.getProto)(_class_), mixins, (0, _utils.createKeyWordsFilter)(_constans.DEFAULT_KEYWORDS));
					return _class_;
			};
	}

	IBDecorate.utils = Utils;

	exports.default = IBDecorate;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IBProto = exports.DEFAULT_KEYWORDS = exports.IB_TYPE = exports.IB_DATA = exports.NativeSetState = undefined;

	var _react = __webpack_require__(7);

	var NativeSetState = exports.NativeSetState = _react.Component.prototype.setState;

	var IB_DATA = exports.IB_DATA = '@@_IB_DATA_@@';

	var IB_TYPE = exports.IB_TYPE = '@@__IMMUTABLE_ITERABLE__@@';

	var DEFAULT_KEYWORDS = exports.DEFAULT_KEYWORDS = ['constructor', 'setState', 'getState'];

	var IBProto = exports.IBProto = Immutable.Collection.prototype;

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _types = __webpack_require__(2);

	var _constans = __webpack_require__(1);

	var createWrapper = function createWrapper(context) {
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

		return (0, _types.isArr)(path) ? path : (0, _types.isStr)(path) ? parse(path) : [];
	}

	function isImmutable(data) {
		return data && data[_constans.IB_TYPE];
	}

	function getProto(obj) {
		return (0, _types.isFunc)(obj) ? obj.prototype : obj;
	}

	exports.default = {
		createWrapper: createWrapper,
		toArray: toArray,
		shallowExtend: shallowExtend,
		extend: extend,
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
		if (!this.state) return {};
		var selfState = this.state[_constans.IB_DATA];
		if (!path) return selfState ? selfState : (0, _immutable.fromJS)(this.state);
		if (selfState) {
			return selfState.getIn(path);
		} else {
			return (0, _immutable.fromJS)(this.state).getIn(path);
		}
	}

	function shouldComponentUpdate(newProps, newState) {
		return !(0, _immutable.is)(this.props, newProps) || !(0, _immutable.is)(newState[_constans.IB_DATA], this.state[_constans.IB_DATA]);
	}

	exports.default = Object.assign(_immutable2.default, {
		setState: setState,
		getState: getState,
		shouldComponentUpdate: shouldComponentUpdate
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(3);

	var _types = __webpack_require__(2);

	var _immutable = __webpack_require__(4);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImmutableWrapper = (0, _utils.createWrapper)((0, _utils.getProto)(_immutable2.default.Collection));

	ImmutableWrapper('getIn', function (getIn) {
		return function (path) {
			if (_immutable.Iterable.isIterable(path)) return getIn.call(undefined, path);
			if ((0, _types.isArr)(path)) return getIn.call(undefined, path);
			if ((0, _types.isStr)(path)) return getIn.call(undefined, (0, _utils.resolveGetterPath)(path));
			return {};
		};
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;