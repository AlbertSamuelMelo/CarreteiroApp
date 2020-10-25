import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder'
export default class CreateRegistry extends Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CameraPlaceHolder />
          <TextPlaceHolder input="Material"/>
          <TextPlaceHolder input="Local"/>
          <TextPlaceHolder input="Local"/>
          <TextPlaceHolder input="Carro"/>
            <View style={styles.buttonContainer}>
          <Button color= "#115B73" title="Criar Registro" ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#115B73',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: "90%",
    height: "8%",
    marginTop: "5%",
    marginBottom: "8%",
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
    padding: "2%"
  }
});