import React, {useState} from 'react';
import { StyleSheet, View , SafeAreaView} from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';//USAR: expo install expo-font  .  en vez de npm install --save expo-font
//usando expo install, expo cargará las versiones correctas y compatibles a la version expo de mi proyecto!!
import { AppLoading } from 'expo';

const fetchFont = () => {
  //loadAsync devuelve una promesa
  //los nombres de las propiedades del objeto que le pasamos como argumento son inventados a criterio
  return Font.loadAsync({
    "open-sans" : require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold" : require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    //Apploading en la prop startAsync recibe una funcion que debe retornar una promesa
    return <AppLoading startAsync={fetchFont} 
            onFinish={()=>{setDataLoaded(true)}}
            onError={error=> console.log(error)}/>
  }

  const onStartGameHandler = selectedNumber => {
    if(selectedNumber){
      setUserNumber(selectedNumber);
    }
  }

  const gameOverHandler = (rounds) => {
    setGuessRounds(rounds);
  }

  const restartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }


  let content = <StartGameScreen  onStartGame={onStartGameHandler}/>;
  if(userNumber && guessRounds <= 0){
    content = <GameScreen  userChoice={userNumber} onGameOver={gameOverHandler}/>
  }else if(guessRounds > 0){
    content = <GameOverScreen userNumber={userNumber} 
              roundsNumber={guessRounds} 
              onRestart={restartGameHandler}/>;
  }

  return (
    //SafeAreaView es un Componente de RN que nos sirve para que se ajuste la pantalla a
    //las posibles intereferencias visuales con elementos del device, por ejemplo
    //SafeAreaView agrega paddings para que un boton que está al final de una vista NO choque
    //con el final del viewport, cosas así..
    <SafeAreaView style={styles.screen}>
       <Header title='Guess a Number' />
       {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
