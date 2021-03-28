import {BackButton, TaskNameInput} from '@components';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {unwrapResult} from '@reduxjs/toolkit';
import {useAppDispatch} from '@store';
import {TaskActions} from '@task';
import React, {useState} from 'react';
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
  const {control, handleSubmit, errors} = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onSave = handleSubmit(async (task) => {
    try {
      setStatus(STATUS.LOADING);
      const action$ = await dispatch(TaskActions.create(task));
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
        <Appbar.Content title="Add Task" />
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

export default class TaskAddScreen {
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
