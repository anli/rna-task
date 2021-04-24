import * as RNLocalize from 'react-native-localize';
import configs from './configs';

const getLanguageTag = () => {
  const localizeOptions = RNLocalize.findBestAvailableLanguage(
    configs.supportedLngs,
  );
  return localizeOptions?.languageTag || configs.fallbackLng;
};

export default getLanguageTag;
