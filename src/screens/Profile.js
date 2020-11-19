import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Configure from "../components/ConfigPlaceHolder"
import api from "./../services/Api"

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  exportData = async () => {
    console.log("Export Data")
    try {
      const response = await api.post('saveCreatedRegisters', {
        dataToSave: [{
          id: "CC_23156895136", 
          obra_name: "Teste",
          material: "Brita 0",
          origin: "BR - 319",
          destiny: "Base",
          car: "LLE - 2229",
          pictureUri: "",
          validateUri: "",
          created_date: "14/10/1995"
        }]
      });
    } catch (err){
      console.log("Erro:", err)
    }
  }

  resetPassword(){
    console.log("Reset Password")
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Configure/>
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