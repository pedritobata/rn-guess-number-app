import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = min + Math.floor(Math.random() * (max - min));
    if(rndNum === exclude){
        return generateRandomBetween(min,max, exclude);
    }
    return rndNum;
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = 
        useState(generateRandomBetween(1,100, props.userChoice));

    return (
        <View></View>
    );
};

const styles = StyleSheet.create({

});

export default GameScreen;