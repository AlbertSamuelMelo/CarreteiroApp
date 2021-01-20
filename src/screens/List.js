import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ListCell from "./ListCell";
import ObraService from "../services/ObrasService"
import RegisterService from "../services/RegisterSevice"

export default class List extends Component {
  constructor() {
    super();
    this.state = {
        storage: false,
        dataOnStorage: [],
        isLoading: false
    };
  }

  _retrieveData = () => {
    this.setState({isLoading:true})

    if (this.props.route.params != undefined){
      RegisterService.getRegisters(this.props.route.params.key.obra_name)
      .then((response) => {
        this.setState({storage: true})
        this.setState({dataOnStorage: response._array})
        this.setState({isLoading:false})
      })
    } else {
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

  render(){
    return (
      <View style={styles.container}>
          <StatusBar style="dark" />
          <SafeAreaView style={styles.safeArea}>
            <FlatList 
                data={this.state.dataOnStorage}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.isLoading}
                onRefresh={this._retrieveData}
                renderItem={({item, index, separators}) => 
                <TouchableHighlight
                    onPress={() => this.selectListItem(item)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                        <ListCell 
                            key={{key:true}} 
                            listItem={ this.state.storage ? {
                              title: 
                              item.material + " - " 
                              + item.car } 
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