import * as React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';

export interface CardComponentProps {
  title: string;
  authors: string[];
  categories: string[];
  imageURI: string;
  pageCount: number;
}

interface CardComponentState {
  imgWidth: number;
}

export class CardComponent extends React.Component<CardComponentProps, CardComponentState> {
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
    }, (e) => console.log(e))
  }
  
  public render() {
    const { title, authors, categories, imageURI, pageCount } = this.props;
    return <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>{title}</Text>
            <Text note>{authors[0]}</Text>
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
          <Text>{categories[0]}</Text>
        </Right>
      </CardItem>
    </Card>
  }
}