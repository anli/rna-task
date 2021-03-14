import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppSelector} from '@store';
import {TaskSelectors} from '@task';
import React from 'react';
import {FlatList} from 'react-native';
import {Appbar, FAB, List} from 'react-native-paper';

const Component = (): JSX.Element => {
  const data = useAppSelector(TaskSelectors.selectAll);
  const {navigate} = useNavigation();

  const onAdd = () => {
    navigate('TaskAddScreen');
  };

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

const Task = ({title}: {title: string}) => <List.Item title={title} />;

const AddTaskButton = styled(FAB)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
