import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {
  loginByEmailApi,
  registerAccountApi,
  requestCodeVerifyEmailApi,
  resetPasswordApi,
  verifyEmailApi,
} from '../api/auth';
import {setUser} from '../redux/AuthRedux';
import {IS_ANDROID} from '../utils/constants';
import {showSystemAlert} from '../utils/helpers';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const {mutateAsync: registerAccount, isLoading: registerAccountLoading} =
    useMutation(registerAccountApi, {
      onSuccess: ({email}) => {
        navigate('VerifyAccount', {email});
      },
      onError: error => {
        showSystemAlert({
          message: JSON.stringify(error.errors[0].message),
        });
      },
    });

  const {mutateAsync: verifyEmail, isLoading: verifyEmailLoading} = useMutation(
    verifyEmailApi,
    {
      onSuccess: ({data}) => {
        if (data?.isFromForgotPassword) {
          navigate('ResetPassword', {email: data?.user?.email});
        } else {
          navigate('Login', {email: data?.user?.email});
        }
      },
      onError: error => {
        showSystemAlert({
          message: JSON.stringify(error.errors[0].message),
        });
      },
    },
  );

  const {mutateAsync: loginByEmail, isLoading: loginByEmailLoading} =
    useMutation(loginByEmailApi, {
      onSuccess: res => {
        dispatch(setUser(res?.user));
      },
      onError: (error, {email}) => {
        if (error?.messageCode === 'UNVERIFIED_EMAIL') {
          navigate('VerifyAccount', {
            email,
          });
          return;
        }
        showSystemAlert({
          message: JSON.stringify(error.errors[0].message),
        });
      },
    });

  const {
    mutateAsync: requestCodeVerifyEmail,
    isLoading: requestCodeVerifyEmailLoading,
  } = useMutation(requestCodeVerifyEmailApi, {
    onSuccess: res => {
      navigate('VerifyAccount', {
        email: res?.email,
        isFromForgotPassword: true,
      });
    },
    onError: error => {
      showSystemAlert({
        message: JSON.stringify(error.errors[0].message),
      });
    },
  });

  const {mutateAsync: resetPassword, isLoading: resetPasswordLoading} =
    useMutation(resetPasswordApi, {
      onSuccess: ({data}) => {
        navigate('Login', {email: data?.user?.email});
      },
      onError: error => {
        showSystemAlert({
          message: JSON.stringify(error.errors[0].message),
        });
      },
    });

  //social handlers
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: IS_ANDROID
        ? '477539628331-8pevs43qbagoil1ntjesinnq7vfqs9pj.apps.googleusercontent.com'
        : '785576828659-j8ng15fk4ek7iae8q9oc5bkaddrhk9rt.apps.googleusercontent.com',
      iosClientId:
        '785576828659-j8ng15fk4ek7iae8q9oc5bkaddrhk9rt.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      //profileImageSize: 150,
    });
  }, []);

  const loginFacebook = async () => {
    try {
      LoginManager.logOut();

      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result) {
        if (result.isCancelled) {
        } else {
          const tokenResponse = await AccessToken.getCurrentAccessToken();
          if (tokenResponse) {
            Profile.getCurrentProfile().then(function (currentProfile) {
              dispatch(
                setUser({
                  firstName: currentProfile.firstName,
                  facebookId: currentProfile.userID,
                  lastName: currentProfile.lastName,
                  avatar: currentProfile.imageURL,
                  email: currentProfile.email,
                }),
              );
            });
          }
        }
      }
    } catch (error) {}
  };

  const loginGoogle = async () => {
    try {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();

      if (googleUserInfo) {
        dispatch(
          setUser({
            firstName: googleUserInfo?.user.name,
            googleId: googleUserInfo?.user.id,
            avatar: googleUserInfo?.user?.photo,
            email: googleUserInfo.user?.email,
          }),
        );
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.IN_PROGRESS:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          break;
        case statusCodes.SIGN_IN_REQUIRED:
          break;
        default:
          break;
      }
    }
  };

  return {
    loginFacebook,
    loginGoogle,
    loginByEmail,
    registerAccount,
    verifyEmail,
    requestCodeVerifyEmail,
    resetPassword,
    verifyEmailLoading,
    registerAccountLoading,
    loginByEmailLoading,
    requestCodeVerifyEmailLoading,
    resetPasswordLoading,
  };
};

export {useAuthentication};
