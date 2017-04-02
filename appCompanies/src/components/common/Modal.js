/**
 * Created by mysjaka87 on 02.04.2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteCompany,getCompaniesList} from '../../actions';
import {Actions} from 'react-native-router-flux';
import {Header} from './Header';
import {connect} from 'react-redux';

class Modal extends Component {
    constructor(props) {
        super(props);
    }
componentWillUnmount(){
        this.props.getCompaniesList();
}
    render() {
        const {container, messageContainer, name,buttonsContainer,buttonTitle,button,rightMargin} = styles;
        return (
            <View style={container}>
                <Header/>
                <View style={messageContainer}>
                    <Text style={name}>
                        Видалити компанію?
                    </Text>
                    <View style={buttonsContainer}>
                        <TouchableOpacity style={[button,rightMargin]} onPress={()=>{this.props.deleteCompany(this.props.company.companyName)}}><Text style={buttonTitle}>Видалити</Text></TouchableOpacity>
                        <TouchableOpacity style={button} onPress={()=>Actions.pop()}><Text style={buttonTitle}>Відмінити</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = {
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    messageContainer: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        marginTop:20,
        marginBottom:15
    },
    buttonsContainer:{
        flexDirection: 'row',
        height:40,
        marginLeft:20,
        marginRight:20
    },
    button:{
        backgroundColor:'red',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    buttonTitle:{
        textAlign:'center',
        color:'#fff'
    },
    rightMargin:{
        marginRight:10
    }
}
const mapStateToProps = ({cmpDetail}) => {
    const {loading, error, company} = cmpDetail;
    return {loading, error, company};
};

export default connect(mapStateToProps, {
    deleteCompany,getCompaniesList
})(Modal);