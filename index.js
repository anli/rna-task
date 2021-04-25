import {setup} from '@i18n';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {name as appName} from './app.json';
import {App} from './src';

if (!__DEV__) {
  Sentry.init({
    dsn:
      'https://1aa238932ec842fa9c746e248eed3fea@o506338.ingest.sentry.io/5734778',
  });
}

GoogleSignin.configure({
  webClientId: '800010873210-s6t6soj3pk6nbvhd4vdgagdf1jt3ejv1',
});

setup();

AppRegistry.registerComponent(appName, () => App);
