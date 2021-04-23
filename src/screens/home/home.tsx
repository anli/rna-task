import {FAB, Header} from '@components';
import styled from '@emotion/native';
import {Filter, useFilter} from '@filter';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@store';
import {Task, TaskActions, TaskSelectors, useFetchTask} from '@task';
import {getBottomTabOptions} from '@utils';
import {isToday, isYesterday} from 'date-fns';
import R from 'ramda';
import React from 'react';
import {FlatList} from 'react-native';
import BottomSheet from 'react-native-bottomsheet';
import {Appbar, useTheme} from 'react-native-paper';
import {Task as TaskComponent} from './components';

const getData = (data: Task[], filter: Filter) => {
  const sort = R.sortBy(R.prop('isCompleted'));
  switch (filter) {
    case 'canDo':
      return sort(data.filter((task) => !task?.isCompleted));
    case 'wantToDoToday':
      return sort(
        data.filter((task) => task?.date && isToday(new Date(task.date))),
      );
    case 'didYesterday':
      return sort(
        data.filter(
          (task) =>
            task?.isCompleted && task?.date && isYesterday(new Date(task.date)),
        ),
      );
    default:
      return sort(data);
  }
};

const Component = (): JSX.Element => {
  const {navigate} = useNavigation();
  const allData = useAppSelector(TaskSelectors.selectAll);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {filter, onFilter, filterOptions} = useFilter();

  useFetchTask();

  const data = getData(allData, filter);
  const title = filterOptions[filter];

  const onAdd = () => {
    navigate('TaskAddScreen');
  };

  const onUpdate = (id: string) => {
    navigate('TaskUpdateScreen', {id});
  };

  const onPresentFilterRelativeDay = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: [...Object.values(filterOptions), 'Cancel'],
        title: 'See',
        cancelButtonIndex: Object.values(filterOptions).length,
      },
      (index) => {
        const value = Object.values(filterOptions)[index];
        const key = Object.keys(filterOptions).find((filterKey) => {
          const filterValue = filterOptions[filterKey as Filter];
          return filterValue === value;
        }) as Filter;

        onFilter(key);
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
