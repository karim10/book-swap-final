import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import deviceStorage from '../../deviceStorage';
import { isEmail } from 'validator';
import axios from 'axios';

interface SingUpFormProps {
    navigateToHome: () => void;
}
export class SignUpForm extends Component<SingUpFormProps, { login: string, password: string, invalidFields: boolean, networkError: boolean }> {
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
    handlePasswordChange = (password) => {
        this.setState({ password });
    }
    handleEmailChange = (login) => {
        this.setState({ login });
    }
    validateFields = () => {
        return isEmail(this.state.login);
    }
    cleanMessages = () => {
        this.setState({
            invalidFields: false,
            networkError: false
        })
    }

    signUpAsync = async () => {
        this.cleanMessages();
        if (!this.validateFields()) {
            this.setState({
                invalidFields: true
            })
            return;
        }
        const { login, password } = this.state;
        const requestBody = {
            query: `
            mutation {
              createUser(userInput: {email: "${login}", password: "${password}"}) {
                userId,
                token,
                tokenExpiration
              }
            }
          `
        };
        axios.post('http://192.168.0.16:3002/graphql', requestBody).then(response => {
            deviceStorage.saveItem('id_token', response.data.data.createUser.token);
            this.props.navigateToHome();
        })
            .catch(e => {
                this.setState({
                    networkError: true
                })
                console.log(e);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                {this.state.networkError ? <Text> Something went wrong! </Text> : undefined}
                {this.state.invalidFields ? <Text> Invalid Fields </Text> : undefined}
                <TextInput
                    placeholder='username or email'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    style={styles.input}
                    returnKeyType='next'
                    onSubmitEditing={() => this.passwordInput.current.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.handleEmailChange}
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
                <TouchableOpacity style={styles.buttonContainer} onPress={this.signUpAsync}>
                    <Text style={styles.buttonText}>
                        SIGN UP!
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
