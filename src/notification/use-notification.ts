/* istanbul ignore file */

import {useCallback, useEffect, useState} from 'react';
import PushNotification from 'react-native-push-notification';
import getHasNotification from './get-has-notification';

enum STATUS {
  IDLE,
  LOADING,
}

const useNotification = () => {
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [hasNotification, setHasNotification] = useState<boolean>(false);

  const init = useCallback(async () => {
    const value = await getHasNotification();
    setHasNotification(value);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const start = () => {
    return new Promise(async (resolve) => {
      setStatus(STATUS.LOADING);
      const hour = 9;
      const minute = 0;
      const second = 0;

      const now = new Date();
      const tomorrow = new Date(new Date().setDate(now.getDate() + 1));
      const date = new Date(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate(),
        hour,
        minute,
        second,
      );

      PushNotification.localNotificationSchedule({
        id: 1000,
        channelId: 'channel-local',
        message: 'Start your day with Tasks',
        date,
        repeatType: 'day',
      });

      await init();
      setStatus(STATUS.IDLE);
      resolve(true);
    });
  };

  const end = async () => {
    return new Promise(async (resolve) => {
      setStatus(STATUS.LOADING);
      PushNotification.getScheduledLocalNotifications((notifications) => {
        notifications.forEach((notification) => {
          const id = String(notification.id);
          PushNotification.cancelLocalNotifications({id});
        });
      });

      await init();
      setStatus(STATUS.IDLE);
      resolve(true);
    });
  };

  return {isLoading: status === STATUS.LOADING, hasNotification, start, end};
};

export default useNotification;
