'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
		value: true
});

var _MixinMethods = require('./mixins');

var _MixinMethods2 = _interopRequireWildcard(_MixinMethods);

var _extend$getProto$createKeyWordsFilter = require('./utils');

var _DEFAULT_KEYWORDS = require('./constans');

require('./patchs');

function IBDecorate(mixins) {
		var newClass = mixins && mixins.prototype ? _extend$getProto$createKeyWordsFilter.extend(_extend$getProto$createKeyWordsFilter.getProto(mixins), _MixinMethods2['default']) : undefined;
		return newClass || function (_class_) {
				_extend$getProto$createKeyWordsFilter.extend(_extend$getProto$createKeyWordsFilter.getProto(_class_), _MixinMethods2['default']);
				_extend$getProto$createKeyWordsFilter.extend(true, _extend$getProto$createKeyWordsFilter.getProto(_class_), mixins, _extend$getProto$createKeyWordsFilter.createKeyWordsFilter(_DEFAULT_KEYWORDS.DEFAULT_KEYWORDS));
				return _class_;
		};
}

IBDecorate.utils = Utils;

exports['default'] = IBDecorate;
module.exports = exports['default'];