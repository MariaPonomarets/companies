/**
 * Created by mysjaka87 on 30.03.2017.
 */
import {combineReducers} from 'redux';
import companyDetailReducer from './companyDetailReducer';
import companiesList from './companiesListReducer';

export default combineReducers({
	cmpDetail:companyDetailReducer,
    cmpList:companiesList
});