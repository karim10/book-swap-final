import React from 'react';
import { Container, Content } from 'native-base';
import { CardComponent, CardComponentProps } from '../../components/Card';
import { Button, AsyncStorage } from 'react-native';
import deviceStorage from '../../deviceStorage';

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

  componentDidMount() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=game').then(
      (response) => response.json()
    ).then(result => {
      this.setState({
        books: result.items
      })
    }
    )
  }

  signOutAsync = async () => {
    await deviceStorage.clear();
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <Container>
        <Content>
          {this.state.books.map(book => {
            const cardComponentProps: CardComponentProps = {
              authors: book.volumeInfo.authors,
              categories: book.volumeInfo.authors,
              imageURI: book.volumeInfo.imageLinks.smallThumbnail,
              pageCount: book.volumeInfo.pageCount,
              title: book.volumeInfo.title
            }
            return <CardComponent key={book.id} {...cardComponentProps} />
          })}
        </Content>
        <Button title="Actually, sign me out :)" onPress={this.signOutAsync} />
      </Container>
    );
  }
}