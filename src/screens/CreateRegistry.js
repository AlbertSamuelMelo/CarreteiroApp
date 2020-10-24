import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CameraPlaceHolder from '../components/CameraPlaceHolder';
import TextPlaceHolder from '../components/TextPlaceHolder'
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CameraPlaceHolder />
        <TextPlaceHolder text="Britta"/>
        <TextPlaceHolder input="Material"/>
        <TextPlaceHolder />
        <TextPlaceHolder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#6C81E6',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});