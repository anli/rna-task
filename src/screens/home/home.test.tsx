import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {renderApp} from '@test';
import {fireEvent, waitFor} from '@testing-library/react-native';
import BottomSheet from 'react-native-bottomsheet';
import Toast from 'react-native-toast-message';
import HomeScreen from './home';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...(jest.requireActual('@react-navigation/native') as any),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
const mockedSignOut = jest.fn();
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signOut: mockedSignOut,
    onAuthStateChanged: jest.fn((callback) => {
      callback({uid: 'USER_ID'});
    }),
  }),
}));

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See Home Screen', () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    expect(getByText('All Tasks')).toBeDefined();
    expect(getByText('Task A')).toBeDefined();
    expect(getByText('Task B')).toBeDefined();
  });

  it('Add Task Button', () => {
    const {getByA11yLabel} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByA11yLabel('Add Task'));

    expect(mockedNavigate).toBeCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith('TaskAddScreen');
  });

  it('Update Task', () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByText('Task A'));

    expect(mockedNavigate).toBeCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith('TaskUpdateScreen', {id: 'idA'});
  });

  it('Filter tasks by What I can do', async () => {
    jest
      .spyOn(BottomSheet, 'showBottomSheetWithOptions')
      .mockImplementation((_, callback: any) => {
        callback(0);
      });

    const {getByText, getByA11yLabel} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByA11yLabel('Filter'));

    await expect(getByText('What I can do')).toBeDefined();
  });

  it('Filter tasks by What I want to do Today', async () => {
    jest
      .spyOn(BottomSheet, 'showBottomSheetWithOptions')
      .mockImplementation((_, callback: any) => {
        callback(1);
      });

    const {getByText, getByA11yLabel} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByA11yLabel('Filter'));

    await expect(getByText('What I want to do Today')).toBeDefined();
  });

  it('Filter tasks by What I did Yesterday', async () => {
    jest
      .spyOn(BottomSheet, 'showBottomSheetWithOptions')
      .mockImplementation((_, callback: any) => {
        callback(2);
      });

    const {getByText, getByA11yLabel} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByA11yLabel('Filter'));

    await expect(getByText('What I did Yesterday')).toBeDefined();
  });

  it('Logout Successfully', async () => {
    jest.spyOn(GoogleSignin, 'revokeAccess').mockResolvedValue(null);
    jest.spyOn(GoogleSignin, 'signOut').mockResolvedValue(null);

    const {getByA11yLabel} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
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
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByA11yLabel('Logout'));

    await waitFor(() => expect(mockedSignOut).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledTimes(1);
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });
});
