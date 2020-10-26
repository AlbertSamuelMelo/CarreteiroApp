import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';

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