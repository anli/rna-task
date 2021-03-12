/* istanbul ignore file */
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {configureStore} from '@reduxjs/toolkit';
import {reducer, RootState} from '@store';
import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider as StoreProvider} from 'react-redux';

export const initialState: RootState = {task: {ids: [], entities: {}}};

interface Props {
  Component: () => JSX.Element;
  navigationOptions?: StackNavigationOptions;
  preloadedState?: RootState;
}

const renderApp = ({
  Component,
  navigationOptions = {},
  preloadedState = initialState,
}: Props) => {
  const store = configureStore({
    preloadedState,
    reducer,
  });
  const Stack = createStackNavigator();
  const App = () => (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Component}
            options={navigationOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
  return render(<App />);
};

export default renderApp;
