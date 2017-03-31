/**
 * Created by mysjaka87 on 30.03.2017.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getData} from '../actions';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)
 class Main extends Component {
    render() {
        this.props.getData();
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    {myIcon}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
const mapStateToProps = ({detail}) => {
	const {loading} = detail;

	return {loading};
};
export default connect(mapStateToProps, {getData})(Main);
