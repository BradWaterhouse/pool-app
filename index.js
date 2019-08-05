import React, { Component } from 'react';
import * as Expo from 'expo';
import App from './src/App'

export class Index extends Component {
  render() {
    return (
      <App />
    );
  }
}

export default Expo.registerRootComponent(Index)
