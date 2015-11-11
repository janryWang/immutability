'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _resolveGetterPath$getProto$createWrapper = require('./utils');

var _isArr$isStr = require('./types');

var _Immutable$Iterable = require('immutable');

var _Immutable$Iterable2 = _interopRequireWildcard(_Immutable$Iterable);

var ImmutableWrapper = _resolveGetterPath$getProto$createWrapper.createWrapper(_resolveGetterPath$getProto$createWrapper.getProto(_Immutable$Iterable2['default'].Collection));

ImmutableWrapper('getIn', function (getIn) {
	return function (path) {
		if (_Immutable$Iterable.Iterable.isIterable(path)) return getIn.call(undefined, path);
		if (_isArr$isStr.isArr(path)) return getIn.call(undefined, path);
		if (_isArr$isStr.isStr(path)) return getIn.call(undefined, _resolveGetterPath$getProto$createWrapper.resolveGetterPath(path));
		return {};
	};
});