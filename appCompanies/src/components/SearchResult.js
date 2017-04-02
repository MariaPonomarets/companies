/**
 * Created by mysjaka87 on 02.04.2017.
 */
import React, {Component} from 'react';
import {Header, Card} from './common';
import {
    View,
    Text,
    ScrollView,
    ListView
}from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getCompany} from '../actions';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            companiesList: ds.cloneWithRows(this.props.res.length>0?this.props.res:[{companyName:'empty'}])
        }
    }

    renderRow(data) {
        if (data.companyName != null) {
            return (
                <Card companyName={data.companyName} onPress={() => {
                    this.onPressITem(data.companyName)
                }}/>
            )
        } else {
            return null;
        }
    }

    onPressITem(name) {
        this.props.getCompany(name);
    }

    renderList() {
        if (this.props.res.length==0) {
            return (
                <Text style={styles.noCompanyFound}>Компаній не знайдено</Text>
            )
        } else {
            return (
                <ListView
                    dataSource={this.state.companiesList}
                    renderRow={this.renderRow.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Результати пошуку' return returnButtonOnPress={() => Actions.pop()}/>
                <ScrollView style={styles.scroll}>
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    noCompanyFound:{
        textAlign:'center',
        marginTop:20
    },
    scroll: {
        marginBottom: 30
    }
};

const mapStateToProps = ({cmpDetail}) => {
    const {loading, error, company} = cmpDetail;
    return {loading, error, company};
};

export default connect(mapStateToProps, {
    getCompany
})(SearchResult);
