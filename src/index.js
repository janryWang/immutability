import MixinMethods from './mixins';
import Utils,{extend,getProto,createKeyWordsFilter} from './utils';
import {DEFAULT_KEYWORDS} from './constans';
import Immutable from './patchs';


function IBDecorate(mixins){
	let newClass;
	if(mixins && mixins.prototype){
		extend(getProto(mixins),MixinMethods);
		newClass = mixins;
	}
	return newClass || function(_class_){
			extend(getProto(_class_),MixinMethods);
			extend(true,getProto(_class_),mixins,createKeyWordsFilter(DEFAULT_KEYWORDS));
			return _class_;
		}
}

IBDecorate.utils = Utils;

export default IBDecorate;
