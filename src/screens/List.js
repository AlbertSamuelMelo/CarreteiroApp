import React, {Component} from 'react';
import { StyleSheet, View, AsyncStorage, SafeAreaView } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import ListCell from "./ListCell";
import { useNavigation } from '@react-navigation/native';

export default class List extends Component {
  constructor() {
    super();
    //navigation = useNavigation()
    this.state = {
        keysOnStorage: ["Oi"]
    };
  }

  _retrieveData = async () => {
    try {
        const keysOnStorage = await AsyncStorage.getAllKeys()
        console.log("Keys from store: ", keysOnStorage)
        this.setState({keysOnStorage: keysOnStorage})
        
        if(this.props.key) {
            const dataOnKey = await AsyncStorage.getItem(this.props.key)
            this.setState({dataOnStorage: dataOnKey})
        }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData()
  }

  selectListItem(item) {
    if(typeof(item) == "string") {
        console.log("Selecionou Key")
        //navigation.navigate("List")
    } else {
        console.log("Selecionou Objeto")
    }
  }

  render(){
    return (
      <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <FlatList 
                data={this.state.keysOnStorage}
                renderItem={({item, index, separators}) => 
                <TouchableHighlight
                    onPress={() => this.selectListItem(item)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                        <ListCell 
                            key={{key:true}} 
                            listItem={{title: item}}/>
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