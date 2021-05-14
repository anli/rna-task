import {useAuthentication} from '@authentication';
import {Toast} from '@components';
import * as eva from '@eva-design/eva';
import {useI18n} from '@i18n';
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
import store, {persistor, useAppDispatch, useAppSelector} from '@store';
import {defaultTheme} from '@themes';
import {ApplicationProvider} from '@ui-kitten/components';
import {getBottomTabOptions, useVersionCheck} from '@utils';
import {VersionActions, VersionSelectors} from '@version';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

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
  const {ready} = useTranslation(undefined, {useSuspense: false});
  useVersionCheck();
  useI18n();

  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <PaperProvider theme={paperTheme}>
            <StatusBar
              animated={true}
              backgroundColor={paperTheme.colors.background}
              barStyle="dark-content"
            />
            <NavigationContainer theme={navigationTheme}>
              <Navigator
                isLoading={isLoading || !ready}
                isAuthenticated={isAuthenticated}
              />
              <Toast />
            </NavigationContainer>
          </PaperProvider>
        </ApplicationProvider>
      </PersistGate>
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

/* istanbul ignore next */
const PlaceholderComponent = () => <View />;

const TabScreens = () => {
  const hasUpdate = useAppSelector(VersionSelectors.hasUpdate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(VersionActions.checkUpdate());
  }, [dispatch]);

  const settingOptions = {
    ...SettingScreen.options,
    tabBarBadge: hasUpdate ? '' : undefined,
  };

  return (
    <Tab.Navigator tabBarOptions={{showLabel: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen.Component}
        options={HomeScreen.options}
      />
      <Tab.Screen
        name="Create"
        component={PlaceholderComponent}
        options={getBottomTabOptions('plus-box-outline', 'Add Task')}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('TaskAddScreen');
          },
        })}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen.Component}
        options={settingOptions}
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
