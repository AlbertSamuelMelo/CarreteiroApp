import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Picker from 'react-native-picker-select';
import Database from "../Database.json"

export default class TextPlaceHolder extends Component {  
    constructor() {
        super();
        this.state = {
          category:"",
        };
      }
      
    changePicker(selectedCategory){
        this.setState({category: selectedCategory}, 
          () => this.sendAfterUpdate())
    }

    sendAfterUpdate(){
      this.props.callbackFromParent(this.state)
    }

    render(){
        return (
            <View style={this.props.input ? styles.containerIntupt : styles.container}>
                {this.props.input ? 
                    <Picker 
                        style={styles} 
                        onValueChange={
                            (value) => this.changePicker(value)
                        }
                        items={Database[this.props.input]}
                        placeholder={{
                            label: 'Selecione o ' + this.props.input,
                            value: null,
                            backgroundColor: 'white',
                          }
                        }/> 
                :<Text 
                    style={styles.text}>
                        {this.props.text}
                </Text>
                }
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "7%",
    marginLeft: "20%",
    marginBottom: "8%",
    backgroundColor: '#4099B8',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
  containerIntupt: {
    width: "95%",
    height: "7%",
    marginLeft: "20%",
    marginBottom: "8%",
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "left",
    color: "white",
    padding: "3.5%",
    marginLeft: "4%",
    fontSize: 23
  },
  inputIOS: {
    width: "96%",
    height: "100%",
    textAlign: "left",
    color: "#4099B8",
    fontWeight: "bold",
    padding: "2.5%",
    marginLeft: "4%",
    fontSize: 30,
  },
  inputAndroid: {
    width: "96%",
    height: "100%",
    textAlign: "left",
    color: "#4099B8",
    fontWeight: "bold",
    padding: "2.5%",
    marginLeft: "4%",
    fontSize: 30,
  },
});