import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as utilFunction from './RandManager';

const NUM_WALLPAPERS = 5;

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
      .then( jsonData => {
        const randomIds = utilFunction.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length);
        console.log('randomIds : ' + randomIds);
        const walls = [];
        randomIds.forEach(randomId => {
          walls.push(jsonData[randomId]);
        });

        this.setState({
          isLoading: false,
          wallsJSON: [].concat(walls)
        });
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
    const {wallsJSON, isLoading} = this.state;
    if(!isLoading) {
      return (
        <View>
        {wallsJSON.map((wallpaper, index) => {
          return(
            <Text key={index}>
              {wallpaper.author}
            </Text>
          );
        })}
        </View>  
      );
    }
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
