import {resolveGetterPath,getProto,createWrapper} from './utils';
import {isArr,isStr} from './types';
import Immutable,{Iterable} from 'immutable';

let ImmutableWrapper = createWrapper(getProto(Immutable.Collection));


ImmutableWrapper('getIn',(getIn)=>{
	return function newGetIn(path){
		let self = this;
		if(Iterable.isIterable(path)) return getIn.call(self,path);
		if(isArr(path)) return getIn.call(self,path);
		if(isStr(path)) return getIn.call(self,resolveGetterPath(path));
		return {};
	}
});

export default Immutable;