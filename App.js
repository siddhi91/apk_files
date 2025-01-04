import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Homescreen';
import DetailsScreen from './screens/Detailsscreen';
import FavoritesScreen from './screens/Favoritesscreen';
import { FavoritesProvider } from './context/Favoritescontext';

const Stack = createStackNavigator();

const App = () => (
  <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
        />
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  </FavoritesProvider>
);

export default App;
