import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SplashWalls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      wallsJSON: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchWallsJSON();
  }

  fetchWallsJSON() {
    const url = 'http://unsplash.it/list';
    fetch(url)
      .then( response => response.json())
      .then( jsondata => {
        console.log(jsondata);
      })
      .catch( error => console.log('Fetch error : '+ error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to SplashWalls!!!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
