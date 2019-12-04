import * as React from 'react';
import { Image, View, TouchableHighlight } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';

export interface BookProps {
  id: string,
  title: string;
  authors: string[];
  categories: string[];
  imageURI: string;
  pageCount: number;
  navigateToBook: any;
  description: string;
}

interface CardComponentState {
  imgWidth: number;
}

export class CardComponent extends React.Component<BookProps, CardComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 100
    }
  }

  componentDidMount() {
    Image.getSize(this.props.imageURI, (width, height) => {
      this.setState({
        imgWidth: width * (200 / height)
      })
    }, (e) => console.log(e));
  }

  public render() {
    const { title, authors, categories, imageURI, pageCount } = this.props;
    return <TouchableHighlight onPress={() => this.props.navigateToBook('Book', {
      book: this.props
    })}>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{title}</Text>
              <Text note>{authors && authors.length > 0 ? authors[0] : 'no author'}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body style={{ height: 200 }}>
            <Image source={{ uri: imageURI }} style={{ height: 200, width: this.state.imgWidth, flex: 1 }} />
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>{pageCount}</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>{categories && categories.length > 0 ?  categories[0] : 'no category'}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableHighlight>
  }
}