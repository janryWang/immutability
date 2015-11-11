'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Immutable$is$fromJS = require('immutable');

var _Immutable$is$fromJS2 = _interopRequireWildcard(_Immutable$is$fromJS);

var _isFunc$isObj$isArr = require('./types');

var _IB_DATA$NativeSetState = require('./constans');

var _isImmutable = require('./utils');

function setState(nextState, callback) {
	var preState = this.state[_IB_DATA$NativeSetState.IB_DATA];
	if (_isFunc$isObj$isArr.isFunc(nextState)) {
		nextState = nextState.call(this, preState, this.props);
	}

	if (_isFunc$isObj$isArr.isObj(nextState) || _isFunc$isObj$isArr.isArr(nextState)) {
		if (preState) {
			nextState = _defineProperty({}, _IB_DATA$NativeSetState.IB_DATA, _isImmutable.isImmutable(preState) ? preState.merge(nextState) : _Immutable$is$fromJS.fromJS(preState).merge(nextState));
		} else {
			nextState = _defineProperty({}, _IB_DATA$NativeSetState.IB_DATA, _Immutable$is$fromJS.fromJS(this.state).merge(nextState));
		}

		return _IB_DATA$NativeSetState.NativeSetState.call(this, nextState, callback);
	}
}

function getState(path) {
	if (!this.state) {
		return {};
	}var selfState = this.state[_IB_DATA$NativeSetState.IB_DATA];
	if (!path) {
		return selfState ? selfState : _Immutable$is$fromJS.fromJS(this.state);
	}if (selfState) {
		return selfState.getIn(path);
	} else {
		return _Immutable$is$fromJS.fromJS(this.state).getIn(path);
	}
}

function shouldComponentUpdate(newProps, newState) {
	return !_Immutable$is$fromJS.is(this.props, newProps) || !_Immutable$is$fromJS.is(newState[_IB_DATA$NativeSetState.IB_DATA], this.state[_IB_DATA$NativeSetState.IB_DATA]);
}

exports['default'] = Object.assign(_Immutable$is$fromJS2['default'], {
	setState: setState,
	getState: getState,
	shouldComponentUpdate: shouldComponentUpdate
});
module.exports = exports['default'];