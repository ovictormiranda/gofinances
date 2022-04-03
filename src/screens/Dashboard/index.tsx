import React from 'react';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  Icon
} from './styles'

export function Dashboard(){
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://media-assets.wired.it/photos/615d95dfd8b66b13086cf465/16:9/w_1280,c_limit/Tony-Stark.png'}}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <Username>Miranda</Username>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
    </Container>
  )
}
