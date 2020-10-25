import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import cameraImage from "../../assets/camera.png"
import * as MediaLibrary from 'expo-media-library';

export default function CameraPage(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  const returnToParent = (photo) => {
    props.callbackFromParent(photo);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      MediaLibrary.saveToLibraryAsync(photo.uri)
      returnToParent(photo)
    }
  };
  
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ 
        height: "100%",
        width:"100%",
        alignContent: "center",
        justifyContent: "center",
     }}>
      <Camera 
        ref={ref => { this.camera = ref; }}
        style={{ flex: 1 }} 
        type={type}>
        <View
          style={{
            backgroundColor: 'transparent',
            alignContent: "center",
            justifyContent: "center",
          }}>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 30,
              padding: 10,
              paddingHorizontal: 15,
              alignSelf: 'center',
              marginTop: "150%",
            }}
            onPress={ takePicture.bind(this) }>
                <Image source={cameraImage} style={{ width: 100, height: 75 }} />

          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}