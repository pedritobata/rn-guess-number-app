import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback,Platform } from 'react-native';
import Color from '../constants/colors';


const MainButton = props => {

    //usamos un feature de React que permite asignar componentes a variables
    //estas variables tienen que estar en Mayusculas obligado!!
     //usamos el check de OS que nos proporciona Platform. este check nos
     //devuelve cualquier valor que le especifiquemos segun el OS que estemos
    let ButtonComponent = Platform.select({
        ios: TouchableOpacity,
        android: TouchableNativeFeedback
    });

    //OTRA COSA IMPORTANTE: 
    //Se puede crear codigo especial para cada Plataforma nombrando a nuestros archivos como
    //Por ejemplo:
    //MainButton.ios.js   y   MainButton.android.js
    //En cada archivo escribimos codigo que queremos ejecutar en cada plataforma.
    //Esto se usa cuando hay muchas diferencias que queremos plasmar para cada OS
    //OJO:  para importar estos componentes donde se requiera, bastará con :
    //import MainButton from "etc".  Notar que NO especificamos TODA la extension (ios.js o android.js)
    //esto lo hace RN automaticamente!!! bacán!!!
   
    


    return (
        <ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </ButtonComponent>
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