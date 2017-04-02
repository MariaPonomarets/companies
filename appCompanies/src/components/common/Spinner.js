/**
 * Created by mysjaka87 on 02.04.2017.
 */
import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
const Spinner = ({size, color}) => {
    return (
        <View style={styles.container}>
            <View style={styles.spinnerStyle}>
                <ActivityIndicator size={size || 'large'} color={color ? color : '#6a1b9a'}/>
            </View>
        </View>
    );
};
const styles = {
    container:{
        flex: 1,
    },
    spinnerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20
    }
};
export {Spinner};
