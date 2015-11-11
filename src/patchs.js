import {resolveGetterPath,getProto,createWrapper} from './utils';
import {isArr,isStr} from './types';
import Immutable,{Iterable} from 'immutable';

let ImmutableWrapper = createWrapper(getProto(Immutable.Collection));

ImmutableWrapper('getIn',(getIn)=>{
	return (path)=>{
		if(Iterable.isIterable(path)) return getIn.call(this,path);
		if(isArr(path)) return getIn.call(this,path);
		if(isStr(path)) return getIn.call(this,resolveGetterPath(path));
		return {};
	}
});