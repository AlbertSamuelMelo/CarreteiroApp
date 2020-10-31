import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import 'react-native-gesture-handler';
import next from "../../assets/next.png";

export default class ListCell extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
  render(){
    return (
      <View style={styles.container}>
            <Text style={styles.text}>{ this.props.listItem.title }
            </Text>
          <Image style={styles.imageIcon} source={next}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "space-around",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "gray"
  },
  text: {
    width: "85%",
    height: "100%",
    textAlign: "justify",
    fontSize: 25,
    padding: "5%",
    marginLeft: "5%"
  },
  imageIcon: {
    width: "15%", 
    height: "50%",
    marginRight: "5%",
    opacity: 0.3
    }
});