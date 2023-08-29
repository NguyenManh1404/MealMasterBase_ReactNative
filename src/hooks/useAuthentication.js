import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/AuthRedux';
import {IS_ANDROID} from '../utils/constants';

const useAuthentication = () => {
  const dispatch = useDispatch();

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

  //social handlers
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
  };
};

export {useAuthentication};
