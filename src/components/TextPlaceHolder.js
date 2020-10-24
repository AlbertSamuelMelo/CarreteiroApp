import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

export default class TextPlaceHolder extends Component {  
    state = {};
    
    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={() => {this.toggleModal()}}
                    title={ !this.state.dataChild ? "Tirar foto" : "Repetir"}
                    style={styles.TouchableImage}
                >
                    <Image source={!this.state.dataChild ? camera : { uri: this.state.dataFromChild.uri }} 
                        style={!this.state.dataChild ? styles.phothoIcon : styles.photoTaked} 
                    /> 
                </TouchableOpacity>
                <Modal
                    style={styles.modalView}
                    visible={this.state.isModalVisible}
                    swipeDirection={['down', 'left', 'right']}
                    onSwipeComplete={this.toggleModal}
                    onBackdropPress={this.toggleModal}>
                        <PhotoComponent callbackFromParent={this.photoTaked}/>
                </Modal>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: "25%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "-90%",
    borderRadius: 100,
    borderColor: "#8B6CE6",
    borderWidth: 6,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
  modalView: {
    backgroundColor: 'transparent',
  },
  TouchableImage: {
    width: "100%",
    height: "100%",
    backgroundColor:"transparent",
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phothoIcon: {
    marginTop: 0, 
    width: 100, 
    height: 75 
  },
  photoTaked: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  }
});