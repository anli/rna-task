import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const DELAY_LOADING = 3000;

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (authState: any) => {
    setUser(authState);
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, DELAY_LOADING);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  return {
    user,
    isLoading,
  };
};

export default useAuthentication;
