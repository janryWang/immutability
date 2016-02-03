'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

var _types = require('./types');

var _immutable = require('immutable');

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