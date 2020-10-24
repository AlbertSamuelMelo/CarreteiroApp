import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Image } from 'react-native';
import PhotoComponent from "../components/PhotoComponent" 
import camera from "../../assets/camera.png"

export default class CameraPlaceHolder extends Component {  
    state = {
        isModalVisible: false,
        dataFromChild: {},
        dataChild: false,
      };

    myCallback = (dataFromChild) => {
        this.toggleModal()
        this.setState({ dataFromChild })
        this.setState({ dataChild: true })
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={() => {this.toggleModal()}}
                    title={ !this.state.dataChild ? "Tirar foto" : "Repetir"}
                    style={styles.TouchableImage}
                >
                    <Image source={camera} style={{marginTop: 0 ,width: 100, height: 75 }} /> 
                </TouchableOpacity>
                <Modal
                    style={styles.modalView}
                    visible={this.state.isModalVisible}
                    swipeDirection={['down', 'left', 'right']}
                    onSwipeComplete={this.toggleModal}
                    onBackdropPress={this.toggleModal}>
                        <PhotoComponent callbackFromParent={this.myCallback}/>
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
  }
});