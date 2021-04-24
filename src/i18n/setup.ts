import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import configs from './configs';
import getLanguageTag from './get-language-tag';

const apiKey = '7eWVEh_M6HAdD1y3qGy8pQ';
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

const setup = async () => {
  await i18next
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: getLanguageTag(),
      fallbackLng: configs.fallbackLng,

      ns: ['default'],
      defaultNS: 'default',

      supportedLngs: configs.supportedLngs,

      backend: {
        loadPath: loadPath,
      },
    });
};

export default setup;
