import {Header} from '@components';
import styled from '@emotion/native';
import {getBottomTabOptions} from '@utils';
import React from 'react';
import {getVersion} from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';

const Component = (): JSX.Element => {
  const version = getVersion();
  return (
    <Screen>
      <Header>
        <Appbar.Content title="Setting" />
      </Header>
      <List.Item title={version} description="Version" />
    </Screen>
  );
};

export const options = getBottomTabOptions('cog');

export default class SettingScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;
