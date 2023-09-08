import appApi from './appApi';

const AUTHENTICATION_ENDPOINTS = Object.freeze({
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  VERIFY: '/api/auth/verify',
  REQUEST_CODE_VERIFY_EMAIL: '/api/auth/requestCodeVerifyEmail',
  RESET_PASSWORD: '/api/auth/reset-password',
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

export {
  loginByEmailApi,
  registerAccountApi,
  requestCodeVerifyEmailApi,
  resetPasswordApi,
  verifyEmailApi,
};
