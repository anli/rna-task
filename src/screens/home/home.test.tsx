import {initialState, renderApp} from '@test';
import HomeScreen from './home';

describe('Home Screen', () => {
  it(`Scenario: See Home Screen
      Given that I have a task 'Task A'
      And that I have a task 'Task B'
      When I am at Home Screen
      Then I should see 'Tasks'
      And I should see 'Task A'
      And I should see 'Task B'`, () => {
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
});
