import {useEffect} from 'react';
import {Alert, BackHandler, Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';

const useVersionCheck = () => {
  useEffect(() => {
    const init = async () => {
      checkUpdateNeeded();
    };

    init().finally(async () => {});
  }, []);

  return;
};

export default useVersionCheck;

const checkUpdateNeeded = async () => {
  try {
    let updateNeeded = await VersionCheck.needUpdate({depth: 1});
    /* istanbul ignore next */
    if (updateNeeded.isNeeded) {
      Alert.alert(
        'Please update',
        'You will have to update your app to the latest version to continue using.',
        [
          {
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
        {cancelable: false},
      );
    }
  } catch {}
};
