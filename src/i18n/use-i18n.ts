import i18next from 'i18next';
import {useEffect} from 'react';
import * as RNLocalize from 'react-native-localize';
import getLanguageTag from './get-language-tag';

const useI18n = () => {
  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);
};

export default useI18n;

const handleLocalizationChange = () => {
  i18next.changeLanguage(getLanguageTag());
};
