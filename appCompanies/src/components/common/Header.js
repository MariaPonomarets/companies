/**
 * Created by mponomarets on 31.03.2017.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Header extends Component {
    constructor(props) {
        super(props);
    }

    renderButtonSearch() {
        if (this.props.search) {
            return (<TouchableOpacity onPress={this.props.searchButtonOnPress}>
                <Icon name="search" size={22} color="#fff"/>
            </TouchableOpacity>)
        }
    }

    renderButtonBack() {
        if (this.props.return) {
            return (<TouchableOpacity onPress={this.props.returnButtonOnPress}>
                <Icon name="angle-left" size={22} color="#fff"/>
            </TouchableOpacity>)
        }
    }

    renderDeleteAndEditButtons() {
        if (this.props.editDeleteButtons) {
            return (
                <View style={styles.editDeleteButtonContainer}>
                    <TouchableOpacity onPress={this.props.editCompany}>
                        <Icon name="edit" size={22} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.deleteButtonOnPress} style={styles.marginForDeleteButton}>
                        <Icon name="times" size={22} color="#fff"/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const {headerContainer, titleStyle, buttonContainer, iosBarHeigth} = styles;
        return (
            <View style={Platform.OS == 'android' ? headerContainer : [headerContainer, iosBarHeigth]}>
                {this.renderButtonBack()}
                <View>
                    <Text style={titleStyle}>{this.props.title}</Text>
                </View>
                {this.renderDeleteAndEditButtons()}
                {this.renderButtonSearch()}
            </View>
        )
    }
}
const styles = {
    headerContainer: {
        height: 60,
        backgroundColor: '#9c27b0',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15
    },
    titleStyle: {
        color: '#fff',
        fontSize: 22
    },
    buttonContainer: {
        backgroundColor: 'transparent'
    },
    editDeleteButtonContainer: {
        flexDirection: 'row'
    },
    marginForDeleteButton: {
        marginLeft: 15
    },
    iosBarHeigth: {
        height: 80
    }
}
export {Header};
