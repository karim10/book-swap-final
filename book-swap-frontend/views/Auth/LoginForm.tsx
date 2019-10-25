import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { isEmail } from 'validator';
import deviceStorage from '../../deviceStorage';

export class LoginForm extends Component<{ navigateToHome: () => void }, { login: string, password: string, invalidFields: boolean, networkError: boolean }> {
    private passwordInput;
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            invalidFields: false,
            networkError: false
        }
    }
    handleLoginChange = (login) => {
        this.setState({ login });
    }
    handlePasswordChange = (password) => {
        this.setState({ password });
    }
    validateFileds = (): boolean => {
        return isEmail(this.state.login);
    }
    cleanMessages = () => {
        this.setState({
            invalidFields: false,
            networkError: false
        })
    }
    signInAsync = async () => {
        this.cleanMessages();
        const { login, password } = this.state;
        if (!this.validateFileds()) {
            this.setState({
                invalidFields: true
            })
            return;
        }
        let requestBody = {
            query: `
              query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  userId
                  token
                  tokenExpiration
                }
              }
            `,
            variables: {
                email: login,
                password: password
            }
        };
        axios.post('http://192.168.1.44:3002/graphql', requestBody).then(response => {
            deviceStorage.saveItem('id_token', response.data.data.login.token);
            this.props.navigateToHome();
        })
            .catch(e => {
                this.setState({
                    networkError: true
                });
                console.log(e);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                {this.state.networkError ? <Text> Something went wrong! </Text> : undefined}
                {this.state.invalidFields ? <Text>Invalid forms</Text> : undefined}
                <TextInput
                    placeholder='username or email'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    style={styles.input}
                    returnKeyType='next'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.handleLoginChange}
                />
                <TextInput
                    placeholder='password'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    style={styles.input}
                    secureTextEntry
                    returnKeyType='go'
                    ref={(input) => this.passwordInput = input}
                    onChangeText={this.handlePasswordChange}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.signInAsync}>
                    <Text style={styles.buttonText}>
                        LOGIN
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})
