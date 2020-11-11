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

    returnToParent = (photo) => {
      this.props.callbackFromParent(photo);
    }

    photoTaked = (dataFromChild) => {
        this.toggleModal()
        this.setState({ dataFromChild })
        this.setState({ dataChild: true })
        this.returnToParent(this.state.dataFromChild)
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };

    render(){
        return (
          <View style={this.props.validate ? styles.containerValidate : styles.container}>
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
    marginBottom: "10%",
    borderRadius: 100,
    borderColor: "#4099B8",
    borderWidth: 6,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
      },
    shadowOpacity: 0.4,
  },
  containerValidate: {
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