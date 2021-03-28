import {useAuthentication} from '@authentication';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  TaskAddScreen,
  TaskUpdateScreen,
} from '@screens';
import store from '@store';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Provider as StoreProvider} from 'react-redux';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  const {isLoading, isAuthenticated} = useAuthentication();

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Navigator isLoading={isLoading} isAuthenticated={isAuthenticated} />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;

const Navigator = ({
  isLoading,
  isAuthenticated,
}: {
  isLoading: boolean;
  isAuthenticated: boolean;
}) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <AuthenticatedScreens />;
  }

  return <GuestScreens />;
};

const AuthenticatedScreens = () => {
  return (
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
  );
};

const GuestScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen.Component}
        options={LoginScreen.options}
      />
    </Stack.Navigator>
  );
};
