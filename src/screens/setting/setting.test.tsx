import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {renderApp} from '@test';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import VersionCheck from 'react-native-version-check';
import SettingScreen from './setting';

const mockedSignOut = jest.fn();
const mockedSignInWithCredential = jest.fn();
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signOut: mockedSignOut,
    onAuthStateChanged: jest.fn((callback) => {
      callback({uid: 'USER_ID', email: 'user@email.com'});
    }),
    signInWithCredential: mockedSignInWithCredential,
  }),
}));

describe('Setting Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', async () => {
    const {getByText} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    await waitFor(() => expect(getByText('Version 1.0.0')).toBeDefined());
    expect(getByText('You are on the latest version')).toBeDefined();
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

  it('Switch account successfully', async () => {
    jest
      .spyOn(GoogleSignin, 'signIn')
      .mockReturnValue({idToken: 'MOCKED_ID_TOKEN'} as any);

    const {getByA11yLabel} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    fireEvent.press(getByA11yLabel('Switch Account'));

    await waitFor(() => expect(mockedSignInWithCredential).toBeCalledTimes(1));
  });

  it('See UI when new version is available', async () => {
    jest.spyOn(VersionCheck, 'needUpdate').mockResolvedValue({
      isNeeded: true,
      currentVersion: '1.0.0',
      latestVersion: '2.0.0',
      storeUrl: 'STORE_URL',
    });

    const {getByText} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    await waitFor(() => expect(getByText('Version 1.0.0')).toBeDefined());
    expect(getByText('New version 2.0.0 is available')).toBeDefined();
  });

  it('Press version to go to store URL', async () => {
    const spyOpenUrl = jest.spyOn(Linking, 'openURL');
    const {getByText} = renderApp({
      Component: SettingScreen.Component,
      navigationOptions: SettingScreen.options,
    });

    await waitFor(() => expect(getByText('Version 1.0.0')).toBeDefined());
    fireEvent.press(getByText('Version 1.0.0'));
    expect(spyOpenUrl).toBeCalledTimes(1);
    expect(spyOpenUrl).toBeCalledWith('STORE_URL');
  });
});
