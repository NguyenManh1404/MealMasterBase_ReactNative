import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules} from 'react-native';
import locales from '../locales'; // path to your locales folder
import {DEFAULT_LANGUAGE, IS_IOS} from '../utils/constants';

const LANGUAGE_KEY = '@language';
const SUPPORTED_LANGUAGES = ['en', 'vi'];

const getDeviceLanguage = () => {
  const appLanguage = IS_IOS
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

  return appLanguage.search(/-|_/g) !== -1
    ? appLanguage.slice(0, 2)
    : appLanguage;
};

export const getSupportedLanguage = () => {
  const deviceLanguage = getDeviceLanguage();
  if (SUPPORTED_LANGUAGES.includes(deviceLanguage)) {
    return deviceLanguage;
  }
  return DEFAULT_LANGUAGE;
};

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      const currentLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (currentLanguage) {
        return callback(currentLanguage);
      } else {
        return callback(getSupportedLanguage());
      }
    } catch (error) {}
  },
  cacheUserLanguage: async function (language) {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {}
  },
};

export const initI18n = () => {
  i18n
    .use(languageDetectorPlugin)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: DEFAULT_LANGUAGE,
      debug: false,
      resources: locales,
      interpolation: {
        escapeValue: false,
      },
      react: {useSuspense: false},
    });
};
