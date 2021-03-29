import {mockFirestoreDelete, mockFirestoreUpdate} from '@mocks';
import {RootState} from '@store';
import {initialState, renderApp} from '@test';
import {act, fireEvent} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import TaskUpdateScreen from './task-update';

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

const defaultState: RootState = {
  ...initialState,
  task: {ids: ['idA'], entities: {idA: {id: 'idA', name: 'Task A'}}},
};

const defaultParams = {id: 'idA'};

describe('Task Update Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', () => {
    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    expect(getByA11yLabel('Back')).toBeDefined();
    expect(getByA11yLabel('Task Name')).toBeDefined();
    expect(getByA11yLabel('Task Name').props.value).toEqual('Task A');
    expect(getByA11yLabel('Delete')).toBeDefined();
  });

  it('Press Back Button', () => {
    mockedCanGoBack.mockReturnValue(true);

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    fireEvent.press(getByA11yLabel('Back'));
    expect(mockedGoBack).toBeCalledTimes(1);
  });

  it('Press Back Button when cannot go back', () => {
    mockedCanGoBack.mockReturnValue(false);

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    fireEvent.press(getByA11yLabel('Back'));
    expect(mockedGoBack).toBeCalledTimes(0);
  });

  it('Delete Successful', async () => {
    mockedCanGoBack.mockReturnValue(true);

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Delete'));
    });

    await expect(mockedGoBack).toBeCalledTimes(1);
  });

  it('Delete Failed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    mockFirestoreDelete.mockRejectedValue(new Error('ERROR'));
    mockedCanGoBack.mockReturnValue(true);

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Delete'));
    });

    await expect(mockedGoBack).toBeCalledTimes(0);
    expect(spyToastShow).toBeCalledTimes(1);
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });

  it('Update Successful', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const taskName = 'Task A2';

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Save'));
    });

    await expect(mockedGoBack).toBeCalledTimes(1);
  });

  it('Update Failed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    mockFirestoreUpdate.mockRejectedValue(new Error('ERROR'));
    mockedCanGoBack.mockReturnValue(true);
    const taskName = 'Task A2';

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
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
