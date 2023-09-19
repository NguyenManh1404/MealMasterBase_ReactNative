import messaging, {firebase} from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';
import {SafeAreaContainer} from '../../components';
import {IS_IOS} from '../../utils/constants';
import {showSystemAlert} from '../../utils/helpers';

const requestUserPermission = async () => {
  if (IS_IOS) {
    await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
    await messaging().setAPNSToken('DZ2SYPB6FV');
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // eslint-disable-next-line no-console
      console.log('Authorization status:', authStatus);
    }
  } else {
    try {
      const response = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if (
        [RESULTS.BLOCKED, RESULTS.UNAVAILABLE, RESULTS.DENIED].includes(
          response,
        )
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
  }
};

export const getToken = async () => {
  try {
    const deviceToken = await messaging().getToken();
    await console.log(
      '🚀 ~ file: index.js:20 ~ getToken ~ deviceToken:',
      deviceToken,
    );
    return deviceToken;
    // eslint-disable-next-line no-console
    // console.log('🚀 ~ file: index.js:18 ~ getToken ~ deviceToken:', deviceToken);
  } catch (error) {
    console.log('🚀 ~ file: index.js:29 ~ getToken ~ error:', error);
  }
};

const NotificationScreen = () => {
  useEffect(() => {
    requestUserPermission();
    firebase.messaging().registerDeviceForRemoteMessages();
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaContainer>
      <Text>Notification</Text>
    </SafeAreaContainer>
  );
};

export default NotificationScreen;

// const styles = StyleSheet.create({});
