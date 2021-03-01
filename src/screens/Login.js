import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TextPlaceHolder from '../components/TextPlaceHolder';
import api from "./../services/Api"
import UserService from './../services/UsersService'
import LoggedService from "./../services/LoggedService"
import ObraSevice from "../services/ObrasService"
import CBMSService from "../services/CBMSServices"
import ObraS from '../services/ObrasService';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
        user: "",
        password: "",
        userDatabase: []
    };
  }

  userTaked(user){
    this.setState({ user: user })
  }
  
  passwordTaked(password){
    this.setState({ password: password })
  }

  login(){
    for(var i = 0; i<this.state.userDatabase.length; i++){
      if(this.state.userDatabase[i].user_name == this.state.user 
        && this.state.userDatabase[i].password == this.state.password) {
          alert("Login completo")
          LoggedService.addUser(this.state.userDatabase[i])
          this.props.navigation.reset({
            index: 0,
            routes: [
              {
                name: this.state.userDatabase[i].type,
              },
            ],
          })
          return
        }
    }
    alert("Dados Incorretos")
  }

  async getUserFromServer(){
    try {
      const response = await api.get('getUser');
      for(var i = 0; i<response.data.length; i++){
        UserService.addUser({
          user_name: response.data[i].user_name,
          password: response.data[i].password,
          type: response.data[i].type
        }).then((response) => {})
      }
    } catch (err){
      console.log("Erro:", err)
    }
  }

  async getObraFromServer(){
    try {
      const response = await api.get('getObra');
      for(var i = 0; i<response.data.length; i++){
        ObraSevice.addObra(response.data[i].obra_name)
      }
    } catch (err){
      console.log("Erro:", err)
    }
  }

  async getCBMSFromServer(){
    try {
      const response = await api.get('getCBMS');
      for(var i = 0; i<response.data.length; i++){
        CBMSService.addCBMS(response.data[i].cbms_name)
      }
    } catch (err){
      console.log("Erro:", err)
    }
  }

  componentDidMount(){
    ObraSevice.createTable()
    this.getObraFromServer()
    CBMSService.createTable()
    this.getCBMSFromServer()

    UserService.createUsers()
    UserService.addUser({
        user_name: "Admin",
        password: "Admin",
        type: "Adiministrador"
      }).then((response) => {
        this.getUserFromServer()
        UserService.getUsers()
        .then((response) => {
          this.setState({userDatabase : response._array})
        })
      })
    LoggedService.getUsers()
    .then((response) => {
      if(response._array.length != 0){
        this.props.navigation.reset({
          index: 0,
          routes: [
            {
              name: response._array[0].type,
            },
          ],
        })
      }
    }) 
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <TextPlaceHolder 
            input="Login"
            callbackFromParent={(value) => this.userTaked(value)}
        />
        <TextPlaceHolder 
            input="Senha"
            callbackFromParent={(value) => this.passwordTaked(value)}
        />
        <View style={styles.exportContainer}>
          <TouchableOpacity onPress={() => this.login()}>
              <Text style={styles.text}>Login</Text>
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
    marginBottom: "30%",
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