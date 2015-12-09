'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _constans = require('./constans');

var _patchs = require('./patchs');

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