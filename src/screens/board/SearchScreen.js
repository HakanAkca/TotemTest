import React, { Component } from "react";
import { Text, View, ActivityIndicator, SafeAreaView, Dimensions} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage'

import Search from "../../components/Search/Search";
import Listing from "../../components/Search/Listing";

import { search, getSpotifyToken } from '../../services/spotifyAPI'  

const PAGE = 5;

export default class SearchScreen extends Component {
  state = {
    artists: [],
    offset: 0,
    query: "",
    isFetching: false,
    isEmpty: false,
    token: null,
    isTokenFetching: false
  };

  async componentDidMount() {
    getSpotifyToken().then(res => this.setState({ token: res.access_token })) 
  }

  async loadNextPage() {
    const { artists, offset, query, token, isFetching, isEmpty } = this.state;
    if (isFetching || isEmpty) return;

    this.setState({ isFetching: true });

    if (query.length === 0) {
      this.setState({ isEmpty: true, isFetching: false});
    } else {
      await search(offset, PAGE, query, token)
      .then(res => {
        this.setState({
          isFetching: false,
          artists: [...artists, ...res.artists.items],
          offset: res.artists.offset + PAGE
        });
      })
    }
  }

  handleSearchChange(text) {
    this.setState(
      {
        isEmpty: false,
        query: text,
        offset: 0,
        artists: []
      },
      () => {
        this.loadNextPage();
      }
    );
  }

  async handleEndReached() {
    await this.loadNextPage();
  }

  render() {
    const { artists, query, isFetching } = this.state;
    
    const { navigation } = this.props

    return (
       <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
        <SafeAreaView>
          <Search onChange={text => this.handleSearchChange(text)} text={query} />
          {isFetching && artists.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <Listing items={artists} onEndReached={() => this.handleEndReached()} navigation={navigation} />
          )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    margin: 10,
    marginTop: 50
  },
  header: {
    height: '100%',
    width: Dimensions.get('window').width
  }
};