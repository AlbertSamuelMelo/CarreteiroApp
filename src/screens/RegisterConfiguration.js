import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TextPlaceHolder from '../components/TextPlaceHolder';
import api from "./../services/Api"

export default class RegisterConfiguration extends Component {
  constructor() {
    super();
    this.state = {
        obra: ""
    };

    this.selectObraComponent = React.createRef();
  }

  ObraTaked(obra){
    this.setState({ obra: obra })
  }

  selectObra(){
    alert("Obra selecionada " + this.state.obra)
    this.props.route.params.onGoBack(this.state.obra);
    this.props.navigation.goBack()
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        {/* <TextPlaceHolder 
            input="Obras"
            database={this.props.route.params.database}
        />
        <View style={styles.exportContainer}>
          <TouchableOpacity onPress={() => this.exportData()}>
              <Text style={styles.text}>Criar Obra</Text>
          </TouchableOpacity>
        </View> */}
        <TextPlaceHolder 
            input="Obra"
            obras={this.props.route.params.database}
            ref={this.selectObraComponent}
            callbackFromParent={(value) => this.ObraTaked(value)}
        />
        <View style={styles.exportContainer}>
          <TouchableOpacity onPress={() => this.selectObra()}>
              <Text style={styles.text}>Selecionar Obra</Text>
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