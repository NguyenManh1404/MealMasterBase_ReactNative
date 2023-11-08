import notifee, {
  AndroidBadgeIconType,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {IS_ANDROID} from '../utils/constants';
import {showSystemAlert} from '../utils/helpers';

export const SHOULD_REQUEST_NOTIFICATION_ANDROID =
  IS_ANDROID && Platform.Version >= 33;

const NOTIFICATION_APPROVED_STATUSES = [
  messaging.AuthorizationStatus.AUTHORIZED,
];

const requestNotificationPermission = async ({
  successCallback = () => {},
  failureCallback = () => {},
}) => {
  try {
    // only request notification on android version 33+
    // for android < 33, you do not need to request user permission
    if (SHOULD_REQUEST_NOTIFICATION_ANDROID) {
      const requestAndroidResult = await request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );

      if (requestAndroidResult === RESULTS.GRANTED) {
        successCallback?.();
      } else {
        failureCallback?.();
      }
      return requestAndroidResult === RESULTS.GRANTED;
    }

    const notificationStatus = await messaging().requestPermission({
      provisional: false,
    });

    const isGranted =
      NOTIFICATION_APPROVED_STATUSES.includes(notificationStatus);

    if (isGranted) {
      successCallback?.();
    } else {
      failureCallback?.();
    }
    return isGranted;
  } catch (error) {
    return showSystemAlert({
      message: error,
      actions: [
        {text: 'cancel', onPress: () => {}},
        {
          text: 'ok',
          onPress: openSettings,
        },
      ],
    });
  }
};

const checkNotificationPermission = async () => {
  try {
    if (SHOULD_REQUEST_NOTIFICATION_ANDROID) {
      const android33AuthStatus = await check(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      return android33AuthStatus === RESULTS.GRANTED;
    }

    const notificationStatus = await messaging().hasPermission();

    const isGranted =
      NOTIFICATION_APPROVED_STATUSES.includes(notificationStatus);

    return isGranted;
  } catch (error) {}
};

const displayNotification = async ({
  id,
  title,
  body,
  data,
  androidImage,
} = {}) => {
  try {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const attachments = data?.fcm_options?.image
      ? [
          {
            url: data?.fcm_options?.image,
          },
        ]
      : [];

    const androidConfig = {
      channelId,
      badgeIconType: AndroidBadgeIconType.LARGE,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    };

    const officialAndroidConfig = androidImage
      ? {
          ...androidConfig,
          largeIcon: androidImage,
        }
      : androidConfig;

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      data,
      id,
      ios: {
        attachments,
      },
      android: officialAndroidConfig,
    });
  } catch (error) {}
};

const useNotification = () => {};

export {
  checkNotificationPermission,
  displayNotification,
  requestNotificationPermission,
  useNotification,
};
