import {BackButton} from '@components';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '@store';
import {TaskSelectors, taskSlice} from '@task';
import React from 'react';
import {View} from 'react-native';
import {Appbar, List} from 'react-native-paper';

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {
    params: {id},
  } = useRoute() as any;
  const data = useAppSelector(TaskSelectors.getSelectById(id));
  const dispatch = useAppDispatch();

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onDelete = () => {
    dispatch(taskSlice.actions.deleted(id));
    onBack();
  };

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
        <List.Item title={data?.name} />
      </View>
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
