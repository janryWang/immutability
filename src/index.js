import MixinMethods from './mixins';
import {extend,getProto,createKeyWordsFilter} from './utils';
import {DEFAULT_KEYWORDS} from './constans';
import './patchs';

function IBDecorate(mixins){
	var newClass = mixins && mixins.prototype ? extend(getProto(mixins),MixinMethods) : undefined;
	return newClass || function(_class_){
			extend(getProto(_class_),MixinMethods);
			extend(true,getProto(_class_),mixins,createKeyWordsFilter(DEFAULT_KEYWORDS));
			return _class_;
		}
}

IBDecorate.utils = Utils;

export default IBDecorate;
