import {DefaultTheme} from '@react-navigation/native';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker from 'react-native-document-picker';
import {PERMISSIONS} from 'react-native-permissions';
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
const FALLBACK_FONT = 'normal';
const DEFAULT_FONT_SIZE = FONT_SIZES.medium;
const INPUT_ICON_SIZE = 20;
const EMPTY_STRING = '';
const HIT_SLOP = {top: 10, right: 10, bottom: 10, left: 10};
const HAS_DYNAMIC_ISLAND = DeviceInfo.hasDynamicIsland();
const HAS_NOTCH = DeviceInfo.hasNotch();
const HAS_SAFE_VIEW_INSET_TOP = HAS_DYNAMIC_ISLAND || HAS_NOTCH;

//pick image

const CAMERA_PERMISSION_STRING = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});

const PHOTO_PERMISSION_STRING = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
});

const PICKER_METHOD = {
  CAMERA: 'camera',
  PHOTO: 'photo',
  VIDEO: [DocumentPicker.types.video],
  DOCUMENT: [
    DocumentPicker.types.pdf,
    DocumentPicker.types.docx,
    DocumentPicker.types.pptx,
    DocumentPicker.types.doc,
    DocumentPicker.types.ppt,
  ],
};

const DEFAULT_PICKER_OPTION = {
  forceJpg: true,
  cropping: false,
  compressImageQuality: Platform.select({
    ios: 0.8,
    android: 1,
  }),
};

//pick image

const CATEGORY = [
  {id: 1, label: 'Breakfast', value: 'Breakfast'},
  {id: 2, label: 'Lunch', value: 'Lunch'},
  {id: 3, label: 'Diner', value: 'Diner'},
  {id: 4, label: 'Diet', value: 'Diet'},
];

const PHONE_VALID =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export {
  API_TIMEOUT,
  APP_THEME,
  BUTTON_VARIANTS,
  CAMERA_PERMISSION_STRING,
  CATEGORY,
  DEFAULT_FONT_SIZE,
  DEFAULT_LANGUAGE,
  DEFAULT_PICKER_OPTION,
  EMPTY_STRING,
  FALLBACK_FONT,
  HAS_SAFE_VIEW_INSET_TOP,
  HIT_SLOP,
  INPUT_ICON_SIZE,
  IS_ANDROID,
  IS_IOS,
  LANGUAGE_KEY,
  PHONE_VALID,
  PHOTO_PERMISSION_STRING,
  PICKER_METHOD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SUPPORTED_LANGUAGES,
};
