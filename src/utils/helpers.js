import i18next from 'i18next';
import {ActionSheetIOS, Alert, Linking, Platform} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import DialogAndroid from 'react-native-dialogs/DialogAndroid';
import {EMPTY_STRING, IS_IOS} from './constants';

const isEmpty = val => val == null || !(Object.keys(val) || val).length;

const getAppHeaders = async () => {
  return {
    'x-os': Platform.OS,
    'x-version': `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`,
    'x-bundle-id': DeviceInfo.getBundleId(),
    'x-device-id': await DeviceInfo.getUniqueId(),
    'time-zone': new Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Content-Type': 'application/json',
  };
};

const getRandomColorHex = () => {
  const letters = '0123456789ABCDEF';
  const randomChars = Array.from(
    {length: 6},
    () => letters[Math.floor(Math.random() * letters.length)],
  );
  const color = '#' + randomChars.join('');

  return color;
};

const showSystemAlert = ({
  title,
  message = i18next.t('error.somethingWrongMsg'),
  actions = [
    {
      text: i18next.t('button.ok'),
      onPress: () => {},
    },
  ],
}) => {
  return Alert.alert(title || Config.APP_NAME, message, actions);
};

const checkValidYoutubeLink = videoUrl => {
  if (!videoUrl) {
    return false;
  }
  return videoUrl?.includes('youtube') || videoUrl?.includes('youtu.be');
};

const parseYoutubeId = url => {
  try {
    if (!isEmpty(url) && typeof url === 'string') {
      const parse_id = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      const videoId =
        parse_id[2] !== undefined
          ? parse_id[2].split(/[^0-9a-z_\\-]/i)[0]
          : parse_id[0];
      return videoId || null;
    }
    return null;
  } catch (_error) {
    return null;
  }
};

const getYouTubeThumbnail = youtubeUrl => {
  const videoId = parseYoutubeId(youtubeUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  return thumbnailUrl;
};

const handleOpenLink = async passProps => {
  try {
    const {link} = passProps;

    link && (await Linking.openURL(link));
  } catch (_error) {
    // Do nothing if error!
  }
};

const isURL = str => {
  // Regular expression to match a URL
  var urlPattern = /^(http:\/\/|https:\/\/)/;

  // Test the string against the pattern
  return urlPattern.test(str);
};

//PICK DOCUMENT start

const showMenuOptions = ({
  data,
  onSelectItem,
  labelKey = 'label',
  idKey = 'id',
  useTranslate = false,
}) => {
  const {title, items, selectedId, cancelLabel} = data;
  if (IS_IOS) {
    const cancelLabelIOS = cancelLabel || i18next.t('buttons.cancel');

    const labels = items?.map(e =>
      useTranslate ? i18next.t(e[labelKey]) : e[labelKey],
    );

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title,
        options: [...labels, cancelLabelIOS],
        destructiveButtonIndex: -1,
        cancelButtonIndex: items.length,
      },
      index => {
        if (index === items.length) {
          return;
        }
        onSelectItem(index, items[index]);
      },
    );
  } else {
    DialogAndroid.showPicker(title, null, {
      items: useTranslate
        ? items?.map(item => {
            return {...item, [labelKey]: i18next.t(item[labelKey])};
          })
        : items,
      type: DialogAndroid.listRadio,
      selectedId: selectedId,
      labelKey,
      idKey,
      negativeText: 'Cancel',
      positiveText: 'Ok',
    }).then(result => {
      const {action, selectedItem} = result;
      if (action === 'actionSelect') {
        const index = items.findIndex(e => e[idKey] === selectedItem[idKey]);
        if (index >= 0) {
          onSelectItem(index);
        }
      }
    });
  }
};

const roundByteToMB = bytes => {
  return Math.round((bytes / 1000000 + Number.EPSILON) * 100) / 100;
};

const getMaxSize = imagePayload => {
  const isVideo =
    imagePayload?.mime?.startsWith('video') ||
    imagePayload?.type?.startsWith('video');
  const isImage = imagePayload?.mime?.startsWith('image');

  if (isVideo) {
    return {
      maxSize: 25,
      errorMessage: 'picker.invalidVideoType',
    };
  }
  if (isImage) {
    return {
      maxSize: 15,
      errorMessage: 'picker.invalidImageSize',
    };
  }
  return {
    maxSize: 10,
    errorMessage: 'picker.invalidFile',
  };
};
//PICK DOCUMENT end

const valueAsDefault = (value, defaultValue = EMPTY_STRING) => {
  return isEmpty(value) ? defaultValue : value;
};

export {
  checkValidYoutubeLink,
  getAppHeaders,
  getMaxSize,
  getRandomColorHex,
  getYouTubeThumbnail,
  handleOpenLink,
  isEmpty,
  isURL,
  roundByteToMB,
  showMenuOptions,
  showSystemAlert,
  valueAsDefault,
};
