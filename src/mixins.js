import Immutable,{is,fromJS} from 'immutable';
import {isFunc,isObj,isArr} from './types';
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


function getState(path) {
	if (!this.state) return {};
	var selfState = this.state[IB_DATA];
	if (!path) return selfState ? selfState.toJS() : fromJS(this.state).toJS();
	if (selfState) {
		return selfState.getIn(path);
	} else {
		return fromJS(this.state).getIn(path);
	}

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