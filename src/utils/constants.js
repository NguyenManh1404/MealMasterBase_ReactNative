import {DefaultTheme} from '@react-navigation/native';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {APP_COLORS} from '../themes/colors';
import {FONT_SIZES} from '../themes/fonts';

const {height, width} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const PLATFORM = Platform.OS;
const IS_IOS = PLATFORM === 'ios';
const IS_ANDROID = PLATFORM === 'android';
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en', 'vi'];
const LANGUAGE_KEY = '@language';
const API_TIMEOUT = 30000;

const APP_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: APP_COLORS.primary,
    background: APP_COLORS.white,
    card: APP_COLORS.white,
  },
};

const BUTTON_VARIANTS = Object.freeze({
  FILL: 'fill',
  OUTLINE: 'outline',
});
const FALLBACK_FONT = 'regular';
const DEFAULT_FONT_SIZE = FONT_SIZES.medium;
const INPUT_ICON_SIZE = 20;
const EMPTY_STRING = '';
const HIT_SLOP = {top: 10, right: 10, bottom: 10, left: 10};
const HAS_DYNAMIC_ISLAND = DeviceInfo.hasDynamicIsland();
const HAS_NOTCH = DeviceInfo.hasNotch();
const HAS_SAFE_VIEW_INSET_TOP = HAS_DYNAMIC_ISLAND || HAS_NOTCH;
export {
  API_TIMEOUT,
  APP_THEME,
  BUTTON_VARIANTS,
  DEFAULT_FONT_SIZE,
  DEFAULT_LANGUAGE,
  EMPTY_STRING,
  FALLBACK_FONT,
  HAS_SAFE_VIEW_INSET_TOP,
  HIT_SLOP,
  INPUT_ICON_SIZE,
  IS_ANDROID,
  IS_IOS,
  LANGUAGE_KEY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SUPPORTED_LANGUAGES,
};
