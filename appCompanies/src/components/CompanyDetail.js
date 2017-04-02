/**
 * Created by mysjaka87 on 30.03.2017.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from './common';
import {deleteCompany, changeCompanyDataByName} from '../actions';
let index = 0;
let goods;

class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsDescription: this.props.company.companyGoods,
            error: '',
            editable: false
        };
        index=this.props.company.companyGoods.length-1;
    }

    renderDeleteButtonForInput(i) {
        if (this.state.editable) {
            return (
                <TouchableOpacity style={{flex: 0.1, backgroundColor: "#fff"}}
                                  onPress={() => this.deleteGoodsField(i)}>
                    <Icon name="times" size={20} color="grey"/>
                </TouchableOpacity>
            );
        }
    }

    onPressEditButton() {
        console.log(this.state)
        this.setState({
            editable: !this.state.editable
        })
    }
    renderGoodsAddButton(){
        if(this.state.editable){
            return(
                <View>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <TouchableOpacity onPress={() => this.addGoodsField(index + 1)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Додати товар</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderSendButton(){
        if(this.state.editable){
            return(
                <TouchableOpacity onPress={() => this.validate()} style={[styles.addButton, styles.addCompanyButton]}>
                    <Text style={styles.addButtonText}>Додати компанію</Text>
                </TouchableOpacity>
            )
        }
    }

    addGoodsField(num){
        index++;
        this.state.goodsDescription.push('');
        this.setState({
            goodsDescription:this.state.goodsDescription
        });
    }
    deleteGoodsField(num) {
        index--;
        delete this.state.goodsDescription[num];
        this.setState({
            goodsDescription: this.state.goodsDescription,
            error:''
        })
    }
    onInputGoodsChange(num, data){
        this.state.goodsDescription[num] = data;
        this.setState({
            goodsDescription: this.state.goodsDescription
        })
    }
    validate(){
        if(this.state.goodsDescription.length>0){
            for (let i = 0; i < this.state.goodsDescription.length; i++) {
                if (this.state.goodsDescription[i] == '') {
                    this.setState({
                        error: 'Заповнені не всі товари'
                    });
                }
                else {
                    if (this.state.goodsDescription[this.state.goodsDescription.length - 1]) {
                        this.setState({
                            error: ''
                        });
                        this.props.changeCompanyDataByName(this.props.company.companyName, this.state.goodsDescription);
                    }
                }

            }
        }else{
            this.setState({
                error: 'Компанія має виробляти товар'
            })
        }
    }
    deleteCompany(){
        Actions.modal();
    }

    render() {
        const {container, goodsContainer} = styles;
        goods = this.state.goodsDescription.map((a, i) => {
            return (
                <View style={styles.inputContainer} key={i}>
                    <TextInput placeholder='Назва товару ...' style={styles.inputField} value={a}
                               onChangeText={(text) => this.onInputGoodsChange(i,text)}
                               editable={this.state.editable}
                               underlineColorAndroid={'transparent'}
                    />
                    {this.renderDeleteButtonForInput(i)}
                </View>
            )
        })
        return (
            <View style={container}>
                <Header title={this.props.company.companyName}
                        editDeleteButtons
                        return
                        returnButtonOnPress={() => Actions.pop()}
                        editCompany={this.onPressEditButton.bind(this)}
                        deleteButtonOnPress={this.deleteCompany.bind(this)}
                />
                <ScrollView style={goodsContainer}>
                    {goods}
                    {this.renderGoodsAddButton()}
                </ScrollView>
                {this.renderSendButton()}
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1
    },
    goodsContainer: {
        margin: 15
    },
    inputField: {
        backgroundColor: '#fff',
        height: 40,
        flex: 1,
        borderRadius: 10
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: 'red',
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonText: {
        color: '#fff'
    },
    addCompanyButton: {
        backgroundColor: 'green',
        borderRadius: 0,
        height: 40
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
};

const mapStateToProps = ({cmpDetail}) => {
    const {loading, error, company} = cmpDetail;
    return {loading, error, company};
};

export default connect(mapStateToProps, {
    deleteCompany,
    changeCompanyDataByName,
})(CompanyDetail);