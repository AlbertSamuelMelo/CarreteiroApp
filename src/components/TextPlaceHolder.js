import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import Picker from 'react-native-picker-select';
import Database from "../Database.json"

export default class TextPlaceHolder extends Component {  
    constructor() {
        super();
        this.state = {
          category:"",
          obras: [{"label": "Teste", "value": "Teste"}]
        };
      }
      
    changePicker(selectedCategory){
        this.setState({category: selectedCategory}, 
          () => this.sendAfterUpdate())
    }

    sendAfterUpdate(){
      this.props.callbackFromParent(this.state.category)
    }

    clearComponent() {
      this.setState({category:""})
    }

    changeCreateObraText(textToCreate){
      this.setState({category: textToCreate}, 
        () => this.sendAfterUpdate())
    }

    componentDidMount(){
      if(this.props.obras){
        this.setState({obras: this.props.obras})
      }
    }

    render(){
        return (
            <View style={this.props.input ? styles.containerIntupt : styles.container}>
                {this.props.input == "Login" ? 
                  <TextInput
                    style={styles.textInputLogin}
                    value={this.state.category}
                    onChangeText={text => this.changeCreateObraText(text)}
                    placeholder="Usuario"
                  />
                : this.props.input == "Senha" ? 
                  <TextInput
                    style={styles.textInputLogin}
                    value={this.state.category}
                    onChangeText={text => this.changeCreateObraText(text)}
                    placeholder="Senha"
                    secureTextEntry={true}
                  /> 
                : this.props.input == "Criar" ? 
                  <TextInput
                    style={styles.textInput}
                    value={this.state.category}
                    onChangeText={text => this.changeCreateObraText(text)}
                    placeholder="Insira o nome da obra"
                  />
                : this.props.input == "Local" ? 
                  <TextInput
                    style={styles.textInput}
                    value={this.state.category}
                    onChangeText={text => this.changeCreateObraText(text)}
                    placeholder="Insira o numero da estaca"
                    keyboardType="number-pad"
                  /> 
                : this.props.input ? 
                    <Picker 
                        style={styles} 
                        onValueChange={
                            (value) => this.changePicker(value)
                        }
                        value={this.state.category}
                        items={this.props.obras ? this.state.obras : Database[this.props.input]}
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
    padding: "2.5%",
    marginLeft: "4%",
    fontSize: 23
  },
  textInput: {
    width: "100%",
    height: "100%",
    textAlign: "left",
    color: "#4099B8",
    fontWeight: "bold",
    padding: "2.5%",
    marginLeft: "4%",
    fontSize: 23
  },
  textInputLogin: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: "#4099B8",
    fontWeight: "bold",
    padding: "2.5%",
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