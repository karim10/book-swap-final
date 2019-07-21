import React from 'react';
import { Container, Content, Header, Text} from 'native-base';

export default class MyLibrary extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
            <Text> My Library </Text>          
        </Content>
      </Container>
    );
  }
}