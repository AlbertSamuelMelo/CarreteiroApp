import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Configure from "../components/ConfigPlaceHolder"
import api from "./../services/Api"

import RegisterSevice from "../services/RegisterSevice"
import ObraSevice from "../services/ObrasService"

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataToSend: {},
      obras: []
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

  resetPassword(){
    console.log("Reset Password")
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
        <TextPlaceHolder text="Albert"/>
        <TextPlaceHolder text="Adiministrador"/>
        <View style={styles.exportContainer}>
          <TouchableOpacity onPress={() => this.exportData()}>
              <Text style={styles.text}>Exportar Dados</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resetContainer}>
          <TouchableOpacity onPress={() => this.resetPassword()}>
              <Text style={styles.textPassword}>Resetar Password</Text>
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