import styled from '@emotion/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {FlatList} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import useTask from './use-task';

const Component = (): JSX.Element => {
  const {data} = useTask();

  return (
    <Screen>
      <Appbar.Header>
        <Appbar.Content title="Tasks" />
      </Appbar.Header>
      <FlatList
        data={data}
        renderItem={({item: {name}}) => <Task title={name} />}
        keyExtractor={({id}) => id}
      />
    </Screen>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default class HomeScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView``;

const Task = ({title}: {title: string}) => <List.Item title={title} />;
