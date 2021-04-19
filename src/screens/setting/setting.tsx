import {Header} from '@components';
import styled from '@emotion/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {getVersion} from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';

const Component = (): JSX.Element => {
  const version = getVersion();
  console.log({version});
  return (
    <Screen>
      <Header>
        <Appbar.Content title="Settings" />
      </Header>
      <List.Item title={version} description="Version" />
    </Screen>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default class SettingScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;
