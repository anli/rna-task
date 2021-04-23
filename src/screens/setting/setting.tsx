import {logout, useAuthentication} from '@authentication';
import {Header} from '@components';
import styled from '@emotion/native';
import {getBottomTabOptions} from '@utils';
import React from 'react';
import {getVersion} from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Component = (): JSX.Element => {
  const version = getVersion();
  const {user} = useAuthentication();
  const email = user?.email;

  const onLogout = async () => {
    try {
      await logout();
    } catch ({message}) {
      Toast.show({
        type: 'error',
        text2: message,
      });
    }
  };

  return (
    <Screen>
      <Header>
        <Appbar.Content title="Setting" />
      </Header>
      <List.Item
        accessibilityLabel="Logout"
        title="Logout"
        description={email}
        onPress={onLogout}
      />
      <List.Item title={version} description="Version" />
    </Screen>
  );
};

export const options = getBottomTabOptions('cog', 'Setting');

export default class SettingScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;
