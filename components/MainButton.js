import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../constants/colors';


const MainButton = props => {

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    buttonText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: 'white'
    }
});

export default MainButton;