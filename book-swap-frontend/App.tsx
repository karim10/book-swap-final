import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, NavigationScreenProps } from 'react-navigation';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { LoginPage } from './views/Auth/LoginPage';
import Home from './views/App/Home';
import { SignUpPage } from './views/Auth/SignUpPage';
import deviceStorage from './deviceStorage';

const AppStack = createStackNavigator({ Home: Home });
const AuthStack = createStackNavigator({ SignIn: LoginPage, SignUp: SignUpPage }, {
  headerMode: 'none'
})

class AuthLoadingScreen extends React.Component<NavigationScreenProps, {}> {
  componentDidMount() {
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userToken = await deviceStorage.getItem('id_token');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
