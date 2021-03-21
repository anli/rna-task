import styled from '@emotion/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';

GoogleSignin.configure({
  webClientId: '800010873210-s6t6soj3pk6nbvhd4vdgagdf1jt3ejv1',
});

const Component = (): JSX.Element => {
  const onLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log({error});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  return (
    <Screen>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={onLogin}
      />
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
