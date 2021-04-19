import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {renderApp} from '@test';
import {fireEvent, waitFor} from '@testing-library/react-native';
import ReactNativeDeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import SettingScreen from './setting';

const mockedSignOut = jest.fn();
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signOut: mockedSignOut,
    onAuthStateChanged: jest.fn((callback) => {
      callback({uid: 'USER_ID', email: 'user@email.com'});
    }),
  }),
}));

describe('Setting Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', () => {
    jest.spyOn(ReactNativeDeviceInfo, 'getVersion').mockReturnValue('1.0.0');

    const {getByText} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    expect(getByText('1.0.0')).toBeDefined();
    expect(getByText('user@email.com')).toBeDefined();
  });

  it('Logout Successfully', async () => {
    jest.spyOn(GoogleSignin, 'revokeAccess').mockResolvedValue(null);
    jest.spyOn(GoogleSignin, 'signOut').mockResolvedValue(null);

    const {getByA11yLabel} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    fireEvent.press(getByA11yLabel('Logout'));

    await waitFor(() => expect(mockedSignOut).toBeCalledTimes(1));
  });

  it('Logout Failed', async () => {
    jest.spyOn(GoogleSignin, 'revokeAccess').mockResolvedValue(null);
    jest.spyOn(GoogleSignin, 'signOut').mockResolvedValue(null);
    mockedSignOut.mockRejectedValue(new Error('ERROR'));
    const spyToastShow = jest.spyOn(Toast, 'show');

    const {getByA11yLabel} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    fireEvent.press(getByA11yLabel('Logout'));

    await waitFor(() => expect(mockedSignOut).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledTimes(1);
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });
});
