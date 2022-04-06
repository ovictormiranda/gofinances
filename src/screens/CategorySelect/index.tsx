import React from "react";
import { FlatList } from "react-native";

import { Button } from "../../components/Form/Button";

import { categories } from "../../Utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory: (category: Category) => void;
  closeSelectedCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectedCategory
}: Props ){

  function handleCategorySelect(category: Category){
    setCategory(category);
  }

  return(
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={( item ) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeSelectedCategory}
        />
      </Footer>
    </Container>
  );
}
