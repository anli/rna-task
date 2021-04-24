import {logout, switchAccount, useAuthentication} from '@authentication';
import {Header} from '@components';
import styled from '@emotion/native';
import {getBottomTabOptions, useUpdateNeeded} from '@utils';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Linking} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Component = (): JSX.Element => {
  const {user} = useAuthentication();
  const email = user?.email;
  const {
    data: updateNeeded,
    isLoading: isLoadingUpdateNeeded,
  } = useUpdateNeeded({depth: 3});

  const onLogout = async () => {
    errorHandler(logout);
  };

  const onSwitchAccount = async () => {
    errorHandler(switchAccount);
  };

  const errorHandler = async (promise: () => Promise<any>) => {
    try {
      await promise();
    } catch ({message}) {
      Toast.show({
        type: 'error',
        text2: message,
      });
    }
  };

  const onUpdateVersion = () => {
    updateNeeded?.storeUrl && Linking.openURL(updateNeeded.storeUrl);
  };

  const versionTitle = `Version ${updateNeeded?.currentVersion}`;
  const versionDescription = updateNeeded?.isNeeded
    ? `New version ${updateNeeded.latestVersion} is available`
    : 'You are on the latest version';

  return (
    <Screen>
      <Header>
        <Appbar.Content title="Setting" />
      </Header>
      <List.Item
        accessibilityLabel="Switch Account"
        title={email}
        description="Switch Account"
        onPress={onSwitchAccount}
      />
      {isLoadingUpdateNeeded ? (
        <SettingItemIndicator />
      ) : (
        <List.Item
          accessibilityLabel="Update Version"
          title={versionTitle}
          description={versionDescription}
          onPress={onUpdateVersion}
        />
      )}
      <List.Item
        accessibilityLabel="Logout"
        onPress={onLogout}
        title="Logout"
      />
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

const SettingItemIndicator = () => (
  <ContentLoader height={69}>
    <Rect x="16" y="16" rx="0" ry="0" width={100} height={16} />
    <Rect x="16" y="40" rx="0" ry="0" width={200} height={12} />
  </ContentLoader>
);
