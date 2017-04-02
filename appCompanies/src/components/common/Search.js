/**
 * Created by mysjaka87 on 01.04.2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Search extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {searchContainer, searchField,iconStyle} = styles;
        return (
            <View style={searchContainer}>
                <TextInput placeholder='Input text' onChangeText={this.props.changeText} underlineColorAndroid={'transparent'} style={searchField}/>
                <TouchableOpacity onPress={this.props.onPress} style={iconStyle}>
                    <Icon name="search" size={20} color="grey"/>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = {
    searchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        marginLeft: 15,
        flexDirection: 'row',
        marginBottom:10,
        marginTop:10,
        borderColor:'#000',
        borderWidth:1,
        borderRadius:10
    },
    searchField: {
        backgroundColor: '#fff',
        height: 40,
        flex: 1,
        borderRadius:10

    },
    iconStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:5
    }
}
export {Search};