import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Config from "../components/ConfigPlaceHolder"

export default class ValidateScreen extends Component {
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
      confirmFromChild: {},
      confirmChild: false,
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

  validateRegistry(){
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
          validate: ""
      }}
      packageToSave.key = this.generateKey("CC")
      packageToSave.obra = this.state.obra
      packageToSave.data.material = this.state.material
      packageToSave.data.origin = this.state.origin
      packageToSave.data.destiny = this.state.destiny
      packageToSave.data.car = this.state.car
      packageToSave.data.picture = this.state.dataFromChild.base64
      packageToSave.data.validate = this.state.confirmFromChild.base64
      packageToSave.data.pictureUri = this.state.dataFromChild.uri
      packageToSave.data.validateUri = this.state.confirmFromChild.uri
      this._storeData(packageToSave);
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{height: "40%", width:"100%", alignItems: 'center', justifyContent: "space-around", flexDirection: "row"}}>
            <CameraPlaceHolder validate={ true } callbackFromParent={(value) => this.photoTaked(value)}/>
            <Image source={{ uri: this.props.route.params.dataKey.data.pictureUri }}
                style={styles.photoTaked}/>
        </View>
            <TextPlaceHolder 
                text={this.props.route.params.dataKey.data.material} 
            />
            <TextPlaceHolder 
                text={this.props.route.params.dataKey.data.origin}  
            />
            <TextPlaceHolder 
                text={this.props.route.params.dataKey.data.destiny} 
            />
            <TextPlaceHolder 
                text={this.props.route.params.dataKey.data.car}  
            />
            <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.validateRegistry()}>
            <Text style={styles.createText}>Validar Registro</Text>
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
  },  
  photoTaked: {
    width: "40%",
    height: "50%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: "#4099B8",
    borderWidth: 6,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  }
});