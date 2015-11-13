import Immutable,{is,fromJS} from 'immutable';
import {isFunc,isObj,isArr,isBool,isStr} from './types';
import {IB_DATA,NativeSetState} from './constans';
import {isImmutable} from './utils';


function setState(nextState, callback) {
	var preState = this.state[IB_DATA];
	if (isFunc(nextState)) {
		nextState = nextState.call(this, preState, this.props);
	}

	if (isObj(nextState) || isArr(nextState)) {
		if (preState) {
			nextState = {
				[IB_DATA]: isImmutable(preState) ? preState.merge(nextState) : fromJS(preState).merge(nextState)
			}
		} else {
			nextState = {
				[IB_DATA]: fromJS(this.state).merge(nextState)
			}
		}

		return NativeSetState.call(this, nextState, callback);
	}

}



function getState(path,isToJS = false) {
	let self = this;
	let _getState = path => {
		if (!self.state) return {};
		var selfState = self.state[IB_DATA];
		if (!path) return selfState ? selfState : fromJS(self.state);
		if (selfState) {
			return selfState.getIn(path);
		} else {
			return fromJS(self.state).getIn(path);
		}
	};

	let _toJS = obj=> obj.toJS ?  obj.toJS() : obj;

	if(isBool(path)){
		isToJS = path;
	}

	if(isStr(isToJS)){
		path = isToJS;
	}

	if(isBool(path) && isBool(isToJS)){
		isToJS = path;
		path = [];
	}

	return isToJS ? _toJS(_getState(path)) : _getState(path);

}

function shouldComponentUpdate(newProps, newState) {
	return !is(this.props, newProps) || !is(newState[IB_DATA], this.state[IB_DATA]);
}



export default {
	...Immutable,
	setState,
	getState,
	shouldComponentUpdate
}