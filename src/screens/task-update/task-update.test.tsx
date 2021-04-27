import {mockFirestoreDelete, mockFirestoreUpdate} from '@mocks';
import {RootState} from '@store';
import {TaskActions} from '@task';
import {initialState, renderApp} from '@test';
import {act, fireEvent, waitFor} from '@testing-library/react-native';
import {formatISO} from 'date-fns';
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
  task: {
    ids: ['idA'],
    entities: {
      idA: {id: 'idA', name: 'Task A', date: '2021-04-10'},
    },
  },
};

const defaultParams = {id: 'idA'};

describe('Task Update Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFirestoreUpdate.mockResolvedValue(true);
  });

  it('See UI', async () => {
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');
    const spyToastShow = jest.spyOn(Toast, 'show');
    const {getByA11yLabel, getByText} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    expect(getByA11yLabel('Back')).toBeDefined();
    expect(getByA11yLabel('Task Name')).toBeDefined();
    expect(getByA11yLabel('Task Name').props.children).toEqual('Task A');
    expect(getByA11yLabel('Selected Date')).toBeDefined();
    expect(getByA11yLabel('Delete')).toBeDefined();
    expect(spyTaskActionUpdate).toBeCalledTimes(0);
    expect(spyToastShow).toBeCalledTimes(0);

    expect(getByA11yLabel('Clear Date')).toBeDefined();
    fireEvent.press(getByA11yLabel('Clear Date'));
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(getByText('Add date')).toBeDefined();
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

  it('Update Name Successful', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');
    const taskName = 'Task A2';

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    expect(spyToastShow).toBeCalledTimes(0);
    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    fireEvent(getByA11yLabel('Task Name'), 'onBlur');
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));

    expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {
        date: '2021-04-10',
        name: 'Task A2',
        isCompleted: false,
        schedule: null,
      },
      id: 'idA',
    });
  });

  it('Update Date Successful', async () => {
    const date = formatISO(new Date(new Date().setHours(0, 0, 0, 0)), {
      representation: 'date',
    });
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');
    const spyToastShow = jest.spyOn(Toast, 'show');

    const {getByText} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: {
        ...defaultState,
        task: {
          ids: ['idA'],
          entities: {
            idA: {
              id: 'idA',
              name: 'Task A',
            },
          },
        },
      },
      initialParams: defaultParams,
    });

    expect(spyToastShow).toBeCalledTimes(0);

    fireEvent.press(getByText('Add date'));
    fireEvent.press(getByText('Confirm'));

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {date: date, name: 'Task A', isCompleted: false, schedule: null},
      id: 'idA',
    });
  });

  it('Update Failed', async () => {
    mockFirestoreUpdate.mockRejectedValue(new Error('ERROR'));
    const spyToastShow = jest.spyOn(Toast, 'show');
    const taskName = 'Task A2';

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: defaultState,
      initialParams: defaultParams,
    });

    expect(spyToastShow).toBeCalledTimes(0);
    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    fireEvent(getByA11yLabel('Task Name'), 'onBlur');
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });

  it('Mark task as not completed', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');

    const {getByText} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: {
        ...defaultState,
        task: {
          ids: ['idA'],
          entities: {
            idA: {
              id: 'idA',
              name: 'Task A',
              date: '2021-04-10',
              isCompleted: true,
            },
          },
        },
      },
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByText('Mark not completed'));
    });

    await expect(mockedGoBack).toBeCalledTimes(0);
    expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {
        date: '2021-04-10',
        name: 'Task A',
        isCompleted: false,
        schedule: null,
      },
      id: 'idA',
    });
  });

  it('Mark task completed', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');

    const {getByText} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: {
        ...defaultState,
        task: {
          ids: ['idA'],
          entities: {
            idA: {
              id: 'idA',
              name: 'Task A',
              date: '2021-04-10',
              isCompleted: false,
            },
          },
        },
      },
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByText('Mark completed'));
    });

    await expect(mockedGoBack).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {
        date: '2021-04-10',
        name: 'Task A',
        isCompleted: true,
        schedule: null,
      },
      id: 'idA',
    });
  });

  it('Update Schedule Successful', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');

    const {getByText} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: {
        ...defaultState,
        task: {
          ids: ['idA'],
          entities: {
            idA: {
              id: 'idA',
              name: 'Task A',
              date: '2021-04-10',
            },
          },
        },
      },
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByText('Repeat'));
    });

    await act(async () => {
      await fireEvent.press(getByText('Done'));
    });

    await expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {
        date: '2021-04-10',
        name: 'Task A',
        isCompleted: false,
        schedule: {frequency: 1, period: 'week'},
      },
      id: 'idA',
    });
  });

  it('Update Schedule Frequency Successful', async () => {
    mockedCanGoBack.mockReturnValue(true);
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');

    const {getByText, getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: {
        ...defaultState,
        task: {
          ids: ['idA'],
          entities: {
            idA: {
              id: 'idA',
              name: 'Task A',
              date: '2021-04-10',
              schedule: {frequency: 1, period: 'week'},
            },
          },
        },
      },
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByText('Repeats every 1 week'));
    });

    await act(async () => {
      await fireEvent(
        getByA11yLabel('Frequency Slider Input'),
        'onValueChange',
        2,
      );
    });

    await act(async () => {
      await fireEvent.press(getByText('Done'));
    });

    await expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {
        date: '2021-04-10',
        name: 'Task A',
        isCompleted: false,
        schedule: {frequency: 2, period: 'week'},
      },
      id: 'idA',
    });
  });

  it('Clear Schedule Successful', async () => {
    const spyTaskActionUpdate = jest.spyOn(TaskActions, 'update');

    const {getByA11yLabel} = renderApp({
      Component: TaskUpdateScreen.Component,
      navigationOptions: TaskUpdateScreen.options,
      preloadedState: {
        ...defaultState,
        task: {
          ids: ['idA'],
          entities: {
            idA: {
              id: 'idA',
              name: 'Task A',
              date: '2021-04-10',
              schedule: {frequency: 1, period: 'week'},
            },
          },
        },
      },
      initialParams: defaultParams,
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Clear Schedule'));
    });

    await expect(spyTaskActionUpdate).toBeCalledTimes(1);
    expect(spyTaskActionUpdate).toBeCalledWith({
      changes: {
        date: '2021-04-10',
        name: 'Task A',
        isCompleted: false,
        schedule: null,
      },
      id: 'idA',
    });
  });
});
