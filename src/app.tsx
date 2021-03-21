import {useAuthentication} from '@authentication';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoadingScreen,
  TaskAddScreen,
  TaskUpdateScreen,
} from '@screens';
import store from '@store';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  const auth = useAuthentication();
  console.log({auth});

  const isLoading = auth.isLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen.Component}
              options={HomeScreen.options}
            />
            <Stack.Screen
              name="TaskAddScreen"
              component={TaskAddScreen.Component}
              options={TaskAddScreen.options}
            />
            <Stack.Screen
              name="TaskUpdateScreen"
              component={TaskUpdateScreen.Component}
              options={TaskUpdateScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
