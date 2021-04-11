import {Header} from '@components';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppSelector} from '@store';
import {TaskSelectors, useFetchTask} from '@task';
import React from 'react';
import {FlatList} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {Task} from './components';

const Component = (): JSX.Element => {
  const {navigate} = useNavigation();
  const data = useAppSelector(TaskSelectors.selectAll);

  useFetchTask();

  const onAdd = () => {
    navigate('TaskAddScreen');
  };

  const onUpdate = (id: string) => {
    navigate('TaskUpdateScreen', {id});
  };

  return (
    <Screen>
      <Header>
        <Appbar.Content title="Tasks" />
      </Header>
      <FlatList
        data={data}
        renderItem={({item: {name, id, date}}) => (
          <Task title={name} onPress={() => onUpdate(id)} date={date} />
        )}
        keyExtractor={({id}) => id}
      />
      <AddTaskButton
        accessibilityLabel="Add Task"
        icon="plus"
        onPress={onAdd}
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

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const AddTaskButton = styled(FAB)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
