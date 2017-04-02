/**
 * Created by mponomarets on 3/31/17.
 */
import {
    START_REQUEST,
    GET_COMPANIES_SUCCESS,
    REQUEST_FAIL
}from '../actions/types';

const initial_state = {
    companies: [],
    loading: true,
    error: '',
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case START_REQUEST:
            return {...state, loading: true};
        case GET_COMPANIES_SUCCESS:
            return {...state,companies:action.payload,loading:false}
        case REQUEST_FAIL:
            return {...state,loading:false,error:'Huiston we have a problem'}
        default:
            return state;
    }
}
