import appApi from './appApi';

const AUTHENTICATION_ENDPOINTS = Object.freeze({
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  VERIFY: '/api/auth/verify',
  REQUEST_CODE_VERIFY_EMAIL: '/api/auth/requestCodeVerifyEmail',
  RESET_PASSWORD: '/api/auth/reset-password',
  GET_AUTH: '/api/auth/getAuth',
  EDIT_PROFILE: '/api/user/edit_profile',
});

const loginByEmailApi = async data => {
  // email, password
  return appApi.post(AUTHENTICATION_ENDPOINTS.LOGIN, data);
};

const registerAccountApi = async data => {
  // firstName, lastName, email, password
  return appApi.post(AUTHENTICATION_ENDPOINTS.REGISTER, data);
};

const verifyEmailApi = async data => {
  //  email, emailVerificationCode
  return appApi.post(AUTHENTICATION_ENDPOINTS.VERIFY, data);
};

const requestCodeVerifyEmailApi = async data => {
  //  email,
  return appApi.post(AUTHENTICATION_ENDPOINTS.REQUEST_CODE_VERIFY_EMAIL, data);
};

const resetPasswordApi = async data => {
  //  email, password, confirmPassword
  return appApi.post(AUTHENTICATION_ENDPOINTS.RESET_PASSWORD, data);
};

const getAuthApi = async data => {
  //  email, password, confirmPassword
  return appApi.get(AUTHENTICATION_ENDPOINTS.GET_AUTH, data);
};

const editProfileApi = async data => {
  //"firstName" "lastName""avatar" "phoneNumber"

  return appApi.put(AUTHENTICATION_ENDPOINTS.EDIT_PROFILE, data);
};

export {
  AUTHENTICATION_ENDPOINTS,
  editProfileApi,
  getAuthApi,
  loginByEmailApi,
  registerAccountApi,
  requestCodeVerifyEmailApi,
  resetPasswordApi,
  verifyEmailApi,
};
