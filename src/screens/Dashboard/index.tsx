import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
  Title,
  TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard(){
  const data: DataListProps[] = [{
    id: '1',
    type: 'positive',
    title:"Desenvolvimento de Site",
    amount:"R$ 12.000,00",
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date:"13/02/2022"
  },
  {
    id: '2',
    type: 'negative',
    title:"Beckmans Burguer",
    amount:"R$ 59,00",
    category: {
      name: 'Alimentação',
      icon: 'coffee'
    },
    date:"10/02/2022"
  },
  {
    id: '3',
    type: 'negative',
    title:"Aluguel do Apartamento",
    amount:"R$ 1.200,00",
    category: {
      name: 'Casa',
      icon: 'home'
    },
    date:"05/02/2022"
  },
  {
    id: '4',
    type: 'negative',
    title:"Yezzy Boost 350",
    amount:"R$ 1.200,00",
    category: {
      name: 'Vendas',
      icon: 'shopping-bag'
    },
    date:"13/02/2022"
  }];

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

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>

    </Container>
  )
}
