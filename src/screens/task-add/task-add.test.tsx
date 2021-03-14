import {renderApp} from '@test';
import {act, fireEvent} from '@testing-library/react-native';
import TaskAddScreen from './task-add';

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

describe('Task Add Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', () => {
    const {getByText, getByA11yLabel} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    expect(getByA11yLabel('Back')).toBeDefined();
    expect(getByText('Add Task')).toBeDefined();
    expect(getByA11yLabel('Task Name')).toBeDefined();
    expect(getByA11yLabel('Save')).toBeDefined();
  });

  it('Press Back Button', () => {
    mockedCanGoBack.mockReturnValue(true);

    const {getByA11yLabel} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    fireEvent.press(getByA11yLabel('Back'));
    expect(mockedGoBack).toBeCalledTimes(1);
  });

  it('Press Back Button when cannot go back', () => {
    mockedCanGoBack.mockReturnValue(false);

    const {getByA11yLabel} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    fireEvent.press(getByA11yLabel('Back'));
    expect(mockedGoBack).toBeCalledTimes(0);
  });

  it('Press Save Button', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const taskName = 'Task A';

    const {getByA11yLabel, store} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Save'));
    });

    await expect(mockedGoBack).toBeCalledTimes(1);
    const taskAdded = Object.values(store.getState().task.entities)[0];
    expect(taskAdded?.name).toEqual(taskName);
  });
});
