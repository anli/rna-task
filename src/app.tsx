import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '@screens';
import store from '@store';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import TaskAddScreen from './screens/task-add/task-add';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
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
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
