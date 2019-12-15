import React from 'react';
import { View, Text , StyleSheet, Platform} from 'react-native';
import Colors from '../constants/colors';

const Header = props => {

    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
   
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        justifyContent: 'center',
        alignItems: 'center',
        //Platform nos da el sistema operativo que estemos y mas parametros que queramos
        //por ejemplo la version del OS, etc
        //ojo que esta parte del codigo solo se ejecuta al cargar el componente
        //Pero no hay problema porque el OS NO va a cambiar nunca pes no!!!
        //no es necesario obtener el dato del OS cada vez quq haya un rerender como se hizo para
        //obtener Dimensions
        backgroundColor: Platform.OS === "ios" ? Colors.primary : "blue"
    },
    headerTitle: {
        color: 'white',
        fontSize: 18
    }
});

export default Header;