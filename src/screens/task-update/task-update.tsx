import {
  BackButton,
  DatePickerInput,
  Header,
  SaveButton,
  TaskNameInput,
} from '@components';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@store';
import {TaskActions, TaskSelectors} from '@task';
import {dispatchAsyncAction, STATUS} from '@utils';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Appbar} from 'react-native-paper';
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

  useEffect(() => {
    data?.name && setValue('name', data.name);
    data?.date && setValue('date', data.date);
    setValue('isCompleted', Boolean(data?.isCompleted));
  }, [setValue, data]);

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onDelete = () => {
    doAction(TaskActions.remove(id));
  };

  const onUpdate = handleSubmit(async (changes) => {
    doAction(TaskActions.update({id, changes}));
  });

  const doAction = async (action: any) => {
    const isSuccessful = await dispatchAsyncAction({
      setStatus,
      dispatch,
      action: action,
    });
    isSuccessful && onBack();
  };

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
      />

      <DatePickerInput control={control} />
      <IsCompletedInput control={control} />
      <SaveButton
        disabled={status === STATUS.LOADING}
        loading={status === STATUS.LOADING}
        onPress={onUpdate}
      />
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
