import {Header} from '@components';
import styled from '@emotion/native';
import {Filter, useFilter} from '@filter';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@store';
import {Task, TaskActions, TaskSelectors, useFetchTask} from '@task';
import {dispatchAsyncAction, getBottomTabOptions} from '@utils';
import {isToday, startOfToday} from 'date-fns';
import {isBefore} from 'date-fns/fp';
import R from 'ramda';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
    case 'didPreviously':
      const filterIsBeforeToday = R.filter<Task>((task) =>
        isDatePeriod(task, isBefore(startOfToday())),
      );
      const previousDates: Task[] = R.pipe(
        filterCompleted,
        filterIsBeforeToday,
      )(data);

      return {
        notCompleted: [],
        completed: R.filter<Task>(
          (task) => task?.date === R.head(R.pluck('date', previousDates)),
        )(data),
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
  const {
    filter,
    onFilter,
    filterOptions,
    filterOptionsDefaultValue,
  } = useFilter();
  const [competedListExpanded, setCompetedListExpanded] = useState<boolean>(
    false,
  );
  const {t} = useTranslation();
  useFetchTask();

  useEffect(() => {
    if (filter === 'didPreviously') {
      return setCompetedListExpanded(true);
    }
  }, [filter]);

  const data = getData(allData, filter);

  const title = t(filterOptions[filter], filterOptionsDefaultValue[filter]);
  const notCompletedTaskCount = data.completed.length;

  const onUpdate = (id: string) => {
    navigate('TaskUpdateScreen', {id});
  };

  const onPresentFilterRelativeDay = () => {
    const options = [
      ...Object.keys(filterOptions).map((value) =>
        t(
          filterOptions[value as Filter],
          filterOptionsDefaultValue[value as Filter],
        ),
      ),
      t('filter_option.cancel', 'Cancel'),
    ];
    BottomSheet.showBottomSheetWithOptions(
      {
        options,
        title: t('filter_option_title', 'See'),
        cancelButtonIndex: Object.values(filterOptions).length,
      },
      (index) => {
        const key = Object.keys(filterOptions)[index] as Filter;
        key && onFilter(key);
      },
    );
  };

  const onComplete = async (id: string, changes: Partial<Task>) => {
    const isSuccessful = await dispatchAsyncAction({
      setStatus: undefined,
      dispatch,
      action: TaskActions.complete({id, changes}),
    });

    const message = changes.isCompleted
      ? t('toast.mark_completed_successful', 'Marked completed successfully')
      : t(
          'toast.mark_not_completed_successful',
          'Marked not completed successfully',
        );

    isSuccessful &&
      Toast.show({
        position: 'bottom',
        type: 'success',
        text2: message,
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
          accessibilityLabel={t('home.filter', 'Filter')}
          icon="filter-variant"
          onPress={onPresentFilterRelativeDay}
        />
      </Header>
      <FlatList
        data={[data.notCompleted, data.completed]}
        renderItem={({item, index}: any) => {
          if (index === 0) {
            return (
              <TaskList
                data={item}
                onComplete={onComplete}
                onUpdate={onUpdate}
              />
            );
          }

          return showCompletedSection ? (
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
          ) : null;
        }}
        keyExtractor={(_, index) => String(index)}
      />
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
      renderItem={({item}) => {
        const {name, id, date, isCompleted, schedule} = item;
        return (
          <TaskComponent
            title={name}
            onPress={() => onUpdate(id)}
            date={date}
            isCompleted={isCompleted}
            schedule={schedule}
            onCompletePress={() =>
              onComplete(id, {...item, isCompleted: !isCompleted})
            }
          />
        );
      }}
      keyExtractor={({id}) => id}
    />
  );
};
