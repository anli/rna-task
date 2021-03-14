import {initialState, renderApp} from '@test';
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
  it('See Home Screen', () => {
    const state = {
      ...initialState,
      task: {
        ids: ['id1', 'id2'],
        entities: {
          id1: {id: 'id1', name: 'Task A'},
          id2: {id: 'id2', name: 'Task B'},
        },
      },
    };
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
      preloadedState: state,
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
});
