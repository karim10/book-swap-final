import { Image, KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { LoginForm } from './LoginForm';

export class LoginPage extends React.Component<NavigationScreenProps> {
    navigateToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }
    navigateToHome = () => {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
                scrollEnabled={false}
            >
                <KeyboardAvoidingView behavior={'padding'} style={styles.container}>

                    <View style={styles.logoContainer}>
                        <Image source={require('../images/book-swap-logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.title}> book-swap </Text>
                    </View>
                    <View>
                        <LoginForm navigateToHome={this.navigateToHome} />
                    </View>
                    <View style={styles.goToSignUp}>
                        <Text style={styles.signUpMessage}>
                            You don't have an account yet
                        </Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.navigateToSignUp}>
                            <Text style={styles.buttonText}>
                                SignUp
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00a8ff'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'

    },
    logo: {
        width: 150,
        height: 150
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    signUpMessage: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '400',
        paddingBottom: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    goToSignUp: {
        padding: 20
    }
})