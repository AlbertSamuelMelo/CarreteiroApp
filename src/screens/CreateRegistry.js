import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder'
export default class CreateRegistry extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      dataFromChild: {},
      dataChild: false,
      material: "",
      origin: "",
      destiny: "",
      car: ""
    };
  }

  photoTaked = (dataFromChild) => {
    this.setState({ dataFromChild })
    this.setState({ dataChild: true })
  }

  materialTaked = (material) => {
    this.setState({ material: material })
  }

  originTaked = (origin) => {
    this.setState({ origin: origin })
  }

  destinyTaked = (destiny) => {
    this.setState({ destiny: destiny })
  }

  carTaked = (car) => {
    this.setState({ car: car })
  }

  createRegistry(){
    console.log("Registro atual: \n" + "Material: " + this.state.material)
    console.log("Origem: " + this.state.origin)
    console.log("Destino: " + this.state.destiny)
    console.log("carro: " + this.state.car)
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CameraPlaceHolder />
          <TextPlaceHolder 
            input="Material" 
            callbackFromParent={(value) => this.materialTaked(value.category)}
          />
          <TextPlaceHolder 
            input="Local" 
            callbackFromParent={(value) => this.originTaked(value.category)}
          />
          <TextPlaceHolder 
            input="Local" 
            callbackFromParent={(value) => this.destinyTaked(value.category)}
          />
          <TextPlaceHolder 
            input="Carro" 
            callbackFromParent={(value) => this.carTaked(value.category)}
          />
            <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.createRegistry()}>
            <Text style={styles.createText}>Criar Registro</Text>
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
  buttonContainer: {
    width: "90%",
    height: "8%",
    marginTop: "5%",
    marginBottom: "8%",
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
    padding: "2%"
  },
  createText: {
    color: '#115B73',
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: "0.5%"
  }
});