import i18next from 'i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {RESULTS, openSettings, request} from 'react-native-permissions';
import {uploadFileApi} from '../api/upload';
import {
  CAMERA_PERMISSION_STRING,
  DEFAULT_PICKER_OPTION,
  PHOTO_PERMISSION_STRING,
  PICKER_METHOD,
} from '../utils/constants';
import {
  getMaxSize,
  roundByteToMB,
  showMenuOptions,
  showSystemAlert,
} from '../utils/helpers';

const requestPermission = async (error, method) => {
  try {
    const response = await request(
      method === PICKER_METHOD.CAMERA
        ? CAMERA_PERMISSION_STRING
        : PHOTO_PERMISSION_STRING,
    );
    if (
      [RESULTS.BLOCKED, RESULTS.UNAVAILABLE, RESULTS.DENIED].includes(response)
    ) {
      return showSystemAlert({
        message: error?.message,
        actions: [
          {text: 'cancel', onPress: () => {}},
          {
            text: 'ok',
            onPress: openSettings,
          },
        ],
      });
    }
  } catch (errors) {}
};

const getImageFromPicker = async (options = {}) => {
  try {
    const response = await ImagePicker.openPicker({
      ...DEFAULT_PICKER_OPTION,
      ...options,
      smartAlbums: ['UserLibrary', 'Favorites'],
      compressVideoPreset: 'Passthrough',
    });
    return response;
  } catch (error) {
    getErrorFromPicker(error);
  }
};

const getImageFromCamera = async () => {
  try {
    const response = await ImagePicker.openCamera(DEFAULT_PICKER_OPTION);
    return response;
  } catch (error) {
    getErrorFromCamera(error);
  }
};

const getErrorFromPicker = error => {
  switch (error?.code) {
    case 'E_NO_LIBRARY_PERMISSION':
      requestPermission(error, PICKER_METHOD.PHOTO);
      break;
    case 'E_PICKER_CANCELLED':
      break;
    default:
      showSystemAlert({
        message: error?.message,
      });
      break;
  }
};

const getErrorFromCamera = async error => {
  await requestPermission(error, PICKER_METHOD.CAMERA);
  switch (error.code) {
    case 'E_NO_CAMERA_PERMISSION':
      requestPermission(error, PICKER_METHOD.CAMERA);
      break;
    default:
      showSystemAlert({
        message: error?.message,
      });
      break;
  }
};

export const validateBeforeUploading = ({
  uploadFn,
  pickerResponse,
  validateEnabled = false,
  customAlert,
}) => {
  if (!pickerResponse) {
    return;
  }
  if (validateEnabled) {
    if (
      roundByteToMB(pickerResponse.size) >= getMaxSize(pickerResponse).maxSize
    ) {
      if (customAlert) {
        customAlert(getMaxSize(pickerResponse).errorMessage);
        return;
      } else {
        return showSystemAlert({
          message: i18next.t(getMaxSize(pickerResponse).errorMessage),
        });
      }
    }

    uploadFn?.(pickerResponse);
    return;
  }
  uploadFn?.(pickerResponse);
};

const useMediaPicker = (resultCallback = () => {}) => {
  const pickImage = async (options = {}) => {
    try {
      const response = await getImageFromPicker(options);
      validateBeforeUploading({
        options,
        validateEnabled: options?.validateEnabled,
        customAlert: options?.customAlert,
        pickerResponse: response,
        uploadFn: async () => {
          // Dùng formData mới có thể pick file được
          const formData = new FormData();
          formData.append('image', {
            uri: response?.path,
            name: response?.path,
            type: response.mime,
          });
          //  handle upload
          const result = await uploadFileApi(formData);
          resultCallback?.(result);
          return result;
        },
      });
    } catch (error) {
      getErrorFromPicker(error);
    }
  };

  const openCamera = async (options = {}) => {
    try {
      const response = await getImageFromCamera();

      validateBeforeUploading({
        pickerResponse: response,
        validateEnabled: options?.validateEnabled,
        uploadFn: async () => {
          // Dùng formData mới có thể pick file được
          const formData = new FormData();
          formData.append('image', {
            uri: response?.path,
            name: response?.path,
            type: response.mime,
          });
          //  handle upload
          const result = await uploadFileApi(formData);
          resultCallback?.(result);
          return result;
        },
      });
    } catch (error) {
      getErrorFromCamera(error);
    }
  };

  const showImagePickerOptions = (options = {}) => {
    const PICKER_OPTIONS = [
      {id: 1, label: 'Take a Photo'},
      {id: 2, label: 'Choose From Library'},
    ];

    return showMenuOptions({
      data: {
        items: PICKER_OPTIONS,
        title: 'Select your option',
        selectedId: 0,
      },
      onSelectItem: index => {
        switch (index) {
          case 0:
            openCamera(options);
            break;
          case 1:
            pickImage(options);
            break;
          default:
            break;
        }
      },
    });
  };

  return {
    pickImage,
    openCamera,
    showImagePickerOptions,
  };
};

export {useMediaPicker};
