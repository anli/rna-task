import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {name as appName} from './app.json';
import {App} from './src';

GoogleSignin.configure({
  webClientId: '800010873210-s6t6soj3pk6nbvhd4vdgagdf1jt3ejv1',
});

AppRegistry.registerComponent(appName, () => App);
