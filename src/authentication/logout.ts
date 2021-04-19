import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const logout = async () => {
  await GoogleSignin.revokeAccess().catch();
  await GoogleSignin.signOut().catch();
  return await auth().signOut();
};

export default logout;
