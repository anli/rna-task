import styled from '@emotion/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import Toast from 'react-native-toast-message';

const Component = (): JSX.Element => {
  const onLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth?.GoogleAuthProvider?.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch ({message}) {
      Toast.show({
        type: 'error',
        text2: message,
      });
    }
  };

  return (
    <Screen>
      <GoogleSigninButton onPress={onLogin} accessibilityLabel="Google Login" />
    </Screen>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default class LoginScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
