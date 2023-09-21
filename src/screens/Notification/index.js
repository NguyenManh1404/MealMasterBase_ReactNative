import messaging, {firebase} from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';

import {SafeAreaContainer, Text} from '../../components';
import {IS_IOS} from '../../utils/constants';
import {showSystemAlert} from '../../utils/helpers';
import InboxItem from './components/InboxItem';

const requestUserPermission = async () => {
  if (IS_IOS) {
    await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
    // await messaging().setAPNSToken('sdfghj');
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
    console.log(
      '🚀 ~ file: index.js:18 ~ getToken ~ deviceToken:',
      deviceToken,
    );
    return deviceToken;
    // eslint-disable-next-line no-console
  } catch (error) {}
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

  const data = [1, 43, 5, 56, 78, 89, 890, 0, 7];

  const renderItem = ({item, index}) => {
    return <InboxItem item={item} key={index} />;
  };

  return (
    <SafeAreaContainer>
      <Text type="bold-14">Your Mail Box</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__, index) => `${index}`}
      />
    </SafeAreaContainer>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
