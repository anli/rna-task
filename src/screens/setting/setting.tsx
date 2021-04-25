import {logout, useAuthentication} from '@authentication';
import {Header} from '@components';
import styled from '@emotion/native';
import {getBottomTabOptions, useUpdateNeeded} from '@utils';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();

  const onLogout = async () => {
    errorHandler(logout);
  };

  const onSwitchAccount = async () => {
    throw new Error('My first Sentry error!');

    // errorHandler(switchAccount);
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

  const versionTitle = t('setting.version', {
    defaultValue: 'Version {{value}}',
    value: updateNeeded?.currentVersion,
  });

  const versionDescription = updateNeeded?.isNeeded
    ? t('setting.version_new_available', {
        value: updateNeeded.latestVersion,
        defaultValue: 'New version {{value}} is available',
      })
    : t('setting.version_is_latest', 'You are on the latest version');

  return (
    <Screen>
      <Header>
        <Appbar.Content title={t('setting.screen_title', 'Setting')} />
      </Header>
      <List.Item
        accessibilityLabel={t('setting.switch_account', 'Switch Account')}
        title={email}
        description={t('setting.switch_account', 'Switch Account')}
        onPress={onSwitchAccount}
      />
      {isLoadingUpdateNeeded ? (
        <SettingItemIndicator />
      ) : (
        <List.Item
          accessibilityLabel={t('setting.update_version', 'Update Version')}
          title={versionTitle}
          description={versionDescription}
          onPress={onUpdateVersion}
        />
      )}
      <List.Item
        accessibilityLabel={t('setting.logout', 'Logout')}
        onPress={onLogout}
        title={t('setting.logout', 'Logout')}
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
