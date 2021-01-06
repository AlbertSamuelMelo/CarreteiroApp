import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import engine from "../../assets/config.png";
import ObraSevice from "../services/ObrasService"
import UserSevice from "../services/UsersService"

export default class ConfigurePlaceHolder extends Component {  
    constructor() {
        super();
        this.state = {
          obras: [],
          users: [
            {
              label:"Adiministrador",
              value:"Adiministrador"
            },
            {
              label:"Validador",
              value:"Validador"
            }]
        };
      }

    getAllObras = async () => {
      await ObraSevice.getObras()
      .then((response) => {
        var DatabaseOfObras = []
        for(var index in response._array){
          var obra = {label: response._array[index].obra_name, value: response._array[index].obra_name}
          DatabaseOfObras.push(obra)
        }
        this.setState({obras:DatabaseOfObras}) 
      })
    }

    onGoBack(obra){
      if(this.props.screen == "Create") {
        this.props.callbackFromParent(obra)
        ObraSevice.addObra(obra)
      } else {
        this.props.callbackFromParent(obra)
        UserSevice.addUser(obra)
      }
    }

    callConfigScreen(){
      if(this.props.screen == "Create") {
        this.getAllObras()
        this.props.navigation.push("Configurar Registro", {
          database: this.state.obras,
          onGoBack: (value) => this.onGoBack(value),
        })
      } else {
        this.props.navigation.push("Configurar Usuarios", {
          database: this.state.users,
          onGoBack: (value) => this.onGoBack(value),
        })
      }
    }

    componentDidMount(){
      if(this.props.screen == "Create") {
        this.getAllObras()
      }
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.callConfigScreen()}>
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