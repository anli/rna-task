import styled from '@emotion/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-paper';

const LoadingScreen = (): JSX.Element => {
  const {colors} = useTheme();

  return (
    <Screen>
      <ActivityIndicator size="large" color={colors.primary} />
    </Screen>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default LoadingScreen;

const Screen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;
