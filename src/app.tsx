import {useAuthentication} from '@authentication';
import {Toast} from '@components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  SettingScreen,
  TaskAddScreen,
  TaskUpdateScreen,
} from '@screens';
import store from '@store';
import {defaultTheme} from '@themes';
import React from 'react';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...defaultTheme.colors,
  },
};

const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...defaultTheme.colors,
  },
};

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  const {isLoading, isAuthenticated} = useAuthentication();

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Navigator isLoading={isLoading} isAuthenticated={isAuthenticated} />
          <Toast />
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

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator tabBarOptions={{showLabel: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen.Component}
        options={HomeScreen.options}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen.Component}
        options={SettingScreen.options}
      />
    </Tab.Navigator>
  );
};

const AuthenticatedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabScreens"
        component={TabScreens}
        options={{headerShown: false}}
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
