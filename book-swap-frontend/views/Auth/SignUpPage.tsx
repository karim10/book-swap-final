import { Image, KeyboardAvoidingView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { SignUpForm } from './SignUpForm';
import { NavigationScreenProps } from 'react-navigation';

export class SignUpPage extends Component<NavigationScreenProps> {
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
                        <SignUpForm navigateToHome={this.navigateToHome}/>
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
        opacity: 0.9,
        fontWeight: '500'
    }
})