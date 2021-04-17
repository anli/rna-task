import {Header} from '@components';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppSelector} from '@store';
import {Task, TaskSelectors, useFetchTask} from '@task';
import {isToday, isYesterday} from 'date-fns';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import BottomSheet from 'react-native-bottomsheet';
import {Appbar, FAB} from 'react-native-paper';
import {Task as TaskComponent} from './components';

type Filter = 'Today' | 'Yesterday' | 'All';

const FilterOptions = {
  Today: "Today's Tasks",
  Yesterday: "Yesterday's Tasks",
  All: 'All Tasks',
};

const Component = (): JSX.Element => {
  const {navigate} = useNavigation();
  const allData = useAppSelector(TaskSelectors.selectAll);
  const [filter, setFilter] = useState<Filter>('All');

  useFetchTask();

  const onAdd = () => {
    navigate('TaskAddScreen');
  };

  const onUpdate = (id: string) => {
    navigate('TaskUpdateScreen', {id});
  };

  const onPresentFilterRelativeDay = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: [...Object.values(FilterOptions), 'Cancel'],
        title: 'See',
        cancelButtonIndex: 3,
      },
      (index) => {
        const value = Object.values(FilterOptions)[index];
        const key = Object.keys(FilterOptions).find((filterKey) => {
          const filterValue = FilterOptions[filterKey as Filter];
          return filterValue === value;
        }) as Filter;

        setFilter(key);
      },
    );
  };

  const data = getData(allData, filter);

  const title = FilterOptions[filter];

  return (
    <Screen>
      <Header>
        <Appbar.Content title={title} />
        <Appbar.Action
          accessibilityLabel="Filter"
          icon="dots-vertical"
          onPress={onPresentFilterRelativeDay}
        />
      </Header>
      <FlatList
        data={data}
        renderItem={({item: {name, id, date, isCompleted}}) => (
          <TaskComponent
            title={name}
            onPress={() => onUpdate(id)}
            date={date}
            isCompleted={isCompleted}
          />
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

const getData = (data: Task[], filter: Filter) => {
  switch (filter) {
    case 'Today':
      return data.filter((task) => task?.date && isToday(new Date(task.date)));
    case 'Yesterday':
      return data.filter(
        (task) => task?.date && isYesterday(new Date(task.date)),
      );
    default:
      return data;
  }
};
