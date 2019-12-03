import React from 'react';
import { Text, View } from 'native-base';
import { BookProps } from '../../components/Card';
import { NavigationScreenProps } from 'react-navigation';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import deviceStorage from '../../deviceStorage';

export default class Book extends React.Component<NavigationScreenProps, any> {
    private bookDetails: BookProps;
    constructor(props) {
        super(props);
        this.bookDetails = this.props.navigation.getParam('book');
        this.state = {
        }
    }
    componentDidMount() {
        Image.getSize(this.bookDetails.imageURI, (width, height) => {
            this.setState({
                imgWidth: width * (200 / height)
            })
        }, (e) => console.log(e));
    }
    handleSearchChange = (searchInput) => {
        this.setState({
            searchInput: searchInput
        });
    }
    handleAddBook = async () => {
        const jwtToken = await deviceStorage.getItem('id_token');
        const headers = {
            Authorization: `Bearer ${jwtToken}`
        }
        const requestBody = {
            query: `
            mutation {
                addBookToCurrentUser(bookId: "${this.bookDetails.id}") {
                    _id
                }
            }
          `
        };
        axios.post('http://192.168.0.16:3002/graphql', requestBody, { headers }).then(response => {
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.bookDetails.title}</Text>
                </View>
                <View style={styles.image}>
                    <Image source={{ uri: this.bookDetails.imageURI }} style={{ height: 200, width: this.state.imgWidth }} />
                </View>
                <ScrollView style={styles.details}>
                    <Text>Authors: {this.bookDetails.authors.reduce((acc, auth) => `${acc} + ${auth}`)} </Text>
                    {this.bookDetails.description !== undefined && this.bookDetails.description !== "" ?
                        <Text>Description: {this.bookDetails.description}</Text> :
                        null
                    }
                </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={this.handleAddBook}>
                    <Text style={styles.addButtonText}>
                        ADD BOOK!
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 10
    },
    image: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: '500',
        fontSize: 20,
    },
    details: {
        flex: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 5
    },
    addButton: {
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        fontWeight: '700',
        textAlign: 'center',
    }

})