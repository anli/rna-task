import {Header} from '@components';
import styled from '@emotion/native';
import {Filter, useFilter} from '@filter';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@store';
import {Task, TaskActions, TaskSelectors, useFetchTask} from '@task';
import {dispatchAsyncAction, getBottomTabOptions} from '@utils';
import {isToday, isYesterday} from 'date-fns';
import R from 'ramda';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import BottomSheet from 'react-native-bottomsheet';
import {Appbar, List} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Task as TaskComponent} from './components';

const getData = (data: Task[], filter: Filter) => {
  const filterNotCompleted = R.filter<Task>((task) => !task?.isCompleted);
  const filterCompleted = R.filter<Task>((task) => Boolean(task?.isCompleted));
  const isDatePeriod = (task: Task, isPeriod: (date: Date) => boolean) =>
    typeof task?.date === 'string' && isPeriod(new Date(task.date));

  switch (filter) {
    case 'canDo':
      return {
        notCompleted: R.pipe(filterNotCompleted)(data),
        completed: [],
      };
    case 'wantToDoToday':
      const filterToday = R.filter<Task>((task) => isDatePeriod(task, isToday));

      return {
        notCompleted: R.pipe(filterNotCompleted, filterToday)(data),
        completed: R.pipe(filterToday, filterCompleted)(data),
      };
    case 'didYesterday':
      const filterYesterday = R.filter<Task>((task) =>
        isDatePeriod(task, isYesterday),
      );

      return {
        notCompleted: [],
        completed: R.pipe(filterCompleted, filterYesterday)(data),
      };

    default:
      return {
        notCompleted: R.pipe(filterNotCompleted)(data),
        completed: R.pipe(filterCompleted)(data),
      };
  }
};

const Component = (): JSX.Element => {
  const {navigate} = useNavigation();
  const allData = useAppSelector(TaskSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {filter, onFilter, filterOptions} = useFilter();
  const [competedListExpanded, setCompetedListExpanded] = useState<boolean>(
    false,
  );

  useFetchTask();

  const data = getData(allData, filter);
  const title = filterOptions[filter];
  const notCompletedTaskCount = data.completed.length;

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

        if (key === 'didYesterday') {
          return setCompetedListExpanded(true);
        }

        return setCompetedListExpanded(false);
      },
    );
  };

  const onComplete = async (id: string, changes: {isCompleted: boolean}) => {
    const isSuccessful = await dispatchAsyncAction({
      setStatus: undefined,
      dispatch,
      action: TaskActions.update({id, changes}),
    });

    isSuccessful &&
      Toast.show({
        position: 'bottom',
        type: 'success',
        text2: `Marked ${
          changes.isCompleted ? 'completed' : 'not completed'
        } successfully`,
      });
  };

  const onCompletedListExpandedPress = () =>
    setCompetedListExpanded(!competedListExpanded);

  const showCompletedSection = !R.isEmpty(data.completed);

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
      <Sections>
        <TaskList
          data={data.notCompleted}
          onComplete={onComplete}
          onUpdate={onUpdate}
        />
        {showCompletedSection && (
          <List.Accordion
            testID="CompletedTaskListAccordion"
            title={`Completed (${notCompletedTaskCount})`}
            expanded={competedListExpanded}
            onPress={onCompletedListExpandedPress}>
            <TaskList
              data={data.completed}
              onComplete={onComplete}
              onUpdate={onUpdate}
            />
          </List.Accordion>
        )}
      </Sections>
    </Screen>
  );
};

export const options = getBottomTabOptions('home-variant-outline', 'Home');

export default class HomeScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const Sections = styled.View``;

const TaskList = ({
  data,
  onUpdate,
  onComplete,
}: {
  data: Task[];
  onUpdate: (id: string) => void;
  onComplete: (id: string, changes: {isCompleted: boolean}) => void;
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item: {name, id, date, isCompleted}}) => {
        return (
          <TaskComponent
            title={name}
            onPress={() => onUpdate(id)}
            date={date}
            isCompleted={isCompleted}
            onCompletePress={() => onComplete(id, {isCompleted: !isCompleted})}
          />
        );
      }}
      keyExtractor={({id}) => id}
    />
  );
};
