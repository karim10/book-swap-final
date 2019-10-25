import React from 'react';
import { Container, Content, Text, View } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MyLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }
  handleSearch = (searchInput) => {
    this.setState({
      searchInput: searchInput
    });
    console.log("handle change");
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View >
            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
              <Icon name='ios-search' size={20}/>
              <TextInput
                placeholder='search for a book'
                placeholderTextColor='grey'
                style={styles.searchInput}
              />
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: 'white'
  },
  searchWrapper: {
    height: 80,
    backgroundColor: 'white',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 0
    } 
  }
})