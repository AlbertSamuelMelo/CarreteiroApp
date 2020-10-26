import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';

export default class ConfigurePlaceHolder extends Component {  
    constructor() {
        super();
        this.state = {
        };
      }

    render(){
        return (
            <View style={styles.container}>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: "10%",
    marginRight: "90%",
    marginBottom: "85%",
    backgroundColor: '#4099B8',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
});