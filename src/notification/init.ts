/* istanbul ignore file */

import PushNotification from 'react-native-push-notification';

const init = () => {
  PushNotification.configure({
    onRegister: function () {},

    onNotification: function () {},

    onAction: function () {},

    onRegistrationError: function () {},

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'channel-local', // (required)
      channelName: 'Local channel', // (required)
      channelDescription: 'A channel for local notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    () => null, // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export default init;
