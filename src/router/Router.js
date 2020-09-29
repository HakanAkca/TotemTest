import React from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import Home from '../screens/board/HomeScreen'
import DetailsScreen from '../screens/board/DetailsScreen'
import TracksScreen from '../screens/board/AlbumsTracksScreen'
import SearchScreen from '../screens/board/SearchScreen'

const HomeScreen = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeScreen.Navigator>
            <HomeScreen.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Tracks" component={TracksScreen} options={{ headerShown: false }} />
        </HomeScreen.Navigator>
    )
}


const Search = createStackNavigator();
function SearchStackScreen() {
    return (
        <Search.Navigator>
            <Search.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Tracks" component={TracksScreen} options={{ headerShown: false }} />
        </Search.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function TabsScreen() {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                style:{
                    backgroundColor: '#121212'
                },
                activeTintColor: '#FFFFFF',
                tabBarIcon: {
                    
                }
            }}
        >
            <Tab.Screen 
                name="Accueil" 
                component={HomeStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"home"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
            <Tab.Screen 
                name="Recherche" 
                component={SearchStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"search"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
        </Tab.Navigator>
    )
}


export default function Router({ navigation }) {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Board" component={TabsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
