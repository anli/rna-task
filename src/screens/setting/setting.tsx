import {logout, switchAccount, useAuthentication} from '@authentication';
import {Header} from '@components';
import styled from '@emotion/native';
import {useNotification} from '@notification';
import {useFocusEffect} from '@react-navigation/native';
import {getBottomTabOptions, useUpdateNeeded} from '@utils';
import React, {useCallback} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Component = (): JSX.Element => {
  const {user} = useAuthentication();
  const {
    data: updateNeeded,
    isLoading: isLoadingUpdateNeeded,
    checkVersion,
  } = useUpdateNeeded({depth: 3});
  const {t} = useTranslation();
  const {
    hasNotification,
    isLoading: isLoadingNotification,
    start: startNotification,
    end: endNotification,
  } = useNotification();

  const email = user?.email;

  useFocusEffect(
    useCallback(() => {
      checkVersion();
    }, [checkVersion]),
  );

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

  const onUpdateNotification = async () => {
    if (hasNotification) {
      await endNotification();
      Toast.show({
        position: 'bottom',
        type: 'success',
        text2: t(
          'setting.update_notification_disabled_title',
          'Daily notification is disabled',
        ),
      });
      return;
    }

    await startNotification();
    Toast.show({
      position: 'bottom',
      type: 'success',
      text2: t(
        'setting.update_notification_disabled_title',
        'Daily notification is disabled',
      ),
    });
    return;
  };

  const versionTitle = t('setting.version', {
    defaultValue: 'Version {{value}}',
    value: updateNeeded?.currentVersion,
  });

  const versionDescription = getVersionDescription(
    Boolean(updateNeeded?.isNeeded),
    t,
    updateNeeded?.latestVersion,
  );

  const notificationTitle = getNotificationTitle(hasNotification, t);

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

      <ListItem
        isLoading={isLoadingUpdateNeeded}
        accessibilityLabel={t('setting.update_version', 'Update Version')}
        title={versionTitle}
        description={versionDescription}
        onPress={onUpdateVersion}
      />

      <ListItem
        isLoading={isLoadingNotification}
        accessibilityLabel={notificationTitle}
        title={notificationTitle}
        description={t(
          'setting.update_notification_description',
          'Every morning at 9AM',
        )}
        onPress={onUpdateNotification}
      />

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

const ListItemIndicator = () => (
  <ContentLoader height={69}>
    <Rect x="16" y="16" rx="0" ry="0" width={100} height={16} />
    <Rect x="16" y="40" rx="0" ry="0" width={200} height={12} />
  </ContentLoader>
);

const ListItem = ({isLoading, ...props}: any) => {
  if (isLoading) {
    return <ListItemIndicator />;
  }

  return <List.Item {...props} />;
};

const getVersionDescription = (
  hasNewVersion: boolean,
  t: any,
  latestVersion: string = '',
) => {
  if (hasNewVersion) {
    return t('setting.version_new_available', {
      value: latestVersion,
      defaultValue: 'New version {{value}} is available',
    });
  }

  return t('setting.version_is_latest', 'You are on the latest version');
};

const getNotificationTitle = (hasNotification: boolean, t: any) => {
  if (hasNotification) {
    return t(
      'setting.update_notification_enabled_title',
      'Daily notification is enabled',
    );
  }

  return t(
    'setting.update_notification_disabled_title',
    'Daily notification is disabled',
  );
};
