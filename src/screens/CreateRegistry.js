import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Config from "../components/ConfigPlaceHolder"

export default class CreateRegistry extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      dataFromChild: {},
      dataChild: false,
      obra: "Teste",
      material: "",
      origin: "",
      destiny: "",
      car: "",
      dataFromStore: []
    };
  }

  generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }
  _storeData = async (data) => {
    this.state.dataFromStore.push(data)
    try {
      await AsyncStorage.setItem(this.state.obra, JSON.stringify(this.state.dataFromStore));
      console.log("Saved ")
      alert(" Registro Salvo ")

    } catch (error) {
      console.log(error)
    }
  };

  _retrieveData = async () => {
    try {
      const dataFromObra = await AsyncStorage.getItem(this.state.obra);
      if (dataFromObra !== null) {
        this.setState({dataFromStore: JSON.parse(dataFromObra)})
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  
  photoTaked = (dataFromChild) => {
    this.setState({ dataFromChild: dataFromChild })
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
    if (this.state.material == "" || 
        this.state.origin == "" || 
        this.state.destiny == "" || 
        this.state.car == "" ||
        this.state.material == null || 
        this.state.origin == null || 
        this.state.destiny == null || 
        this.state.car == null ||  
        this.state.dataFromChild.base64 == undefined){
      alert("Preencha todos os campos")
      return
    } else {
      var packageToSave = {
        key: "", 
        obra: "",
        data:{
          material: "",
          origin: "",
          destiny: "",
          car: "",
          picture: "",
          validate: "",
          pictureUri: "",
          validateUri: ""
      }}
      packageToSave.key = this.generateKey("CC")
      packageToSave.obra = this.state.obra
      packageToSave.data.material = this.state.material
      packageToSave.data.origin = this.state.origin
      packageToSave.data.destiny = this.state.destiny
      packageToSave.data.car = this.state.car
      packageToSave.data.picture = this.state.dataFromChild.base64
      packageToSave.data.pictureUri = this.state.dataFromChild.uri
      this._storeData(packageToSave);
    }
  }

  render(){
    this._retrieveData()
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Config/>
        <CameraPlaceHolder callbackFromParent={(value) => this.photoTaked(value)}/>
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
    marginTop: "4%",
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
    fontSize: 28,
    textAlign: "center",
    padding: "0.5%"
  }
});