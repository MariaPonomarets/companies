/**
 * Created by mysjaka87 on 02.04.2017.
 */
/**
 * Created by mysjaka87 on 30.03.2017.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {addCompany,getCompaniesList} from '../actions';
import {Header} from './common';
let index = 0;
let goods;

class CreateNewCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGoogs: [0],
            goodsDescription: [''],
            companyName: '',
            error: ''
        }
    }

    addGoodsField(num) {
        console.log(this.state);
        index = num;
        this.state.arrGoogs.push(index);
        this.state.goodsDescription[index] = '';
        this.setState({
            arrGoogs: this.state.arrGoogs,
            error: ''
        })
    }
    componentWillUnmount(){
        this.props.getCompaniesList();
        index=0;
        this.setState({
            arrGoogs: [0],
        })

    }
    deleteGoodsField(num) {
        index = num;
        delete this.state.arrGoogs[index];
        delete this.state.goodsDescription[index];
        this.setState({
            arrGoogs: this.state.arrGoogs,
            goodsDescription: this.state.goodsDescription
        })
    }

    onInputGoodsChange(num, data) {
        this.state.goodsDescription[num] = data;
    }

    onCompanyNameChange(name) {
        console.log(name);
        this.setState({
            companyName: name
        })
        console.log(this.state.companyName);
    }

    validate() {
        if (this.state.companyName == '') {
            this.setState({
                error: 'Введіть назву компанії'
            })
        } else {
            console.log(this.state.goodsDescription.length);
            if (this.state.goodsDescription.length > 0) {
                for (let i = 0; i < this.state.goodsDescription.length; i++) {
                    if (this.state.goodsDescription[i] == '') {
                        this.setState({
                            error: 'Заповнені не всі товари'
                        });
                    }
                    else {
                        if (this.state.goodsDescription[this.state.goodsDescription.length - 1]) {
                            this.sendForm(this.state.companyName, this.state.goodsDescription);
                        }
                    }

                }
            } else {
                console.log('eeee')
                this.setState({
                    error: 'Компанія має виробляти товар'
                })
            }
        }
    }

    sendForm(name, goods) {
        let pat = /\s/;
        if (!pat.test(name)) {
            this.props.addCompany(name, goods);
            this.setState({
                error: ''
            });
        }
        else {
            this.setState({
                error: 'Назва компанії має бути без пробілів'
            });
        }
    }

    render() {
        goods = this.state.arrGoogs.map((a, i) => {
            return (
                <View style={styles.inputContainer} key={i}>
                    <TextInput placeholder='Назва товару ...' style={styles.inputField}
                               onChangeText={(text) => this.onInputGoodsChange(i, text)}
                               underlineColorAndroid={'transparent'}/>
                    <TouchableOpacity style={{flex: 0.1, backgroundColor: "#fff"}}
                                      onPress={() => this.deleteGoodsField(i)}>
                        <Icon name="times" size={20} color="grey"/>
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <View style={styles.container}>
                <Header title="Створити нову компанію" return returnButtonOnPress={() => Actions.pop()}/>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.label}>Назва компанії:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Назва компанії' style={styles.inputField} value={this.state.companyName}
                                   onChangeText={(text) => this.onCompanyNameChange(text)}
                                   underlineColorAndroid={'transparent'}/>
                    </View>
                    <Text style={styles.label}>Товар:</Text>
                    {goods}
                    <Text style={styles.error}>{this.state.error}</Text>
                    <TouchableOpacity onPress={() => this.addGoodsField(index + 1)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Додати товар</Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity onPress={() => this.validate()} style={[styles.addButton, styles.addCompanyButton]}>
                    <Text style={styles.addButtonText}>Додати компанію</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15
    },
    label: {
        color: '#000',
    },
    error: {
        textAlign: 'center',
        color: 'red',
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
    inputField: {
        backgroundColor: '#fff',
        height: 40,
        flex: 1,
        borderRadius: 10
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
    }
};

const mapStateToProps = ({cmpDetail}) => {
    const {loading, error} = cmpDetail;
    return {loading, error};
};

export default connect(mapStateToProps, {
    addCompany,getCompaniesList
})(CreateNewCompany);
