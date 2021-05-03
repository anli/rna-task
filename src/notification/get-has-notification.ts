/* istanbul ignore file */

import PushNotification from 'react-native-push-notification';

const getHasNotification = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      PushNotification.getScheduledLocalNotifications((notifications) => {
        resolve(Boolean(notifications.length > 0));
      });
    }, 1000);
  });
};

export default getHasNotification;
