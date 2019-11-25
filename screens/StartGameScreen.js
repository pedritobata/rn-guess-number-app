import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button , Keyboard, TouchableWithoutFeedback} from 'react-native';
import Card from '../components/Card';
import Color from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    //En RN , el argumento que nos envia un listener como onChangeText es el texto directamente No un event!!
    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    }

    return (
        <TouchableWithoutFeedback
         onPress={()=>{
             //Keyboard es una API de RN que nos permite interactuar con el teclado nativo
             Keyboard.dismiss();
         }}>
            <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={() => {}} color={Color.accent}/></View>
                    <View style={styles.button}><Button title="Confirm" onPress={() => {}} color={Color.primary}/></View>
                </View>
            </Card>
        </View>
        </TouchableWithoutFeedback>
        
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        /* width: 85 */
    },
    input: {
        width: 30
    }
});

export default StartGameScreen;