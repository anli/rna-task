import {TaskActions} from '@task';
import {renderApp} from '@test';
import {fireEvent, waitFor} from '@testing-library/react-native';
import BottomSheet from 'react-native-bottomsheet';
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

  it('Filter tasks by What I did Yesterday', async () => {
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
      expect(getByText('What I did Yesterday')).toBeDefined(),
    );
  });

  it('Mark task as done', async () => {
    const {getAllByA11yHint} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });
    const spy = jest.spyOn(TaskActions, 'update');

    fireEvent.press(getAllByA11yHint('Mark completed')[0]);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({changes: {isCompleted: true}, id: 'idA'});
  });

  it('See completed tasks', async () => {
    const {getByText, getByTestId} = renderApp({
      Component: HomeScreen.Component,
      navigationOptions: HomeScreen.options,
    });

    fireEvent.press(getByTestId('CompletedTaskListAccordion'));

    expect(getByText('Completed Task')).toBeDefined();
  });
});
