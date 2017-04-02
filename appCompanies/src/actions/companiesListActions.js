/**
 * Created by mponomarets on 3/31/17.
 */
import {
    START_REQUEST,
    GET_COMPANIES_SUCCESS,
    REQUEST_FAIL,
}from '../actions/types';
import {Actions} from 'react-native-router-flux';
import {host, companies} from './const';
let url = host + companies;

const getData = (dispatch) => {
    startLoad(dispatch);
    return fetch(url, {method: 'GET'})
        .then((res) => res.json()).then(jsonData => {
            console.log(jsonData);
            companiesList(dispatch, jsonData.success);
        })
        .catch(e => {
            console.log(e);
            fail(dispatch)
        });
};

const postData = (dispatch, name, goods) => {
    let str = JSON.stringify({companyName: name, companyGoods: goods});
    console.log(str);
    return fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: str}).then(response => {
        console.log(response);
        Actions.pop({type: 'reset'});
    })
};

const putData = (dispatch, name, newGoods) => {
    let uri = url + '/' + name;
    let str = JSON.stringify({companyName: name, companyGoods: newGoods});
    return fetch(uri, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: str}).then(response => {
        console.log(response);
        Actions.pop({type: 'reset'});
    })
}

export const getCompaniesList = () => {
    return dispatch => getData(dispatch);
};
export const addCompany = (name, goods) => {
    return dispatch => postData(dispatch, name, goods)
};

export const changeCompanyDataByName = (name, data) => {
    return dispatch => putData(dispatch, name, data);
}
export const openForm = () => {
    Actions.newCompany();
}
const companiesList = (dispatch, arr) => {
    dispatch({
        type: GET_COMPANIES_SUCCESS,
        payload: arr
    })
}
const startLoad = (dispatch) => {
    dispatch({
        type: START_REQUEST
    })
}
const fail = (dispatch) => {
    dispatch({
        type: REQUEST_FAIL
    })
}
