import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image, Clipboard, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';
import RegisterSevice from "../services/RegisterSevice"

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
            dataFromStore: [],
            qrCode: "Clique no imprimir",
            dataQr: ""
        };
        this.qrCodeComponent = React.createRef();
    }

    prepareToPrint(){
        this.props.navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => 
                {
                    
                }
              } title="Imprimir" />
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
    }
    
    printRegister = (data) => {
        var qrCapsule = {
          key: data.key, 
          obra: data.obra,
          validate: this.state.confirmChild,
            data:{
              material: data.data.material,
              origin: data.data.origin,
              destiny: data.data.destiny,
              car: data.data.car,
            }
        }
        let strigToPrint = "Registro: " + data.key +
          "<br><br>Obra: " + data.obra +
          "<br><br>Material:" + data.data.material + 
          "<br>Origem: " + data.data.origin + 
          "<br>Destino: " + data.data.destiny + 
          "<br><br>Carro: " + data.data.car + 
          "<br><br>Data: " + data.data.date + "<br><br>"
        
        if(this.state.confirmChild){
        strigToPrint = strigToPrint + "Registro Validado<br><br>"
        }

        this.setState({
          qrCode: JSON.stringify(qrCapsule)
        })
    
        this.getDataURL(strigToPrint)
    }
    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem(this.props.route.params.dataKey.obra, JSON.stringify(this.state.dataFromStore));
            alert(" Registro Atualizado ")
            this.props.navigation.goBack()
            this.printRegister(data)

        } catch (error) {
            console.log(error)
        }
    };
  
    photoTaked = (confirmFromChild) => {
        this.setState({ confirmFromChild: confirmFromChild })
        this.setState({ confirmChild: true })
    }

    validateRegistry(){
        if (this.state.confirmFromChild.base64 == undefined){
                alert("Tire a foto de confirmação")
            return
        }
        for(var index in this.state.dataFromStore){
            if(this.state.dataFromStore[index].key == this.props.route.params.dataKey.key){
                this.state.dataFromStore[index].data.validate = this.state.confirmFromChild.base64
                this.state.dataFromStore[index].data.validateUri = this.state.confirmFromChild.uri
                this._storeData(this.state.dataFromStore[index])
                break;
            }
        }
    }
    
    componentDidMount() {
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
                <TextPlaceHolder 
                    text={this.props.route.params.dataKey.destiny} 
                />
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