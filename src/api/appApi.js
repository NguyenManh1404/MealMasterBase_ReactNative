import axios from 'axios';
import Config from 'react-native-config';
import {API_TIMEOUT} from '../utils/constants';
import {getAppHeaders, showSystemAlert} from '../utils/helpers';
import {STORAGE_KEYS, getString} from '../utils/storage';

const appApi = axios.create({
  baseURL: Config.BASE_URL_API,
  timeout: API_TIMEOUT,
});
// eslint-disable-next-line no-console
console.log(
  '🚀 ~ file: appApi.js:9 ~ Config.BASE_URL_API:',
  Config.BASE_URL_API,
);

// axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

appApi.interceptors.request.use(async config => {
  const token = await getString(STORAGE_KEYS.TOKEN);
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: appApi.js:20 ~ token:', token);
  // const token = useSelector(state => state.auth.token);

  const defaultHeaders = await getAppHeaders();
  config.headers = {
    ...defaultHeaders,
  };

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

appApi.interceptors.response.use(
  response => {
    return response?.data || response;
  },
  async error => {
    const {
      // eslint-disable-next-line no-unused-vars
      config,
      response: {status},
    } = error;

    showSystemAlert({
      message: JSON.stringify(error?.message + status),
    });

    return Promise.reject(error.response?.data);
  },
);

export const commonQueryDetailFunction = async ({queryKey = []}) => {
  const {url, params = {}} = queryKey[0];
  if (!url) {
    return null;
  }

  return appApi.get(url, {params});
};

export default appApi;
