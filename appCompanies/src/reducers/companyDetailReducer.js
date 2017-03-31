/**
 * Created by mponomarets on 3/31/17.
 */
import {
	START_REQUEST
} from '../actions/types';

const INITIAL_STATE={
	error: false,
	loading: true
};

export default (state = INITIAL_STATE, action)=>{
	switch(action.type){
		case START_REQUEST:
			return { ...state, loading: false};
		default:
			return state;
	}
};