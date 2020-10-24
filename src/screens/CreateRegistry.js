import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoComponent from "../components/PhotoComponent" 

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PhotoComponent />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#6C81E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});