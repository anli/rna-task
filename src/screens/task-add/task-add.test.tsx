import {mockFirestoreAdd} from '@mocks';
import {TaskActions} from '@task';
import {renderApp} from '@test';
import {
  act,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {formatISO} from 'date-fns';
import {format, parseISO} from 'date-fns/fp';
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

const date = formatISO(new Date(new Date().setHours(0, 0, 0, 0)), {
  representation: 'date',
});
const dateChipText = format('EEE, d MMM')(parseISO(date));

describe('Task Add Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('See UI', () => {
    const {getByA11yLabel} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    expect(getByA11yLabel('Back')).toBeDefined();
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
    const spyTaskActionCreate = jest.spyOn(TaskActions, 'create');
    const taskName = 'Task A';

    const {getByA11yLabel, getByText} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    expect(getByA11yLabel('Process Text Indicator')).toBeDefined();

    await waitForElementToBeRemoved(() =>
      getByA11yLabel('Process Text Indicator'),
    );

    act(() => {
      fireEvent.press(getByText(dateChipText));
    });

    act(() => {
      fireEvent.press(getByText('Cancel'));
    });

    act(() => {
      fireEvent.press(getByText(dateChipText));
    });

    act(() => {
      fireEvent.press(getByText('Confirm'));
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Save'));
    });

    await expect(mockedGoBack).toBeCalledTimes(1);
    expect(spyTaskActionCreate).toBeCalledTimes(1);
    expect(spyTaskActionCreate).toBeCalledWith({
      name: taskName,
      date,
    });
  });

  it('Add Task Validation Failed', async () => {
    mockFirestoreAdd.mockRejectedValue(new Error('ERROR'));
    mockedCanGoBack.mockReturnValue(true);

    const {getByA11yLabel, getByText} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Save'));
    });

    expect(getByText('This is required.')).toBeDefined();
  });

  it('Add Task API Failed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    mockFirestoreAdd.mockRejectedValue(new Error('ERROR'));
    mockedCanGoBack.mockReturnValue(true);

    const {getByA11yLabel, getByText} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    const taskName = 'Task A';

    act(() => {
      fireEvent.changeText(getByA11yLabel('Task Name'), taskName);
    });

    expect(getByA11yLabel('Process Text Indicator')).toBeDefined();

    await waitForElementToBeRemoved(() =>
      getByA11yLabel('Process Text Indicator'),
    );

    act(() => {
      fireEvent.press(getByText(dateChipText));
    });

    act(() => {
      fireEvent.press(getByText('Cancel'));
    });

    act(() => {
      fireEvent.press(getByText(dateChipText));
    });

    act(() => {
      fireEvent.press(getByText('Confirm'));
    });

    await act(async () => {
      await fireEvent.press(getByA11yLabel('Save'));
    });

    await expect(mockedGoBack).toBeCalledTimes(0);
    expect(spyToastShow).toBeCalledTimes(1);
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });

  it('Process task description successfully', async () => {
    const taskName = 'Task A Today';

    const {getByA11yLabel, getByText} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    fireEvent.changeText(getByA11yLabel('Task Name'), taskName);

    expect(getByA11yLabel('Process Text Indicator')).toBeDefined();

    await waitForElementToBeRemoved(() =>
      getByA11yLabel('Process Text Indicator'),
    );

    expect(getByText(dateChipText)).toBeDefined();
  });

  it('Press Clear Text Button', async () => {
    const taskName = 'Task A';

    const {getByA11yLabel} = renderApp({
      Component: TaskAddScreen.Component,
      navigationOptions: TaskAddScreen.options,
    });

    fireEvent.changeText(getByA11yLabel('Task Name'), taskName);

    expect(getByA11yLabel('Process Text Indicator')).toBeDefined();

    await waitForElementToBeRemoved(() =>
      getByA11yLabel('Process Text Indicator'),
    );

    expect(getByA11yLabel('Clear Text Button')).toBeDefined();

    await act(async () => {
      fireEvent.press(getByA11yLabel('Clear Text Button'));
    });

    expect(getByA11yLabel('Task Name').props.children).toEqual('');
  });
});
