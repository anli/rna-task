import {mockFirestoreUpdate} from '@mocks';
import {TaskActions} from '@task';
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
    expect(getByText('All Tasks')).toBeDefined();
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

    await waitFor(() => expect(getByText('What I can do')).toBeDefined());
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

    await waitFor(() =>
      expect(getByText('What I want to do Today')).toBeDefined(),
    );
  });

  it('Filter tasks by What I did Previously', async () => {
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

    await waitFor(() =>
      expect(getByText('What I did Previously')).toBeDefined(),
    );
  });

  it('Mark task as completed', async () => {
    const spyToastShow = jest.spyOn(Toast, 'show');
    const {getAllByA11yHint} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    const spy = jest.spyOn(TaskActions, 'update');

    fireEvent.press(getAllByA11yHint('Mark completed')[0]);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({changes: {isCompleted: true}, id: 'idA'});
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
    const spy = jest.spyOn(TaskActions, 'update');

    fireEvent.press(getByTestId('CompletedTaskListAccordion'));
    fireEvent.press(getAllByA11yHint('Mark not completed')[0]);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({
      changes: {isCompleted: false},
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
});
