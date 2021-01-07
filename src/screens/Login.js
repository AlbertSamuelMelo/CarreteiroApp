import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TextPlaceHolder from '../components/TextPlaceHolder';
import api from "./../services/Api"
import UserService from './../services/UsersService'
import LoggedService from "./../services/LoggedService"

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

  componentDidMount(){
    UserService.createUsers()
    UserService.addUser({
        user_name: "Admin",
        password: "Admin",
        type: "Adiministrador"
      }).then((response) => {})
    UserService.getUsers()
    .then((response) => {
      console.log("Resposta do getUsers", response)
      this.setState({userDatabase : response._array})
    })
    LoggedService.getUsers()
    .then((response) => {
      if(response._array.length != 0){
        this.props.navigation.reset({
          index: 0,
          routes: [
            {
              name: this.state.userDatabase[i].type,
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