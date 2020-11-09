import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder';

export default class ValidateScreen extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            confirmFromChild: {},
            confirmChild: false,
            dataFromStore: []
        };
    }

    useLayoutEffect() {
        navigation.setOptions({
            headerRight: () => (
            <Button onPress={() => setCount(c => c + 1)} title="Update count" />
            ),
        });
    }
    
    _storeData = async () => {
        try {
            await AsyncStorage.setItem(this.props.route.params.dataKey.obra, JSON.stringify(this.state.dataFromStore));
            console.log("Atualizado")
            alert(" Registro Atualizado ")

        } catch (error) {
            console.log(error)
        }
    };

    _retrieveData = async () => {
        try {
            const dataFromObra = await AsyncStorage.getItem(this.props.route.params.dataKey.obra);
            if (dataFromObra !== null) {
            this.setState({dataFromStore: JSON.parse(dataFromObra)})
            }
        } catch (error) {
            // Error retrieving data
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
                console.log("Registro", this.state.dataFromStore[index].key)
                this.state.dataFromStore[index].data.validate = this.state.confirmFromChild.base64
                this.state.dataFromStore[index].data.validateUri = this.state.confirmFromChild.uri
                this._storeData()
                break;
            }
        }
    }
    
    componentDidMount() {
        this._retrieveData()
    }
      
    render(){
        return (
            <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={{height: "40%", width:"100%", alignItems: 'center', justifyContent: "space-around", flexDirection: "row"}}>
                { this.props.route.params.dataKey.data.validateUri == "" ? 
                    <CameraPlaceHolder 
                        validate={ true } 
                        callbackFromParent={(value) => this.photoTaked(value)}
                    /> : 
                    <Image 
                        source={{ uri: this.props.route.params.dataKey.data.validateUri }}
                        style={styles.photoTaked}
                    /> 
                }
                
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
                    {this.props.route.params.dataKey.data.validateUri == "" ?
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