import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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
        this.setState({isLoading: false});
      })
      .catch( error => console.log('Fetch error : '+ error));
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer} >
        <ActivityIndicator size='small' />
        <Text style={styles.loadingText}>Contacting Unsplash</Text>
      </View>
    );
  }

  renderResults() {
    return (
      <View style={styles.resultDataContainer}>
        <Text>
          Data loaded
        </Text>
      </View>
    );
  }

  render() {
    //this.state.isLoading ? this.renderLoadingMessage : this.renderResults;
    if(this.state.isLoading) {
      console.log("isLoading true");
      return this.renderLoadingMessage();
    } else {
      return this.renderResults();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  loadingText: {
    color: '#fff'
  },
  resultDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});
