import axios from 'axios';
import Config from 'react-native-config';

const UPLOAD_ENDPOINTS = Object.freeze({
  IMAGE: '/image',
});

const uploadFileApi = async data => {
  const response = await axios.put(`${Config.BASE_URL_API}/image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export {UPLOAD_ENDPOINTS, uploadFileApi};
