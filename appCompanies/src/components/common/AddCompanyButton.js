/**
 * Created by mysjaka87 on 02.04.2017.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class AddCompanyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onPress}>
                <Icon name="plus" size={30} color="#fff"/>
            </TouchableOpacity>
        )
    }
}
const styles = {
    buttonStyle: {
        backgroundColor: 'rgba(213, 0, 249, 0.92)',
        height: 60,
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    }
}
export {AddCompanyButton};