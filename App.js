import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Categories from './components/Categories';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Bienvenue" component={Home} />
      <Tab.Screen name="Catégories" component={Categories} />
    </Tab.Navigator>
  </NavigationContainer>
  );
};

export default App;