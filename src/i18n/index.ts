import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import homeEN from './locales/home/en.json';
import homeDE from './locales/home/de.json';
import commonEN from './locales/common/en.json';
import commonDE from './locales/common/de.json';
import footerEN from './locales/footer/en.json';
import footerDE from './locales/footer/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        home: homeEN,
        footer: footerEN,
      },
      de: {
        common: commonDE,
        home: homeDE,
        footer: footerDE,
      },
    },

    fallbackLng: 'en',
    debug: false,

    ns: ['common', 'home', 'footer'],
    defaultNS: 'common',

    keySeparator: '.',

    interpolation: {
      escapeValue: true,
    },
  });

export default i18n;
