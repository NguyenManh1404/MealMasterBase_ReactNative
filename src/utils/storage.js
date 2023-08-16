import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = Object.freeze({
  TOKEN: '@token', // done
  LANGUAGE_KEY: '@language',
  APP_MODE: '@app_mode',
});

const storeData = async ({key, value}) => {
  try {
    const storedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, storedValue);
  } catch (e) {}
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {}
};

const getString = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {}
};

const removeData = async key => {
  try {
    if (key !== null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.clear();
    }
  } catch (e) {}
};

const removeMultikey = async (keys = []) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {}
};

const getMultikey = async (keys = []) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (e) {}
};

export {
  STORAGE_KEYS,
  getData,
  getMultikey,
  getString,
  removeData,
  removeMultikey,
  storeData,
};
