import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanQR extends Component {
  constructor() {
    super();
    this.state = {
        scanned:false,
        hasPermission: null
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.push("Validar QrCode", {
        dataKey: JSON.parse(data)
      })
  }

  render(){
    const { hasPermission, scanned } = this.state;

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
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
});