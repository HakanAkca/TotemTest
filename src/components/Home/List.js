import React, { Component } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const List = ({ token, navigation, data, title }) => {
    return (
      <SafeAreaView style={{ flexDirection: 'column' }}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}
              keyExtractor={data => data.id}
              renderItem={(data) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Details', { id: data.item.id, user_token: token })}>
                    <View style={styles.itemContainer}>
                      <Image style={styles.image} source={{ uri: data.item && data.item.images[1].url }} />
                      <Text style={[styles.text, { marginTop: 10, fontSize: 12 }]}>{data.item && data.item.name}</Text>
                    </View>
                  </TouchableOpacity>
              )}
            />
        </View>
      </SafeAreaView>
    );
}

const styles = {
  title: {
    marginTop: '5%', 
    marginLeft: '2%',
    alignItems: 'center'
  },
  itemContainer: {
    padding: 5, 
    alignItems: 'center'
  },
  image: {
    height: 150, 
    width: 150 
  }, 
  text: {
    fontSize: 18,
    color: '#FFFFFF'
  }
}