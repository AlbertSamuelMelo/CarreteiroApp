import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, Clipboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import Config from "../components/ConfigPlaceHolder"
import Database from "../database/DatabaseInit"
import RegisterSevice from "../services/RegisterSevice"

import * as Print from 'expo-print';
import * as Device from 'expo-device';
import * as Sharing from 'expo-sharing';

import QRCode from 'react-native-qrcode-svg';

export default class CreateRegistry extends Component {
  constructor() {
    super();
    new Database
    this.state = {
      isModalVisible: false,
      dataFromChild: {},
      dataChild: false,
      obra: "Teste",
      material: "",
      origin: "",
      destiny: "",
      car: "",
      dataFromStore: [],
      qrCode: "",
      dataQr: ""
    };
    this.qrCodeComponent = React.createRef();
    this.cameraComponent = React.createRef();
    this.materialComponent = React.createRef();
    this.originComponent = React.createRef();
    this.destinyComponent = React.createRef();
    this.carComponent = React.createRef();
  }

  getDataURL(stringToPrint) {
    this.qrCodeComponent.toDataURL((value) => this.callback(value, stringToPrint));
  }
  callback = async (dataURL, stringToPrint) => {
    this.setState({dataQr: dataURL});

    stringToPrint = stringToPrint + `<img src="data:image/jpeg;base64,${this.state.dataQr}"/>`

    let filePath = await Print.printToFileAsync({
      html: stringToPrint,
      width : 380,
      base64 : false,
      orientation: "portrait"
    });

    if(Device.osName === "iOS"){
      Sharing.shareAsync(filePath.uri)
      Clipboard.setString(stringToPrint.replaceAll("<br>", "\n"))
    }else{
      Print.printAsync({uri: filePath.uri})
    }
  }

  printRegister = (data) => {
    var qrCapsule = {
      id: data.id, 
      obra_name: data.obra_name,
      material: data.material,
      origin: data.origin,
      destiny: data.destiny,
      car: data.car,
      data: data.created_date
    }
    let strigToPrint = "Registro: " + data.id +
      "<br><br>Obra: " + data.obra_name +
      "<br><br>Material:" + data.material + 
      "<br>Origem: " + data.origin + 
      "<br>Destino: " + data.destiny + 
      "<br><br>Carro: " + data.car + 
      "<br><br>Data: " + data.created_date + "<br><br>" 

    this.setState({
      qrCode: JSON.stringify(qrCapsule)
    })

    this.getDataURL(strigToPrint)
}

  generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }
  _storeData = (data) => {

    RegisterSevice.createTable(this.state.obra)
    RegisterSevice.addRegister(this.state.obra, data)
      .then((response) => {
        console.log(response)
        this.cameraComponent.current.clearComponent()
        this.materialComponent.current.clearComponent()
        this.originComponent.current.clearComponent()
        this.destinyComponent.current.clearComponent()
        this.carComponent.current.clearComponent()
        alert(" Registro Salvo ")
        this.printRegister(data)
    })
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
    var thisDate = new Date()
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
        id: "", 
        obra_name: "",
        material: "",
        origin: "",
        destiny: "",
        car: "",
        picture: "",
        validate: "",
        pictureUri: "",
        validateUri: "",
        created_date: thisDate.getHours() + ":" + thisDate.getMinutes() + " - " + thisDate.getDate() + "/" + thisDate.getMonth() + "/" + thisDate.getFullYear()
      }
      packageToSave.id = this.generateKey("CC")
      packageToSave.obra_name = this.state.obra
      packageToSave.material = this.state.material
      packageToSave.origin = this.state.origin
      packageToSave.destiny = this.state.destiny
      packageToSave.car = this.state.car
      packageToSave.picture = this.state.dataFromChild.base64
      packageToSave.pictureUri = this.state.dataFromChild.uri
      this._storeData(packageToSave);
    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={{opacity:0}}>
          {this.state.qrCode ? <QRCode
            value={this.state.qrCode}
            getRef={(qrValue) => this.qrCodeComponent = qrValue}
          /> : <Text></Text>}
        </View>
        <Config/>
        <CameraPlaceHolder             
          ref={this.cameraComponent}
          callbackFromParent={(value) => this.photoTaked(value)}/>
          <TextPlaceHolder 
            input="Material" 
            ref={this.materialComponent}
            callbackFromParent={(value) => this.materialTaked(value)}
          />
          <TextPlaceHolder 
            input="Local" 
            ref={this.originComponent}
            callbackFromParent={(value) => this.originTaked(value)}
          />
          <TextPlaceHolder 
            input="Local" 
            ref={this.destinyComponent}
            callbackFromParent={(value) => this.destinyTaked(value)}
          />
          <TextPlaceHolder 
            input="Carro" 
            ref={this.carComponent}
            callbackFromParent={(value) => this.carTaked(value)}
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