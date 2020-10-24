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
});