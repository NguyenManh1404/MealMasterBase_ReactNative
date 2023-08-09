import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const PLATFORM = Platform.OS;
const IS_IOS = PLATFORM === 'ios';
const IS_ANDROID = PLATFORM === 'android';
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en', 'vi'];

export {
  DEFAULT_LANGUAGE,
  IS_ANDROID,
  IS_IOS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SUPPORTED_LANGUAGES,
};
