import {DefaultTheme} from '@react-navigation/native';
import {Dimensions, Platform} from 'react-native';
import {APP_COLORS} from '../themes/colors';

const {height, width} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const PLATFORM = Platform.OS;
const IS_IOS = PLATFORM === 'ios';
const IS_ANDROID = PLATFORM === 'android';
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en', 'vi'];
const LANGUAGE_KEY = '@language';

const APP_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: APP_COLORS.primary,
    background: APP_COLORS.white,
    card: APP_COLORS.white,
  },
};

export {
  APP_THEME,
  DEFAULT_LANGUAGE,
  IS_ANDROID,
  IS_IOS,
  LANGUAGE_KEY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SUPPORTED_LANGUAGES,
};
