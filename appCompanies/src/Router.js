import React, {Component} from 'react';
import {Router, Scene,ActionConst} from "react-native-router-flux";

import Main from './components/Main';
import CompanyDetail from './components/CompanyDetail';
import CreateNewCompany from './components/CreateNewCompany';
import Modal from './components/common/Modal';
import SearchResult from './components/SearchResult';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene component={Main} key="mainPage" hideNavBar/>
                    <Scene component={CompanyDetail} key="detail" hideNavBar/>
                    <Scene component={CreateNewCompany} key="newCompany" direction="vertical" hideNavBar/>
                    <Scene component={Modal} key="modal" direction="vertical"  hideNavBar/>
                    <Scene component={SearchResult} key="searchRes"/>
                </Scene>
            </Router>
        );
    }
}
