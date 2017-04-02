/**
 * Created by mysjaka87 on 30.03.2017.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {getCompaniesList, getCompany} from '../actions';
import {Header, Search, Card, AddCompanyButton, Spinner} from './common';

class Main extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            companiesList: ds.cloneWithRows([{companyName: 'Test'}]),
            strSearch: '',
            showHideSearch: false
        }
    }

    componentWillMount() {
        this.props.getCompaniesList();
        if(Platform.OS=='android'){
            StatusBar.setBackgroundColor('#6A1B9A');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.companies != this.props.companies) {
            this.setState({
                    companiesList: this.state.companiesList.cloneWithRows(nextProps.companies),
                    tmp: nextProps.companies
                }
            )
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

    renderList() {
        if (this.props.loading) {
            return (
                <Spinner/>
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

    onPressITem(name) {
        this.props.getCompany(name);
    }

    onPressSearch() {
        if (this.state.strSearch == '') {
            return;
        }
        let searchTypeCompany = true;
        let result = [];
        let search = this.state.strSearch.toLowerCase();
        for (let i = 0; i < this.props.companies.length; i++) {
            if (this.props.companies[i].companyName != undefined) {
                let el = this.props.companies[i].companyName.toLowerCase();
                if (el.search(search) > -1) {
                    result.push(this.props.companies[i]);
                } else {
                    searchTypeCompany = false;
                }
            }
        }
        if (!searchTypeCompany && result.length == 0) {
            for (let i = 0; i < this.props.companies.length; i++) {
                if (this.props.companies[i].companyGoods != null) {
                    if (this.props.companies[i].companyGoods != undefined) {
                        for (let j = 0; j < this.props.companies[i].companyGoods.length; j++) {
                            let el = this.props.companies[i].companyGoods[j].toLowerCase();
                            if (el.search(search) > -1) {
                                result.push(this.props.companies[i]);
                            }
                        }
                    }
                }
            }
        }
        Actions.searchRes({res: result})
    }

    onSearchFieldChange(text) {
        this.setState({
            strSearch: text
        })
    }

    renderSearchField() {
        if (this.state.showHideSearch) {
            return (
                <Search onPress={this.onPressSearch.bind(this)} changeText={this.onSearchFieldChange.bind(this)}/>
            )
        }
    }

    onSearchButtonPress() {
        this.setState({
            showHideSearch: !this.state.showHideSearch
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="Список компаній" search searchButtonOnPress={this.onSearchButtonPress.bind(this)}/>
                {this.renderSearchField()}
                <ScrollView style={styles.scroll}>
                    {this.renderList()}
                </ScrollView>
                <AddCompanyButton onPress={() => Actions.newCompany()}/>
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
    scroll: {
        marginBottom: 30
    }
};

const mapStateToProps = ({cmpList}) => {
    const {loading, error, companies} = cmpList;
    return {loading, error, companies};
};
export default connect(mapStateToProps, {
    getCompaniesList,
    getCompany,
})(Main);
