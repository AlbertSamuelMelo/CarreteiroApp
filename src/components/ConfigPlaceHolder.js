import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import engine from "../../assets/config.png";

export default class ConfigurePlaceHolder extends Component {  
    constructor() {
        super();
        this.state = {
        };
      }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image style={styles.imageIcon} source={engine}/>
                </TouchableOpacity>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: "10%",
    marginRight: "90%",
    marginBottom: "83%",
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
  imageIcon: {
    marginTop: "10%",
    marginLeft: "45%",
    width: 60, 
    height: 45 
  }
});