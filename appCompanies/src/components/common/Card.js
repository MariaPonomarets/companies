/**
 * Created by mysjaka87 on 01.04.2017.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {cardContainer, elemContainer, descriptionContainer, cardHeader,cardBody} = styles;
        return (
            <TouchableOpacity style={cardContainer} onPress={this.props.onPress}>
                <View style={elemContainer}>
                    <View style={descriptionContainer}>
                        <View style={cardHeader}/>
                        <View style={cardBody}>
                            <Icon name="rocket" size={40} color="#e1bee7"/>
                            <Text style={{marginLeft: 15}}>{this.props.companyName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = {
    cardContainer: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderColor: '#ce93d8',
        borderWidth: 1
    },
    elemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionContainer: {
        flexDirection: 'column',
        flex: 0.7
    },
    cardHeader: {
        backgroundColor: '#ab47bc',
        height: 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    cardBody:{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
}
export {Card};
