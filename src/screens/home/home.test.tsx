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
    expect(getByText('Sat, 10 Apr')).toBeDefined();
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
