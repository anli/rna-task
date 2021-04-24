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

jest.mock('@components', () => ({
  ...jest.requireActual('@components'),
  Toast: jest.fn().mockReturnValue(null),
}));

jest.mock('react-native-bottomsheet', () => ({
  showBottomSheetWithOptions: jest.fn(),
}));

jest.mock('react-native-version-check', () => ({
  getStoreUrl: jest.fn().mockResolvedValue('STORE_URL'),
  needUpdate: jest.fn().mockResolvedValue({
    isNeeded: false,
    currentVersion: '1.0.0',
    latestVersion: '1.0.0',
    storeUrl: 'STORE_URL',
  }),
}));
