import React, { useState , useRef, useEffect} from 'react';
import { View, Text, StyleSheet , Alert, ScrollView, FlatList, Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = min + Math.floor(Math.random() * (max - min));
    if(rndNum === exclude){
        return generateRandomBetween(min,max, exclude);
    }
    return rndNum;
}

//esta funcion será la que se le pasará al FlatList para renderizar los items de la lista
//pasaremos la funcion usando bind mas abajo. Recordar que bind agrega argumentos a la funcion original
//y bypasea los parametros que por defecto se le pasen al final de la lista de argumentos
//en este caso itemData es el argumento por defecto que requiere FlatList para la funcion
const renderListItem = (listLength, itemData) => {
    return <View style={styles.listItem}>
                <BodyText>#{listLength - itemData.index}</BodyText>
                <BodyText>{itemData.item}</BodyText>
            </View>
}

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const currentHigh = useRef(100);
    const currentLow = useRef(1);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const { onGameOver, userChoice } = props;

    useEffect(() => {
        /* console.log('currentGuess:',currentGuess);
        console.log('userChoice:',userChoice);
        console.log('rounds:',rounds); */
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
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
            //sumamos 1 para que generateRandomNumber no tome en cuenta el valor de la ultima adivinada
            //ya que este generador incluye el limite inferior en su generacion de numeros
            currentLow.current = currentGuess + 1;
        }
        const newGuess =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(newGuess);
        setPastGuesses(curPastGuesses => [newGuess.toString(), ...curPastGuesses]);
    };

    //usamos Dimensions para determinar qué estilo aplicamos
   let listContainerStyle = styles.listContainer;
   if(Dimensions.get('window').width < 350){
        listContainerStyle = styles.listContainerBig
   }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Oponent's number</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
            {/* contentContainerStyle es la propiedad que se usa para agregar estilo
            a un ScrollView o flatList */}
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={item=>item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this,pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
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
    } ,
    listContainer : {
        flex: 1,//esto es para que el scroll funcione en Android
        width: "60%"
    },
    listContainerBig : {
        flex: 1,//esto es para que el scroll funcione en Android
        width: "80%"
    },
    list: {
        flexGrow: 1,//esta propiedad es igual a flex pero tiene en cuenta
        //al scroll cuando llenamos la lista de abajo hacia arriba con flex-end
        // alignItems: "center", esto solo funciona para ScrollView
        justifyContent: "flex-end"
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        width: "100%"//esto hace que el item tome el width correcto, pero
        //como es flex, se moverá hacia la izquierda. Para centrarlo tengo
        //que modificar el estilo flex del ScrollView
    }
});

export default GameScreen;