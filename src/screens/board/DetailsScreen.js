import React, { Component, useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Icon } from 'react-native-elements'

import { getSpotifyToken, getArtist, getArtistAlbums, getUserTopArtists } from '../../services/spotifyAPI'

export default class DetailsList extends React.Component { 

  constructor() {
    super()

    this.state = {
      artist: [],
      artistsAlbum: [],
      loading: true
    }
  }

  componentDidMount() {
     getSpotifyToken().then(async res => {
        const artist = await getArtist(res.access_token, this.props.route.params.id)
        const artist_albums = await getArtistAlbums(res.access_token, this.props.route.params.id)

        this.setState({ artist: artist, artistsAlbum: artist_albums.items, loading: false });
      }); 
  }

  render() {
    const {artist, artistsAlbum, loading} = this.state
    return (
        <View style={{flex: 1}}>
        {
          loading ?
          <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </LinearGradient>
        :
          <HeaderImageScrollView
            maxHeight={200}
            minHeight={100}
            renderHeader={() => <Image source={{ uri: artist.images &&  artist.images[0].url }} style={styles.image} />}
            ScrollViewComponent={FlatList}
            data={artistsAlbum}
            keyExtractor={(item) => item.id}
            scrollViewBackgroundColor={"#121212"}
            renderItem={(albums) => {
              
              let date = new Date().getFullYear(albums.item.release_date)

              return (
                <TouchableOpacity style={styles.itemView} onPress={() => this.props.navigation.navigate('Tracks', { id: albums.item.id, image: albums.item.images[0].url })}>
                  <Image style={styles.itemImage} source={{ uri: albums.item.images[0].url }} />
                  <View style={{flexShrink: 1, marginLeft: '3%'}}>
                    <Text style={styles.itemText}>{albums.item && albums.item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.itemText, { marginTop: '5%', fontSize: 12 }]}>{date} </Text>
                      <Text style={[styles.itemText, { marginTop: '5%', fontSize: 12 }]}>- {albums.item && albums.item.type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
            renderForeground={() => ( 
              <View style={styles.titleContainer}>
                <View style={{marginTop: '10%'}}>
                  <Icon onPress={() => this.props.navigation.goBack()} name="chevron-left" type="material-community" color="#FFFFFF" />
                </View>
                <View style={{marginBottom: '5%'}}>
                  <Text style={styles.imageTitle}>{artist.name}</Text>
                </View>
              </View>
            )}
          />
        }
        </View>
    );
  }
}

const styles = {
  header: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 250,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 30,
  },
  titleContainer: {
    flex: 1,
    left: '5%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemView: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection:'row',
    padding: 10
  },
  itemImage: {
    height: 80,
    width: 80
  },
  itemText: {
    marginTop: '1%', 
    color: '#FFFFFF'
  }
};