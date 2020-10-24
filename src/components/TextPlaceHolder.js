import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

export default class TextPlaceHolder extends Component {  
    state = {};

    render(){
        return (
            <View style={styles.container}>
                
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "8%",
    marginLeft: "20%",
    marginBottom: "8%",
    backgroundColor: '#ADCDFF',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
});