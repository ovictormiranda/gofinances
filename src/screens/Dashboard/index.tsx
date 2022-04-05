import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  Icon,
  HighlightCards,
  Transactions,
  Title
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

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="última entrada dia 13 de fevereiro"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="última saída dia 10 de fevereiro"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />

      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionCard>

        </TransactionCard>
      </Transactions>

    </Container>
  )
}
