import React, { useState , useRef, useEffect} from 'react';
import { View, Text, StyleSheet , Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';

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
    const currentHigh = useRef(100);
    const currentLow = useRef(1);
    const [rounds, setRounds] = useState(0);

    const { onGameOver, userChoice } = props;

    useEffect(() => {
        /* console.log('currentGuess:',currentGuess);
        console.log('userChoice:',userChoice);
        console.log('rounds:',rounds); */
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[currentGuess, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice)||
            (direction === 'greater' && currentGuess > props.userChoice)){
                Alert.alert('Dont\'t lie!','You know that this is wrong...',
                {text: 'Oops!',style: 'cancel'});
                return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }else {
            currentLow.current = currentGuess;
        }
        const newGuess =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(newGuess);
        setRounds(prevRounds => prevRounds + 1);
    };

   

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Oponent's number</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => nextGuessHandler('lower')}/>
                <Button title="GREATER" onPress={() => nextGuessHandler('greater')}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    } 
});

export default GameScreen;