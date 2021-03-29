import {BackButton, TaskNameInput} from '@components';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {unwrapResult} from '@reduxjs/toolkit';
import {useAppDispatch, useAppSelector} from '@store';
import {TaskActions, TaskSelectors} from '@task';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import Toast from 'react-native-toast-message';

interface FormData {
  name: string;
}

enum STATUS {
  IDLE,
  LOADING,
}

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {
    params: {id},
  } = useRoute() as any;
  const data = useAppSelector(TaskSelectors.getSelectById(id));
  const dispatch = useAppDispatch();
  const {control, handleSubmit, errors, setValue} = useForm<FormData>();
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);

  useEffect(() => {
    setValue('name', data?.name);
  }, [setValue, data]);

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onDelete = async () => {
    try {
      setStatus(STATUS.LOADING);
      const action$ = await dispatch(TaskActions.remove(id));
      await unwrapResult(action$);
      setStatus(STATUS.IDLE);
      onBack();
    } catch ({message}) {
      setStatus(STATUS.IDLE);
      Toast.show({
        type: 'error',
        text2: message,
      });
    }
  };

  const onSave = handleSubmit(async (changes) => {
    try {
      setStatus(STATUS.LOADING);
      const action$ = await dispatch(TaskActions.update({id, changes}));
      await unwrapResult(action$);
      setStatus(STATUS.IDLE);
      onBack();
    } catch ({message}) {
      setStatus(STATUS.IDLE);
      Toast.show({
        type: 'error',
        text2: message,
      });
    }
  });

  return (
    <Screen>
      <Appbar.Header>
        <BackButton onPress={onBack} />
        <Appbar.Content title="" />
        <Appbar.Action
          disabled={status === STATUS.LOADING}
          icon="trash-can-outline"
          accessibilityLabel="Delete"
          onPress={onDelete}
        />
      </Appbar.Header>
      <View>
        <TaskNameInput control={control} errors={errors} />
      </View>
      <SaveButton
        disabled={status === STATUS.LOADING}
        loading={status === STATUS.LOADING}
        accessibilityLabel="Save"
        icon="check"
        onPress={onSave}
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

const SaveButton = styled(FAB)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
