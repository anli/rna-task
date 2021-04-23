import {BackButton, DatePickerInput, Header, TaskNameInput} from '@components';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@store';
import {TaskActions, TaskSelectors} from '@task';
import {dispatchAsyncAction, STATUS} from '@utils';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Appbar, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {IsCompletedInput} from './components';

interface FormData {
  name: string;
  date?: string;
  isCompleted?: boolean;
}

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {
    params: {id},
  } = useRoute() as any;
  const data = useAppSelector(TaskSelectors.getSelectById(id));
  const dispatch = useAppDispatch();
  const {control, handleSubmit, errors, setValue, watch} = useForm<FormData>();
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const isCompleted = watch('isCompleted', false);
  const {colors} = useTheme();

  useEffect(() => {
    data?.name && setValue('name', data.name);
    data?.date && setValue('date', data.date);
    setValue('isCompleted', Boolean(data?.isCompleted));
  }, [setValue, data]);

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onDelete = async () => {
    const isSuccessful = await doAction(TaskActions.remove(id));
    isSuccessful && onBack();
  };

  const onUpdate = handleSubmit(async (changes) => {
    const isSuccessful = await doAction(TaskActions.update({id, changes}));
    isSuccessful && onBack();
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
        text2: 'Updated',
        position: 'bottom',
      });
  });

  return (
    <Screen>
      <Header>
        <BackButton onPress={onBack} />
        <Appbar.Content title="" />
        <Appbar.Action
          disabled={status === STATUS.LOADING}
          icon="trash-can-outline"
          accessibilityLabel="Delete"
          onPress={onDelete}
        />
      </Header>
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
      <IsCompletedInput control={control} onPress={onUpdate} />

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
