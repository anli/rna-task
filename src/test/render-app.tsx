/* istanbul ignore file */
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {configureStore} from '@reduxjs/toolkit';
import {reducer, RootState} from '@store';
import {render} from '@testing-library/react-native';
import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

export const initialState: RootState = {task: {ids: [], entities: {}}};

interface Props {
  Component: () => JSX.Element;
  navigationOptions?: StackNavigationOptions;
  preloadedState?: RootState;
  initialParams?: any;
}

const renderApp = ({
  Component,
  navigationOptions = {},
  preloadedState = initialState,
  initialParams = {},
}: Props) => {
  const store = configureStore({
    preloadedState,
    reducer,
  });
  const Stack = createStackNavigator();
  const App = () => (
    <StoreProvider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Component}
                options={navigationOptions}
                initialParams={initialParams}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ApplicationProvider>
    </StoreProvider>
  );
  return {...render(<App />), store};
};

export default renderApp;
