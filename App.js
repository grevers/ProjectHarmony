import React from 'react';
import { StyleSheet, View} from 'react-native';
import Router from './src/Router';


export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    );
  }
}
