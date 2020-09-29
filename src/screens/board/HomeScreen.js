import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import { getSpotifyToken, getUserTopArtists } from '../../services/spotifyAPI'

import { List } from '../../components/Home/List'

export default class Home extends React.Component {

  constructor() {
    super()

    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount() {
     getSpotifyToken().then(res => {
       getUserTopArtists(res.access_token)
          .then(res => {
            this.setState({data: res, loading: false})
          })
          .catch(error => console.log(error))
    })
  }

  render() {

    const { data, loading } = this.state
    const { navigation } = this.props

    return (
      <View style={{ flex: 1 }}>
      {
        loading ?
          <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </LinearGradient>
        :
          <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
              <List navigation={navigation} data={data && data.artists} title="Vos artistes du moment" />
          </LinearGradient>
      } 
      </View>
  );
  }
}

const styles = {
  header: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems:'center',
    justifyContent: 'center'
  }
}
