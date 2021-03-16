import {BackButton} from '@components';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch} from '@store';
import {taskSlice} from '@task';
import React from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import {TaskNameInput} from '../home/components';

interface FormData {
  name: string;
}

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {control, handleSubmit, errors} = useForm<FormData>();
  const dispatch = useAppDispatch();

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onSave = handleSubmit(({name}) => {
    const id = uuidv4();
    dispatch(taskSlice.actions.created({id, name}));
    onBack();
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

      <SaveButton accessibilityLabel="Save" icon="check" onPress={onSave} />
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
