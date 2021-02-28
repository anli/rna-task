import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const Component = (): JSX.Element => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default class HomeScreen {
  static Component = Component;
  static options = options;
}
