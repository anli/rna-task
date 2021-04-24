/* istanbul ignore file */

import * as RNLocalize from 'react-native-localize';
import configs, {LanguageTag} from './configs';

const getLanguageTag = (): LanguageTag => {
  const localizeOptions = RNLocalize.findBestAvailableLanguage(
    configs.supportedLngs,
  );
  return (localizeOptions?.languageTag || configs.fallbackLng) as LanguageTag;
};

export default getLanguageTag;
