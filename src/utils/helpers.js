import {Alert, Linking, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

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

const showSystemAlert = ({message}) => {
  return Alert.alert('Meal Master', message);
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

export {
  checkValidYoutubeLink,
  getAppHeaders,
  getRandomColorHex,
  getYouTubeThumbnail,
  handleOpenLink,
  isEmpty,
  isURL,
  showSystemAlert,
};
