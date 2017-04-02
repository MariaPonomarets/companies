/**
 * Created by mysjaka87 on 02.04.2017.
 */
import {
     GET_COMPANY_SUCCESS
}from '../actions/types';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {host, companies} from './const';
let url = host + companies;
export const getCompany = (name) => {
    uri = url + '/' + name;
    console.log(url)
    return dispatch => {
        fetch(uri, {method: 'GET'})
            .then((res) => res.json()).then(data => {console.log(data);
            company(dispatch,data.success);
        }).catch(e=>console.log(e))
    }
};
const company=(dispatch,obj)=>{
    dispatch({
        type:GET_COMPANY_SUCCESS,
        payload:obj
    });
    Actions.detail();
}

export const deleteCompany = (name) => {
    return dispatch => deleteData(dispatch, name);
}

const deleteData = (dispatch, name) => {
    let uri = url + '/' + name;
    return fetch(uri, {method: 'DELETE'}).then(response => {
        console.log(response);
        Actions.mainPage({type:'reset'})
    });
}