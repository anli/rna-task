import {FAB, Header} from '@components';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@store';
import {Task, TaskActions, TaskSelectors, useFetchTask} from '@task';
import {getBottomTabOptions, STATUS} from '@utils';
import {isToday, isYesterday} from 'date-fns';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import BottomSheet from 'react-native-bottomsheet';
import {Appbar, useTheme} from 'react-native-paper';
import {Task as TaskComponent} from './components';

type Filter = keyof typeof FilterOptions;

const FilterOptions = {
  canDo: 'What I can do',
  wantToDoToday: 'What I want to do Today',
  didYesterday: 'What I did Yesterday',
  all: 'All Tasks',
};

const getData = (data: Task[], filter: Filter) => {
  switch (filter) {
    case 'canDo':
      return data.filter((task) => !task?.isCompleted);
    case 'wantToDoToday':
      return data.filter((task) => task?.date && isToday(new Date(task.date)));
    case 'didYesterday':
      return data.filter(
        (task) =>
          task?.isCompleted && task?.date && isYesterday(new Date(task.date)),
      );
    default:
      return data;
  }
};

interface UpdateStatus {
  [id: string]: STATUS;
}

const Component = (): JSX.Element => {
  const {navigate} = useNavigation();
  const allData = useAppSelector(TaskSelectors.selectAll);
  const [filter, setFilter] = useState<Filter>('all');
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  useFetchTask();

  const data = getData(allData, filter);
  const title = FilterOptions[filter];

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
        cancelButtonIndex: Object.values(FilterOptions).length,
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

  const onComplete = async (id: string, changes: {isCompleted: boolean}) => {
    dispatch(TaskActions.update({id, changes}));
  };

  return (
    <Screen>
      <Header>
        <Appbar.Content title={title} />
        <Appbar.Action
          accessibilityLabel="Filter"
          icon="filter-variant"
          onPress={onPresentFilterRelativeDay}
        />
      </Header>
      <FlatList
        data={data}
        renderItem={({item: {name, id, date, isCompleted}}) => {
          return (
            <TaskComponent
              title={name}
              onPress={() => onUpdate(id)}
              date={date}
              isCompleted={isCompleted}
              onCompletePress={() =>
                onComplete(id, {isCompleted: !isCompleted})
              }
            />
          );
        }}
        keyExtractor={({id}) => id}
      />
      <FAB
        backgroundColor={colors.primary}
        accessibilityLabel="Add Task"
        icon="plus"
        onPress={onAdd}
      />
    </Screen>
  );
};

export const options = getBottomTabOptions('home-variant-outline');

export default class HomeScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;
