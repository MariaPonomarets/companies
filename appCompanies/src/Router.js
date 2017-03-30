import React, { Component } from 'react';
import {Router, Scene} from "react-native-router-flux";
import Main from './components/Main';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene component={Main} key="mainPage" initial/>
            </Router>
        );
    }
}