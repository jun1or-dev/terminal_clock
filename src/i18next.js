import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import { useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


console.log('Backend =', Backend);
console.log('LanguageDetector =', LanguageDetector);
console.log('initReactI18Next =', initReactI18next);

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
    lng: 'zh-tw',
    fallbackLng: 'en',
    debug: true,

    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

  export default i18n;