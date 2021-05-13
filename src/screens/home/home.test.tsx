import {mockFirestoreUpdate} from '@mocks';
import {TaskActions} from '@task';
import {renderApp} from '@test';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import BottomSheet from 'react-native-bottomsheet';
import Toast from 'react-native-toast-message';
import HomeScreen from './home';

const UNSELECTED_TAB_FONT_COLOR = '#8F9BB3';
const SELECTED_TAB_FONT_COLOR = '#3366FF';

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
    mockFirestoreUpdate.mockResolvedValue(true);
  });

  it('See Home Screen', () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    expect(getByText('Task A')).toBeDefined();
    expect(getByText('Task B')).toBeDefined();
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
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    expect(getByText('Can do').props.style.reverse()[0].color).toEqual(
      UNSELECTED_TAB_FONT_COLOR,
    );
    expect(getByText('Can do')).toBeDefined();

    fireEvent.press(getByText('Can do'));
    expect(getByText('Can do').props.style.reverse()[0].color).toEqual(
      SELECTED_TAB_FONT_COLOR,
    );
  });

  it('Filter tasks by What I want to do Today', async () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    expect(getByText('Today').props.style.reverse()[0].color).toEqual(
      UNSELECTED_TAB_FONT_COLOR,
    );
    expect(getByText('Today')).toBeDefined();

    fireEvent.press(getByText('Today'));
    expect(getByText('Today').props.style.reverse()[0].color).toEqual(
      SELECTED_TAB_FONT_COLOR,
    );
  });

  it('Filter tasks by What I did Previously', async () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    expect(getByText('Previously').props.style.reverse()[0].color).toEqual(
      UNSELECTED_TAB_FONT_COLOR,
    );
    expect(getByText('Previously')).toBeDefined();

    fireEvent.press(getByText('Previously'));
    expect(getByText('Previously').props.style.reverse()[0].color).toEqual(
      SELECTED_TAB_FONT_COLOR,
    );
  });

  it('Mark task as completed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    const {getAllByA11yHint} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    const spy = jest.spyOn(TaskActions, 'complete');

    fireEvent.press(getAllByA11yHint('Mark completed')[0]);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({
      changes: {
        id: 'idA',
        date: '2021-04-10',
        name: 'Task A',
        isCompleted: true,
      },
      id: 'idA',
    });
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledWith({
      position: 'bottom',
      text2: 'Marked completed successfully',
      type: 'success',
    });
  });

  it('Mark task as not completed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    const {getByTestId, getAllByA11yHint} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    const spy = jest.spyOn(TaskActions, 'complete');

    fireEvent.press(getByTestId('CompletedTaskListAccordion'));
    fireEvent.press(getAllByA11yHint('Mark not completed')[0]);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({
      changes: {
        isCompleted: false,
        date: '2021-04-09',
        id: 'CompletedTaskId',
        name: 'Completed Task',
      },
      id: 'CompletedTaskId',
    });
    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledWith({
      position: 'bottom',
      text2: 'Marked not completed successfully',
      type: 'success',
    });
  });

  it('Mark task as done failed', async () => {
    mockFirestoreUpdate.mockRejectedValue(new Error('ERROR'));
    const spyToastShow = jest.spyOn(Toast, 'show');
    const {getAllByA11yHint} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getAllByA11yHint('Mark completed')[0]);

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledWith({text2: 'ERROR', type: 'error'});
  });

  it('See completed tasks', async () => {
    const {getByText, getByTestId} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByTestId('CompletedTaskListAccordion'));

    expect(getByText('Completed Task')).toBeDefined();
  });

  it('See schedule tasks', () => {
    const {getByText} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    expect(getByText('Scheduled Task')).toBeDefined();
  });

  it('Mark task as done validation failed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    const {getAllByA11yHint} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getAllByA11yHint('Mark completed')[3]);

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledWith({
      position: 'bottom',
      text2: 'Please enter a date first.',
      type: 'error',
    });
  });

  it('Delete obsolete tasks', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    jest
      .spyOn(BottomSheet, 'showBottomSheetWithOptions')
      .mockImplementation((_, callback) => {
        callback && callback(0);
      });
    jest
      .spyOn(Alert, 'alert')
      .mockImplementation((_title, _description, buttons) => {
        const onPress = buttons?.[1]?.onPress;
        onPress && onPress();
      });

    const {getByA11yLabel} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByA11yLabel('More'));

    await waitFor(() => expect(spyToastShow).toBeCalledTimes(1));
    expect(spyToastShow).toBeCalledWith({
      position: 'bottom',
      text2: 'Deleted obsolete tasks successfully',
      type: 'success',
    });
  });
});
