import React from 'react';
import { Container, View } from 'native-base';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BookProps, CardComponent } from '../../components/Card';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import Book from './Book';

export default class MyLibrary extends React.Component<NavigationScreenProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchedBooks: [],
      loading: false
    }
  }
  handleSearchChange = (searchInput) => {
    this.setState({
      searchInput: searchInput
    });
  }
  handleSearch = (searchInput: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const searchText = searchInput.nativeEvent.text;
    this.setState({ loading: true }, () => {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`).then(response => {
        console.log(response.data.items);
        this.setState({
          loading: false,
          searchedBooks: response.data.items
        })
      }).catch(e => {
        this.setState({
          loading: false,
        })
        console.log("Error: ", e);
      })
    })
  }
  getBooks = () => {
    return this.state.searchedBooks.map((book) => {
      const bookProps: BookProps = {
        authors: book.volumeInfo.authors,
        categories: book.volumeInfo.authors,
        imageURI: book.volumeInfo.imageLinks.smallThumbnail,
        pageCount: book.volumeInfo.pageCount,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        navigateToBook: this.props.navigation.navigate,
        id: book.id
      }
      return <CardComponent key={book.id} {...bookProps} />
    })
  }
  render() {
    const { loading } = this.state;
    return (
      <Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <View style={{ flex: 1 }}>
            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
                <Icon name='ios-search' size={20} />
                <TextInput
                  placeholder='Search for a book'
                  placeholderTextColor='grey'
                  style={styles.searchInput}
                  onChangeText={this.handleSearchChange}
                  onSubmitEditing={this.handleSearch}
                />
              </View>
            </View>
            <View>
            </View>
            {loading ? <ActivityIndicator size={'large'} color='#0000ff' style={styles.spinner} /> : this.getBooks()}

          </View>
        </ScrollView>
      </Container>
    )
  }
}

export const MyLibraryStack = createStackNavigator({ MyLibrary, Book }, {
  headerMode: 'none'
})


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    marginTop: 200
  },
  search: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  searchInput: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'white',
    marginLeft: 10
  },
  searchWrapper: {
    justifyContent: 'center',
    height: 80,
    backgroundColor: 'white',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 0
    },
    borderWidth: 1
  }
})