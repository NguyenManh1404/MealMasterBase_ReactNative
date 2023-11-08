/**
 * @format
 */

import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const onMessageReceived = async message => {
  const {title, body} = message.data;
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      timestamp: Date.now(),
      showTimestamp: true,
    },
  });
};

messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async ({detail}) => {
  //console.log('🚀 ~ file: index.js:40 ~ detail:', detail);
});

AppRegistry.registerComponent(appName, () => App);
