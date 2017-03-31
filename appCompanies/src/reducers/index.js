/**
 * Created by mysjaka87 on 30.03.2017.
 */
import {combineReducers} from 'redux';
import companyDetailReducer from './companyDetailReducer';

export default combineReducers({
	detail:companyDetailReducer
});