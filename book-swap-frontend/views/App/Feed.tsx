import React from 'react';
import { Container, Content } from 'native-base';
import { CardComponent, BookProps } from '../../components/Card';
import { Button } from 'react-native';
import deviceStorage from '../../deviceStorage';
import axios from 'axios';

interface HomeState {
  books: any[];
}
export class Feed extends React.Component<any, HomeState>{
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  async componentDidMount() {
    const jwtToken = await deviceStorage.getItem('id_token');
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const requestBody = {
      query: `
            query {
              getBooksCurrentUser {
                googleApiId
              }
            }
          `
    };
    axios.post('http://192.168.1.44:3002/graphql', requestBody, { headers }).then(response => {
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  signOutAsync = async () => {
    await deviceStorage.clear();
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <Container>
        {/* <Content>
          {this.state.books.map(book => {
            const bookProps: BookProps = {
              authors: book.volumeInfo.authors,
              categories: book.volumeInfo.authors,
              imageURI: book.volumeInfo.imageLinks.smallThumbnail,
              pageCount: book.volumeInfo.pageCount,
              title: book.volumeInfo.title
            }
            return <CardComponent key={book.id} {...bookProps} />
          })}
        </Content> */}
        <Button title="Actually, sign me out :)" onPress={this.signOutAsync} />
      </Container>
    );
  }
}