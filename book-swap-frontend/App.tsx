import React from 'react';
import { Container, Content, Header} from 'native-base';
import { CardComponent, CardComponentProps } from './components/Card';

interface HomeState {
  books: any[];
}
export default class Home extends React.Component <{}, HomeState>{
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter').then(
      (response) => response.json()
    ).then(result => {
      this.setState({
        books: result.items
      })
    }
    )
  }

  render() {
    return (
      <Container>
        <Header />
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
      </Container>
    );
  }
}