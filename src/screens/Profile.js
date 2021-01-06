import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Configure from "../components/ConfigPlaceHolder"
import api from "./../services/Api"
import LoggedService from "./../services/LoggedService"

import RegisterSevice from "../services/RegisterSevice"
import ObraSevice from "../services/ObrasService"

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataToSend: {},
      obras: [],
      user: "",
      type: ""
    };
  }

  exportData = async () => {
    try {
      const response = await api.post('saveCreatedRegisters', {
        dataToSave: this.state.dataToSend
      });
      alert("Dados enviados pro servidor")
    } catch (err){
      console.log("Erro:", err)
    }
  }

  logout(){
    LoggedService.deleteuser()
    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    })
  }

  prepareExportRegisters = async () =>{
    var dataToSend = this.state.dataToSend
    for(var j = 0; j<this.state.obras.length; j++){
      await RegisterSevice.getRegisters(this.state.obras[j].obra_name)
      .then((response) => {
        dataToSend[this.state.obras[j].obra_name] = response._array
      })
    }
    this.setState({dataToSend: dataToSend})
  }

  prepareToExport(){
    ObraSevice.getObras()
    .then((response) => {
      var dataToSend = {}
      for(var i = 0; i<response._array.length; i++){
        var obraAtual = response._array[i].obra_name
        dataToSend[obraAtual] = []
      }
      this.setState({
        obras: response._array, 
        dataToSend: dataToSend
      }, () => this.prepareExportRegisters())
    })
  }
  componentDidMount(){
    this.prepareToExport()
    LoggedService.getUsers()
    .then((response) => {
      this.setState({
        user: response._array[0].user_name,
        type: response._array[0].type
      })
    }) 
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Configure 
          srceen="Usuarios"
          navigation={this.props.navigation}
        />
        <CameraPlaceHolder/>
        <TextPlaceHolder text={this.state.user}/>
        <TextPlaceHolder text={this.state.type}/>
        <View style={styles.exportContainer}>
          <TouchableOpacity onPress={() => this.exportData()}>
              <Text style={styles.text}>Exportar Dados</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resetContainer}>
          <TouchableOpacity onPress={() => this.logout()}>
              <Text style={styles.textPassword}>Logout</Text>
          </TouchableOpacity>
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
  exportContainer: {
    width: "90%",
    height: "8%",
    marginTop: "10%",
    marginBottom: "10%",
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
  },
  text: {
    color: '#115B73',
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: "3%"
  },
  resetContainer: {
    width: "90%",
    height: "8%",
    marginTop: "5%",
    marginBottom: "8%",
    backgroundColor: "transparent",
  },
  textPassword: {
    color: 'white',
    fontSize: 20,
    textAlign: "center",
    padding: "3%"
  },
});