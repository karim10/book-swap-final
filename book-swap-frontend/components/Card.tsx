import * as React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export interface CardComponentProps {
  title: string;
  authors: string[];
  categories: string[];
  imageURI: string;
  pageCount: number;
}

export class CardComponent extends React.Component <CardComponentProps> {
  public render() {
    const { title, authors, categories, imageURI, pageCount } = this.props;
    return <Card>
          <CardItem>
            <Left>
              <Thumbnail />
              <Body>
                <Text>{title}</Text>
                <Text note>{authors[0]}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: imageURI }} style={{ height: 200, width: null, flex: 1 }} />
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