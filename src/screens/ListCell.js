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
            <Text style={styles.text}>{!this.props.data ? 
                this.props.listItem.title : 
                this.props.listItem.material + 
                " - " + this.props.listItem.origin + 
                " - " + this.props.listItem.destiny}
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
    flexDirection: "row"
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "left",
    fontSize: 20,
    padding: "5%",
    marginLeft: "5%"
  },
  imageIcon: {
    width: 30, 
    height: "50%",
    marginRight: "8%",
    opacity: 0.3
    }
});