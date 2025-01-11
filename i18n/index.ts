import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationEn from './locales/en-US/translation.json';
import translationTr from './locales/tr-TR/translation.json';

const resources = {
  'tr-TR': { translation: translationTr },
  'en-US': { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: savedLanguage,
    fallbackLng: 'tr-TR',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
