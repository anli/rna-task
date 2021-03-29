import {mockFirestoreAdd} from '@mocks';
import {renderApp} from '@test';
import {act, fireEvent} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
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

  it('Add Task Successful', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const taskName = 'Task A';

    const {getByA11yLabel} = renderApp({
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
  });

  it('Add Task Failed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    mockFirestoreAdd.mockRejectedValue(new Error('ERROR'));
    mockedCanGoBack.mockReturnValue(true);

    const taskName = 'Task A';

    const {getByA11yLabel} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Save'));
    });

    await expect(mockedGoBack).toBeCalledTimes(0);
    expect(spyToastShow).toBeCalledTimes(1);
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });
});
