import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import Color from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  //En RN , el argumento que nos envia un listener como onChangeText es el texto directamente No un event!!
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue((prevState, prevProps) => {
      if (!prevState) {
        setConfirmed(false);
        return "";
      }
      return prevState.enteredValue;
    });
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //Alert es otro objeto que se comunica con la API nativa!!
      setTimeout(() => {
        Alert.alert("Invalid Number", "Choose a number between 1 and 99.", [
          { text: "Ok", style: "destructive", onPress: resetInputHandler }
        ]);
      }, 50);
      dismissKeyboard();
      return;
    }
    setSelectedNumber(chosenNumber);
    setConfirmed(true);
    setEnteredValue("");
    dismissKeyboard();
  };

  const dismissKeyboard = () => {
    //console.log('dismissKeyboard triggered');
    Keyboard.dismiss();
  };

  let confirmedOutput = null;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => props.onStartGame(selectedNumber)}
        >START GAME</MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={
        //Keyboard es una API de RN que nos permite interactuar con el teclado nativo
        dismissKeyboard
      }
    >
      {/* hay un problema con dismiss() no funca bien para View y ahora tampoco para ScrollView */}
      {/* <ScrollView scrollEnabled={false}> */}
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game Now!!!</Text>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Color.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Color.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold" //acá uso el font que cargué en App.js!!
  },
  inputContainer: {
    width: "80%",//width indica el default
    maxWidth: "95%",//esto indica hasta cuanto maximo puede crecer
    minWidth: 280,//esto indica hasta cuanto maximo puede achicarse
    alignItems: "center"
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    /* width: 85 */
    //Dimensions es un objeto helper de RN que nos trae informacion sobre
    //las dimensiones del device. En este caso obtenemos el ancho del window.
    //la otra opcion es screen , pero window funciona para IOS y Android!!
    //(screen considera la toolbar de Android en su dimension)
    width: Dimensions.get('window').width / 3.5
  },
  input: {
    //esto sería como una suerte de media query!!
    width: Dimensions.get('window').width < 350 ? 50 : 30
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
