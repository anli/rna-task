import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const switchAccount = async () => {
  await GoogleSignin.signOut().catch();
  await GoogleSignin.hasPlayServices();
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider?.credential(idToken);
  await auth().signInWithCredential(googleCredential);
  return true;
};

export default switchAccount;
