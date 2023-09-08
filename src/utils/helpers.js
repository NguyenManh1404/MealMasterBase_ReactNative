import {Alert, Platform} from 'react-native';
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

export {getAppHeaders, getRandomColorHex, isEmpty, showSystemAlert};
