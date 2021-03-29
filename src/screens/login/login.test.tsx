import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {renderApp} from '@test';
import {fireEvent, waitFor} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import {act} from 'react-test-renderer';
import LoginScreen from './login';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
const mockedCanGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...(jest.requireActual('@react-navigation/native') as any),
    useNavigation: () => ({
      navigate: mockedNavigate,
      canGoBack: mockedCanGoBack,
      goBack: mockedGoBack,
    }),
  };
});

const mockedSignInWithCredential = jest.fn();
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signInWithCredential: mockedSignInWithCredential,
  }),
}));

describe('Login Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', () => {
    const {getByA11yLabel} = renderApp({
      Component: LoginScreen.Component,
      navigationOptions: LoginScreen.options,
    });

    expect(getByA11yLabel('Google Login')).toBeDefined();
  });

  it('Login Successfully', async () => {
    jest
      .spyOn(GoogleSignin, 'signIn')
      .mockReturnValue({idToken: 'MOCKED_ID_TOKEN'} as any);

    const {getByA11yLabel} = renderApp({
      Component: LoginScreen.Component,
      navigationOptions: LoginScreen.options,
    });

    act(() => {
      fireEvent.press(getByA11yLabel('Google Login'));
    });

    await waitFor(() => expect(mockedSignInWithCredential).toBeCalledTimes(1));
  });

  it('Login Failure', async () => {
    jest.spyOn(GoogleSignin, 'signIn').mockRejectedValue(new Error('ERROR'));
    const spyToastShow = jest.spyOn(Toast, 'show');

    const {getByA11yLabel} = renderApp({
      Component: LoginScreen.Component,
      navigationOptions: LoginScreen.options,
    });

    act(() => {
      fireEvent.press(getByA11yLabel('Google Login'));
    });

    await waitFor(() => expect(mockedSignInWithCredential).toBeCalledTimes(0));
    expect(spyToastShow).toBeCalledTimes(1);
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });
});
