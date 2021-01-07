import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image, Clipboard, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import RegisterSevice from "../services/RegisterSevice"
import LoggedService from "./../services/LoggedService"

import * as Print from 'expo-print';
import * as Device from 'expo-device';
import * as Sharing from 'expo-sharing';

import QRCode from 'react-native-qrcode-svg';

export default class ValidateScreen extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            confirmFromChild: {},
            confirmChild: false,
            qrCode: "Clique no imprimir",
            dataQr: "",
            destiny: "",
            user: ""
        };
        this.qrCodeComponent = React.createRef();
    }

    prepareToPrint(){
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity onPress={() => 
                {
                  this.printRegister(this.props.route.params.dataKey)
                }
              }>
                <Text style={{marginRight: 15, color: "#147efb"}}>Imprimir</Text>
              </TouchableOpacity>
            ),
          });
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
        this.props.navigation.goBack()
    }
    
    printRegister = (data) => {
        var qrCapsule = {
          id: data.id, 
          obra_name: data.obra_name,
          validate: this.state.confirmChild,
          material: data.material,
          origin: data.origin,
          destiny: data.destiny,
          car: data.car,
          created_date: data.created_date,
          created_time: data.created_time,
          validate_time: data.validate_time,
          created_user: data.created_user,
          validator_user: data.validator_user
        }
        let strigToPrint = "Registro: " + data.id +
          "<br><br>Obra: " + data.obra_name +
          "<br><br>Material:" + data.material + 
          "<br>Estaca de Origem: " + data.origin
        
        if(data.destiny != null){
          strigToPrint = strigToPrint + "<br>Estaca de Destino: " + data.destiny
        }

        strigToPrint = strigToPrint + "<br><br>CB: " + data.car
        strigToPrint = strigToPrint + "<br><br>Data: " + data.created_date
        strigToPrint = strigToPrint + "<br><br>Hora de criação: " + data.created_time + "<br><br>" +
        "<br><br>Criado por: " + data.created_user + "<br><br>"

        if(data.destiny != null){
          strigToPrint = strigToPrint + "Hora da Validação: " + data.validate_time + "<br><br>"
          strigToPrint = strigToPrint + "Registro Validado por " + data.validator_user + "<br><br>"
        }

        this.setState({
          qrCode: JSON.stringify(qrCapsule)
        }, () => this.getDataURL(strigToPrint))
    }

    photoTaked = (confirmFromChild) => {
        this.setState({ confirmFromChild: confirmFromChild })
        this.setState({ confirmChild: true })
    }

    destinyTaked = (destiny) => {
      this.setState({ destiny: destiny })
    }

    validateRegistry(){
      var thisDate = new Date()
        if (this.state.confirmFromChild.base64 == undefined 
            || this.state.destiny == null
            || this.state.destiny == ""){
              alert("Preencha todos os campos")
              return
        }
        var dataToUpdate = this.props.route.params.dataKey
        dataToUpdate.validate_uri = this.state.confirmFromChild.uri
        dataToUpdate.validate_time = thisDate.getHours() + ":" + thisDate.getMinutes(),
        dataToUpdate.destiny = this.state.destiny,
        dataToUpdate.validator_user = this.state.user
        RegisterSevice.updateRegister(dataToUpdate)
          .then((response) => {
            alert(" Registro Atualizado ")
            this.printRegister(dataToUpdate)
      })
    }
    
    componentDidMount() {
      this.prepareToPrint()
      LoggedService.getUsers()
      .then((response) => {
        this.setState({
          user: response._array[0].user_name,
        })
      })
    }
      
    render(){
        return (
            <View style={styles.container}>
                <View style={{opacity:0}}>
                    {this.state.qrCode ? <QRCode
                        value={this.state.qrCode}
                        getRef={(qrValue) => this.qrCodeComponent = qrValue}
                    /> : <Text></Text>}
                </View>
            <StatusBar style="dark" />
            <View style={{height: "40%", width:"100%", alignItems: 'center', justifyContent: "space-around", flexDirection: "row"}}>
                <Image 
                    source={{ uri: this.props.route.params.dataKey.picture_uri }}
                    style={styles.photoTaked}
                />
                { this.props.route.params.dataKey.validate_uri == "" ? 
                    <CameraPlaceHolder 
                        validate={ true } 
                        callbackFromParent={(value) => this.photoTaked(value)}
                    /> : 
                    <Image 
                        source={{ uri: this.props.route.params.dataKey.validate_uri }}
                        style={styles.photoTaked}
                    /> 
                }
            </View>
                <TextPlaceHolder 
                    text={this.props.route.params.dataKey.material} 
                />
                <TextPlaceHolder 
                    text={this.props.route.params.dataKey.origin}  
                />
                {this.props.route.params.dataKey.destiny == "" 
                || this.props.route.params.dataKey.destiny == undefined
                || this.props.route.params.dataKey.destiny == null ? 
                  <TextPlaceHolder 
                    input="Local" 
                    callbackFromParent={(value) => this.destinyTaked(value)}
                  />
                : <TextPlaceHolder 
                    text={this.props.route.params.dataKey.destiny} 
                  />}
                <TextPlaceHolder 
                    text={this.props.route.params.dataKey.car}  
                />
                <View style={styles.buttonContainer}>
                    {this.props.route.params.dataKey.validate_uri == "" ?
                    <TouchableOpacity onPress={() => this.validateRegistry()}>
                        <Text style={styles.createText}>Validar Registro</Text>
                    </TouchableOpacity> : <Text style={styles.createText}>Registro Validado</Text>}
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