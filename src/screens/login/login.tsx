import styled from '@emotion/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {StackNavigationOptions} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Component = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {colors} = useTheme();
  const onLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider?.credential(idToken);
      setIsLoading(true);
      await auth().signInWithCredential(googleCredential);
      setIsLoading(false);
      return;
    } catch ({message}) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text2: message,
      });
    }
  };

  return (
    <Screen>
      {!isLoading && (
        <GoogleSigninButton
          onPress={onLogin}
          accessibilityLabel="Google Login"
        />
      )}
      {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
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

const ActivityIndicator = styled.ActivityIndicator``;
