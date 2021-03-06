import {analytics} from '@analytics';
import {
  BackButton,
  DatePickerInput,
  Header,
  ScheduleInput,
  TaskNameInput,
} from '@components';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@store';
import {TaskActions, TaskSelectors} from '@task';
import {dispatchAsyncAction, STATUS} from '@utils';
import R from 'ramda';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Appbar, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {IsCompletedInput} from './components';

interface FormData {
  name: string;
  date?: string;
  isCompleted?: boolean;
  schedule?: {period: string; frequency: number};
}

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {
    params: {id},
  } = useRoute() as any;
  const data = useAppSelector(TaskSelectors.getSelectById(id));
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    errors,
    setValue,
    watch,
    getValues,
  } = useForm<FormData>();
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const isCompleted = watch('isCompleted', false);
  const {colors} = useTheme();
  const {t} = useTranslation();

  useEffect(() => {
    data?.name && setValue('name', data.name);
    setValue('date', data?.date || null);
    setValue('isCompleted', Boolean(data?.isCompleted));
    setValue('schedule', data?.schedule || null);
  }, [setValue, data]);

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onDelete = async () => {
    const isSuccessful = await doAction(TaskActions.remove(id));
    isSuccessful && onBack();
  };

  const onUpdateIsComplete = handleSubmit(async (changes) => {
    const isSuccessful = await doAction(TaskActions.complete({id, changes}));
    await analytics.logEvent('task_update', {isCompleted: changes.isCompleted});
    return changes.isCompleted && isSuccessful && onBack();
  });

  const doAction = async (action: any) => {
    return await dispatchAsyncAction({
      setStatus,
      dispatch,
      action: action,
    });
  };

  const onUpdateValue = handleSubmit(async (changes) => {
    const isSuccessful = await doAction(TaskActions.update({id, changes}));
    isSuccessful &&
      Toast.show({
        type: 'success',
        text2: t('toast.update_successful', 'Updated'),
        position: 'bottom',
      });
  });

  const validateIsComplete = (value: boolean) => {
    const date = getValues('date');
    return !(value && R.isNil(date));
  };

  return (
    <Screen>
      <Header>
        <BackButton onPress={onBack} />
        <Appbar.Content title="" />
        <Appbar.Action
          disabled={status === STATUS.LOADING}
          icon="trash-can-outline"
          accessibilityLabel={t(
            'task_delete_button.accessibility_label',
            'Delete',
          )}
          onPress={onDelete}
        />
      </Header>

      <Content>
        <TaskNameInput
          control={control}
          errors={errors}
          isCompleted={isCompleted}
          onUpdate={onUpdateValue}
        />

        <DatePickerInput
          control={control}
          onUpdate={onUpdateValue}
          disabled={isCompleted}
        />

        <ScheduleInput
          disabled={isCompleted}
          placeholder={t('schedule_input.placeholder', 'Repeat')}
          control={control}
          onUpdate={onUpdateValue}
          accessibilityLabel={t(
            'schedule_input.accessibility_label',
            'Schedule',
          )}
        />

        <IsCompletedInput
          completedLabel={t(
            'task_is_completed_input.completed_label',
            'Mark not completed',
          )}
          notCompletedLabel={t(
            'task_is_completed_input.not_completed_label',
            'Mark completed',
          )}
          accessibilityLabel={t(
            'task_is_completed_input.accessibility_label',
            'Is Completed',
          )}
          control={control}
          onPress={onUpdateIsComplete}
          validate={validateIsComplete}
          validationMessage={t(
            'task_is_completed_input.validation_message',
            'Please enter a date first.',
          )}
        />
      </Content>
      {status === STATUS.LOADING && (
        <ActivityIndicator
          accessibilityLabel="Loading Indicator"
          size="large"
          color={colors.primary}
        />
      )}
    </Screen>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default class TaskUpdateScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const ActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const Content = styled.View`
  padding-left: 4px;
`;
