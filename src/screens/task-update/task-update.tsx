import {BackButton} from '@components';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@store';
import {TaskSelectors, taskSlice} from '@task';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {TaskNameInput} from '../home/components';

interface FormData {
  name: string;
}

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {
    params: {id},
  } = useRoute() as any;
  const data = useAppSelector(TaskSelectors.getSelectById(id));
  const dispatch = useAppDispatch();
  const {control, handleSubmit, errors, setValue} = useForm<FormData>();

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
    }
  }, [setValue, data]);

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onDelete = () => {
    dispatch(taskSlice.actions.deleted(id));
    onBack();
  };

  const onSave = handleSubmit((changes) => {
    dispatch(taskSlice.actions.updated({id, changes}));
    onBack();
  });

  return (
    <Screen>
      <Appbar.Header>
        <BackButton onPress={onBack} />
        <Appbar.Content title="" />
        <Appbar.Action
          icon="trash-can-outline"
          accessibilityLabel="Delete"
          onPress={onDelete}
        />
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
