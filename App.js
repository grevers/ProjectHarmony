import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    cameraOn: false,
    hasCameraPermission: null,
    qrcode: '',
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  _handleBarCodeRead = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({qrcode: data})
  }

  toggleCamera = () => {
    this.setState({cameraOn : !this.state.cameraOn});
  }

  renderCamera = (hasCameraPermission) => {
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <Text style={{
               backgroundColor: 'white'
           }}>{this.state.qrcode}</Text>
        </View>
      );
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    return(
      <View style={styles.container}>
        <Button
          title="I button"
          style={styles.preview}
          onPress={this.toggleCamera}>
        </Button>
        {this.state.cameraOn ? this.renderCamera(hasCameraPermission) : <Text> Hi </Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
