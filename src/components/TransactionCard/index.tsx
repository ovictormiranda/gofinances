import React from 'react';
import { categories } from '../../Utils/categories';
import { Swipeable }  from 'react-native-gesture-handler';
import { DataListProps } from '../../screens/Dashboard';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
  DeleteTransactionSwipe,
  IconDelete,
  ButtonDelete,
} from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
  id: string;
}

interface Props {
  data: TransactionCardProps;
  deleteTransaction: (id: string) => void;
}

export function TransactionCard({ data, deleteTransaction} : Props){
  const [ category ] = categories.filter(
    item => item.key === data.category
  );

  function rightActions(){
    return(
      <DeleteTransactionSwipe>
        <ButtonDelete onPress={() => deleteTransaction(data.id)}>
          <IconDelete name="trash-2"/>
        </ButtonDelete>
      </DeleteTransactionSwipe>
    );
  }

  return(
    <Swipeable
      renderRightActions={rightActions}
    >
      <Container>
        <Title>
          {data.name}
        </Title>

        <Amount type={data.type}>
          { data.type === 'negative' && '- ' }
          { data.amount }
        </Amount>

        <Footer>
          <Category>
            <Icon name={category.icon} />
            <CategoryName>
              {category.name}
            </CategoryName>
          </Category>

          <Date>
            {data.date}
          </Date>

        </Footer>
      </Container>
    </Swipeable>
  )
}
