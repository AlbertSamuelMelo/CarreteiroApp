import React, {Component} from 'react';
import { StyleSheet, View, AsyncStorage, SafeAreaView } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import ListCell from "./ListCell";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
        keysOnStorage: [""],
        storage: false,
        dataOnStorage: [],
    };
  }

  _retrieveData = async () => {
    try {
        const keysOnStorage = await AsyncStorage.getAllKeys()
        this.setState({keysOnStorage: keysOnStorage})

        if( this.props.route.params.key != undefined ) {
            this.setState({storage: true})
            const dataOnKey = await AsyncStorage.getItem(this.props.route.params.key)
            this.setState({dataOnStorage: JSON.parse(dataOnKey)})
        }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData()
  }

  selectListItem(item) {
    console.log(item)
    if(typeof(item) == "string") {
        console.log("Selecionou Key", item)
        this.props.navigation.push("List", {
          key: item
        })
    } else {
        console.log("Selecionou Objeto", item)
        this.props.navigation.push("Validação", {
          dataKey: item
        })
    }
  }

  render(){
    return (
      <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <FlatList 
                data={ this.state.storage ? this.state.dataOnStorage : this.state.keysOnStorage}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index, separators}) => 
                <TouchableHighlight
                    onPress={() => this.selectListItem(item)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                        <ListCell 
                            key={{key:true}} 
                            listItem={ this.state.storage ? {
                              title: 
                              item.data.material + " - " 
                              + item.data.car } 
                              : {title: item}}/>
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