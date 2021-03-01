import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Configure from "../components/ConfigPlaceHolder"
import api from "./../services/Api"
import LoggedService from "./../services/LoggedService"
import UserService from './../services/UsersService'
import FormData from 'form-data';

import RegisterSevice from "../services/RegisterSevice"
import ObraSevice from "../services/ObrasService"
import CBMSService from "../services/CBMSServices"

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataToSend: {},
      userToSend:{},
      cbmsToSend:{},
      obras: [],
      user: "",
      type: "",
      onLoad: true
    };
    this.formData = new FormData();
  }

  exportData = async () => {
    this.setState({onLoad: true})
    try {
      const response = await api.post('savePhotoRegisters', this.formData,
      {
        headers: {
          Accept: 'application/json',
          "Content-Type": `multipart/form-data; boundary=${this.formData._boundary};`
        }
      }
      ).then( () => {
        alert("Fotos enviadas para o servidor")
      })
    } catch (err){
      console.error("Erro:", err)
    }

    try {
      const response = await api.post('saveCreatedRegisters', {
        dataToSave: this.state.dataToSend
      });
      alert("Dados enviados para o servidor")
      this.setState({onLoad: false})
    } catch (err){
      console.log("Erro:", err)
    }

    try {
      const response = await api.post('saveUser', {
        dataToSave: this.state.userToSend
      });
    } catch (err){
      console.log("Erro:", err)
    }

    try {
      const response = await api.post('saveCBMS', {
        dataToSave: this.state.cbmsToSend
      });
    } catch (err){
      console.log("Erro no saveCBMS:", err)
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

  createFormData = (register) => {
    if(register.picture_uri != "" && register.picture_uri != null){
      this.formData.append('file', {
        name: register.id + "_picture",
        type: 'image/jpg',
        uri: Platform.OS === 'android' ? register.picture_uri : register.picture_uri.replace('file://', ''),
      });
    }

    if(register.validate_uri != "" && register.validate_uri != null){
      this.formData.append('file', {
        name: register.id + "_validate",
        type: 'image/jpg',
        uri: Platform.OS === 'android' ? register.validate_uri : register.validate_uri.replace('file://', ''),
      });
    }
  };

  prepareExportRegisters = async () =>{
    var dataToSend = this.state.dataToSend
    for(var j = 0; j<this.state.obras.length; j++){
      await RegisterSevice.getRegisters(this.state.obras[j].obra_name)
      .then((response) => {
        var registersArray = []
        for(var x = 0; x<response._array.length; x++){
          this.createFormData(response._array[x])
          registersArray.push(response._array[x])
        }
        dataToSend[this.state.obras[j].obra_name] = registersArray
      })
    }
    this.setState({dataToSend: dataToSend})
    this.setState({onLoad: false})
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

  prepareUsersToExport(){
    UserService.getUsers()
    .then((response) => {
      var usersToSend = {}
      for(var i = 0; i<response._array.length; i++){
        var userAtual = response._array[i].user_name
        usersToSend[userAtual] = response._array[i]
      }
      this.setState({
        userToSend: usersToSend
      })
    })
  }

  prepareCBMSToExport(){
    CBMSService.getCBMS()
    .then((response) => {
      var cbmsList = {}
      for(var i = 0; i<=response._array.length - 1; i++){
        var cbmsAtual = response._array[i].cbms_name
        cbmsList[cbmsAtual] = response._array[i]
      }
      this.setState({
        cbmsToSend: cbmsList
      })
    })
  }

  componentDidMount(){
    this.setState({onLoad: true})
    this.prepareCBMSToExport()
    this.prepareUsersToExport()
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
      <View style={!this.state.onLoad ? styles.container : styles.containerOnLoad}>
        {this.state.onLoad ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={this.state.onLoad}
            //Text with the Spinner
            textContent={'Loading...'}
            size="large"
            color="#FFFFFF"
          />
        ) : (
          <>
            <StatusBar style="dark" />
            {this.state.type != "Apontador" ? 
            <Configure 
              srceen="Usuarios"
              navigation={this.props.navigation}
            /> : 
            <>
            </>}
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
          </>
        )}
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
  containerOnLoad: {
    width: "100%",
    height: "100%",
    backgroundColor: '#115B73',
    alignItems: 'center',
    justifyContent: 'center',
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