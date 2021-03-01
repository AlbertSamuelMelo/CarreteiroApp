import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ListCell from "./ListCell";
import ObraService from "../services/ObrasService"
import RegisterService from "../services/RegisterSevice"
import CBMSService from "../services/CBMSServices"
import DialogInput from 'react-native-dialog-input';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
        storage: false,
        dataOnStorage: [],
        isLoading: false,
        isDialogVisible: false
    };
  }

  _retrieveData = () => {
    this.setState({isLoading:true})

    if (this.props.route.params.key == "CBMS"){
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => 
            {
              this.setState({isDialogVisible: true})
            }
          }>
            <Text style={{marginRight: 15, color: "#147efb"}}>Criar CMBS</Text>
          </TouchableOpacity>
        ),
      });
      CBMSService.createTable(this.state.obra)
      CBMSService.getCBMS()
      .then((response) => {
        this.setState({dataOnStorage: response._array})
        this.setState({isLoading:false})
      })
    } 
    else if (this.props.route.params != undefined) {
      RegisterService.getRegisters(this.props.route.params.key.obra_name)
      .then((response) => {
        this.setState({storage: true})
        this.setState({dataOnStorage: response._array})
        this.setState({isLoading:false})
      })
    }
    else {
      ObraService.getObras()
      .then((response) => {
        this.setState({dataOnStorage: response._array})
        this.setState({isLoading:false})
      })
    }
  };

  componentDidMount() {
    this._retrieveData()
  }

  selectListItem(item) {
    if(item.id == undefined) {
        this.props.navigation.push("List", {
          key: item
        })
    } else {
        this.props.navigation.push("Validação", {
          dataKey: item
        })
    }
  }
  sendInput(inputText) {
    CBMSService.addCBMS(inputText)
    alert("Salvo")
    this.setState({isDialogVisible: false})
  }

  deleteCBMS(item){
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => {
          CBMSService.deleteCBMS(item.cbms_name)
          alert("CBMS: " + item.cbms_name + " deletado")
        } }
      ],
      { cancelable: false }
    );
  }

  render(){
    return (
      <View style={styles.container}>
          <StatusBar style="dark" />
          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Criar CBMS"}
            message={"Digite a placa da CMBS"}
            hintInput ={"CMBS"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.setState({isDialogVisible: false})}}>
          </DialogInput>
          <SafeAreaView style={styles.safeArea}>
            <FlatList 
                data={this.state.dataOnStorage}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.isLoading}
                onRefresh={this._retrieveData}
                renderItem={({item, index, separators}) => 
                <TouchableHighlight
                    onPress={() => this.selectListItem(item)}
                    onLongPress={() => { this.deleteCBMS(item) }}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                        <ListCell 
                            key={{key:true}} 
                            listItem={ this.state.storage ? {
                              title: 
                              item.material + " - " 
                              + item.car } 
                              : this.props.route.params.key == "CBMS" ? 
                              {title: item.cbms_name} 
                              : {title: item.obra_name}}/>
                </TouchableHighlight>}
            />
          </SafeAreaView>
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
    justifyContent: 'flex-start',
  },
  safeArea: {
    width: "100%",
    height: "100%",
  }
});