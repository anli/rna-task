import {Locale} from 'date-fns';
import en from 'date-fns/locale/en-US';
import zh from 'date-fns/locale/zh-CN';
import getLanguageTag from './get-language-tag';

const locales = {en, zh};

const getLocale = (): Locale => {
  const languageCode = getLanguageTag();
  const locale = locales[languageCode];

  return locale;
};

const dateLocale = getLocale();

export default dateLocale;
