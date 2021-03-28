import {renderApp} from '@test';
import {fireEvent} from '@testing-library/react-native';
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

jest.mock('@react-native-firebase/auth', () => {
  return {
    __esModule: true,
    ...(jest.requireActual('@react-native-firebase/auth') as any),
    default: () => ({
      onAuthStateChanged: jest.fn((callback: any): any => {
        callback({uid: 'USER_ID'});
      }),
    }),
  };
});

const mockedOnSnapshot = jest.fn((callback) => {
  const query = {
    docs: [
      {id: 'idA', data: () => ({name: 'Task A'})},
      {id: 'idB', data: () => ({name: 'Task B'})},
    ],
  };
  callback(query);
  return jest.fn();
});
jest.mock('@react-native-firebase/firestore', () => {
  return {
    __esModule: true,
    ...(jest.requireActual('@react-native-firebase/firestore') as any),
    default: () => ({
      collection: () => ({onSnapshot: mockedOnSnapshot}),
    }),
  };
});

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See Home Screen', () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    expect(getByText('Tasks')).toBeDefined();
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
});
