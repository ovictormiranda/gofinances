import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import  AsyncStorage from "@react-native-async-storage/async-storage";

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

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
  TransactionList,
  LogoutButton,
  LoadContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  total: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  costs: HighlightProps;
  balance: HighlightProps;
}

export function Dashboard(){
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const theme = useTheme();

  const { signOut, user } = useAuth();

  async function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function deletingTransaction(id: string){

   const dataKey = await AsyncStorage.getItem(`@gofinances:transactions_user:${user.id}`)

    const newItem = dataKey ? JSON.parse(dataKey) : [];

    var newItem2 = newItem ? newItem.filter((i) => i.id !== id): console.log("deu ruim");

    /*   const dataKey = `@gofinances:transactions_user:${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
    */


    await AsyncStorage.setItem(dataKey!, JSON.stringify(newItem2));
    setTransactions(newItem2)

/*    const keys = await AsyncStorage.getAllKeys()
   console.log(keys)
   console.log(id)

   console.log(newItem)
   console.log("aqui em baixo")
   console.log(dataKey)
   console.log("tcharam")
   console.log(newItem2) */

    /*      try {
      await AsyncStorage.removeItem(`@gofinances:transactions_user:${user.id}`,);
      return true;
    } catch(exception) {
      return false;
    } */
  }

  function handleDeleteTransaction(id: string) {
    Alert.alert('Deletar transação', `Essa função ainda não está disponível ${id}?`, [
      {
        style: 'cancel',
        text: 'Entendi'
      },
      /* {
        style: 'destructive',
        text: 'sim',
        onPress: () => {deletingTransaction(id)}
      } */
    ])
  }

  async function loadTransactions(){
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let costsTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
    .filter((item: DataListProps) =>
      new Date(item.date).getMonth() === selectedDate.getMonth() &&
      new Date(item.date).getFullYear() === selectedDate.getFullYear()
    )
    .map((item: DataListProps) => {

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      } else {
        costsTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    function getLastTransactionDate(
      collection: DataListProps[],
      type: 'positive' | 'negative'
    ){

      const collectionFiltered = collection
      .filter(transaction => transaction.type === type);

      if(collectionFiltered.length === 0)
        return 0;

      const lastTransaction = new Date(
      Math.max.apply(Math, collectionFiltered
      .map(transaction => new Date(transaction.date).getTime())));

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long'})}`;
    }

    console.log(transactionsFormatted)
    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionCosts = getLastTransactionDate(transactions, 'negative');

    const totalInterval = lastTransactionCosts === 0
    ? 'Não há transações'
    : `01 a ${lastTransactionCosts}`;

    const balance = entriesTotal - costsTotal;

    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0
        ? 'Não há transações'
        : `Última entrada dia ${lastTransactionEntries}`,
      },
      costs: {
        total: costsTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionCosts === 0
        ? 'Não há transações'
        :`Última saída dia ${lastTransactionCosts}`,
      },
      balance: {
        total: balance.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  },[]);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[selectedDate]));

  return (
    <Container>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }}/>
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <Username>{user.name}</Username>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power"/>
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.total}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.costs.total}
              lastTransaction={highlightData.costs.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.balance.total}
              lastTransaction={highlightData.balance.lastTransaction}
            />

          </HighlightCards>

          <Title>Histórico do mês de</Title>

          <Transactions>
            <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left"/>
            </MonthSelectButton>

            <Month>
              { format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right"/>
            </MonthSelectButton>
          </MonthSelect>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
              <TransactionCard
                  data={item}
                  deleteTransaction={handleDeleteTransaction}
              />
            }
            />

          </Transactions>
        </>
      }
    </Container>
  )
}
