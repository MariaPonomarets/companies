/**
 * Created by mponomarets on 3/31/17.
 */
import {
    START_REQUEST,
    GET_COMPANY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    company: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COMPANY_SUCCESS:
            return {...state, company: action.payload}
        default:
            return state;
    }
};