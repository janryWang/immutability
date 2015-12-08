'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _types = require('./types');

var _constans = require('./constans');

var _utils = require('./utils');

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