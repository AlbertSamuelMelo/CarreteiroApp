import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TextPlaceHolder from '../components/TextPlaceHolder';
import api from "./../services/Api"
import UserService from "./../services/UsersService"

export default class UsersConfiguration extends Component {
  constructor() {
    super();
    this.state = {
        user: "",
        password: "",
        type: ""
    };
  }

  userTaked(user){
    this.setState({ user: user })
  }
  
  passwordTaked(password){
    this.setState({ password: password })
  }

  typeTaked(type){
    this.setState({ type: type })
  }

  createUser(){
    UserService.addUser({
        user_name: this.state.user,
        password: this.state.password,
        type: this.state.type
    }).then((response) => {
        console.log(response)
        alert("Usuário Criado")
      })
  }

  componentDidMount(){
    UserService.createUsers()
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
        <TextPlaceHolder 
            input="Tipo"
            obras={this.props.route.params.database}
            callbackFromParent={(value) => this.typeTaked(value)}
        />
        <View style={styles.exportContainer}>
          <TouchableOpacity onPress={() => this.createUser()}>
              <Text style={styles.text}>Criar Usuario</Text>
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