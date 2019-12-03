import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
import Color from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.titleText}>Game Over.</Text>
            <View style={styles.imageContainer}>
                <Image 
                /* para imagenes guardadas localmente no es necesario especificar
                width y height, pero para imagenes de la web SI es obligatorio
                porque React no puede saber las dimensiones de antemano
                para poder mostrar la imagen correctamente */
                //   source={require('../assets/success.png')} 
                //ademas RN le agrega un fade in a la carga de la imagen debido a que es una operacion 
                //asincrona y puede demorar en cargar. este tiempo de fadein se puede manipular con
                //fadeDuration, 300 ms es el default
                  fadeDuration={400}
                  source={{uri: "https://images.unsplash.com/photo-1561816544-21ecbffa09a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}} 
                  style={styles.image}
                  resizeMode="cover"/>
            </View>
            {/* Los componentes Text SI se pueden anidar y los hijos heredan los estilos de texto como
            fontFamily o fontSize .
            Por otro lado, los componentes tipo Text producen saltos de linea automaticamente
            cuando ya no caben en su contenedor */}
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
           <MainButton onPress={props.onRestart} > 
            NEW GAME
           </MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 240,
        height: 240,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 120,//ojo que esta propiedad No acepta % como en CSS !!!
        marginVertical: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginVertical: 20,
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center',
        fontSize: 18
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Color.primary
    }
});

export default GameOverScreen;