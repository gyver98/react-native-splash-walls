import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, PanResponder } from 'react-native';
import * as utilFunction from './RandManager';
import Swiper from 'react-native-swiper';
import NetworkImage from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
//import ProgressBar from 'react-native-progress/Bar';

const { width, height } = Dimensions.get('window');
const NUM_WALLPAPERS = 5;

export default class SplashWalls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      wallsJSON: [],
      isLoading: true
    };

    this.imagePanResponder = {};
  }

  handleStartShouldSetPanResponder(e, gestureState) {
    return true;
  }

  handlePanResponderGrant(e, gestureState) {
    console.log('Finger touched the image');
  }

  handlePanResponderEnd(e, gestureState) {
    console.log('Finger pulled up from the image');
  }

  componentWillMount() {
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd 
    });
    console.log("after componentWillMount");
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
        <Swiper
        dot={<View style={styles.dotStyle} />}
        activeDot={<View style={styles.activeDotStyle} />}
        loop={false}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        >
        {wallsJSON.map((wallpaper, index) => {
          return(
            <View key={index}>
              <NetworkImage
                source={{uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                indicator={ProgressCircle}
                style={styles.wallpaperImage}
                indicatorProps={{
                  color: 'rgba(255, 255, 255)',
                  size: 60,
                  thickness: 7  
                }}
                {...this.imagePanResponder.panHandlers}
              >
                <Text style={styles.label}>Photo by</Text>
                <Text style={styles.label_authorName}>{wallpaper.author}</Text>
              </NetworkImage>
            </View>
          );
        })}
        </Swiper>  
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
  },
  dotStyle: {
    backgroundColor:'rgba(255,255,255,.4)', 
    width: 8, 
    height: 8,
    borderRadius: 10, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },
  activeDotStyle: {
    backgroundColor: '#fff', 
    width: 13, 
    height: 13, 
    borderRadius: 7, 
    marginLeft: 7, 
    marginRight: 7
  },
  wallpaperImage: {

    width: width,
    height: height,
    backgroundColor: '#000'
  },
  label: {
    position: 'absolute',
    color: '#fff',
    fontSize: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 2,
    paddingLeft: 5,
    top: 30,
    left: 20,
    width: width/2
  },
  label_authorName: {
    position: 'absolute',
    color: '#fff',
    fontSize: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 2,
    paddingLeft: 5,
    top: 51,
    left: 20,
    fontWeight: 'bold',
    width: width/2
  }
});
