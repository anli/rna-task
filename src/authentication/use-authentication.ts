import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import R from 'ramda';
import {useEffect, useState} from 'react';

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const onAuthStateChanged = (authState: any) => {
      setUser(authState);
      if (isLoading) {
        setIsLoading(false);
      }
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [isLoading]);

  return {
    user,
    isLoading,
    isAuthenticated: !R.isNil(user),
  };
};

export default useAuthentication;
