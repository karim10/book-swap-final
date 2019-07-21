import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MyLibrary from './views/MyLibrary';
import Home from './views/Home';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const AppTabNavigator = createBottomTabNavigator({
  Home: Home,
  MyLibrary: MyLibrary
}, {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#ddd',
      style: {
        backgroundColor: '#4d535e',
      }
    }
  });

const AppContainer = createAppContainer(AppTabNavigator);