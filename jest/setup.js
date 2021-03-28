import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// https://github.com/invertase/react-native-firebase/issues/2475
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-firebase/firestore', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@react-native-firebase/firestore'),
    default: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        onSnapshot: jest.fn((callback) => {
          const query = {
            docs: [
              {id: 'idA', data: () => ({name: 'Task A'})},
              {id: 'idB', data: () => ({name: 'Task B'})},
            ],
          };
          callback(query);
          return jest.fn();
        }),
        add: jest.fn().mockResolvedValue(true),
      }),
    }),
    firebase: {
      auth: jest.fn().mockReturnValue({
        currentUser: {
          uid: 'USER_UID',
        },
      }),
    },
  };
});

jest.mock('@react-native-firebase/auth', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@react-native-firebase/auth'),
    default: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback({uid: 'USER_ID'});
      }),
    }),
  };
});

jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
  };
});
