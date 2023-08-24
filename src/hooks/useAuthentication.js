import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/AuthRedux';

const useAuthentication = () => {
  const dispatch = useDispatch();
  //social handlers
  const loginFacebook = async () => {
    console.log('vao day');
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
              console.log(
                '🚀 ~ file: useAuthentication.js:21 ~ currentProfile:',
                currentProfile,
              );

              dispatch(
                setUser({
                  firstName: currentProfile.firstName,
                  facebookId: currentProfile.userID,
                  lastName: currentProfile.lastName,
                  avatar: currentProfile.imageURL,
                  email: currentProfile.email,
                }),
              );
              //   updateUserInfo({
              //     firstName: currentProfile.firstName,
              //     lastName: currentProfile.lastName,
              //     avatar: currentProfile.imageURL,
              //   });
            });
            // await loginFacebookMutation(tokenResponse.accessToken);
          }
        }
      }
    } catch (error) {}
  };
  return {
    loginFacebook,
  };
};

export {useAuthentication};
