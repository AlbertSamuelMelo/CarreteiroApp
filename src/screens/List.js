import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
        keysOnStorage: ["Oi"]
    };
  }

  _retrieveData = async () => {
    try {
        const keysOnStorage = await AsyncStorage.getAllKeys()
        console.log("Keys from store: ", keysOnStorage)
        this.setState({keysOnStorage: keysOnStorage})
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData()
  }
  
  render(){
    return (
      <View style={styles.container}>
          <SafeAreaView>
            <FlatList 
                data={this.state.keysOnStorage}
                renderItem={({item}) => <Text>{item}</Text>}
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
    justifyContent: 'flex-end',
  }
});