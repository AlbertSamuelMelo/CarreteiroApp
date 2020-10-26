import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
    };
  }


  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CameraPlaceHolder/>
        <TextPlaceHolder text="Albert"/>
        <TextPlaceHolder text="Adiministrador"/>
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
  }
});