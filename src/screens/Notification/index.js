import messaging from '@react-native-firebase/messaging';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonQueryDetailFunction} from '../../api/appApi';
import {CHAT} from '../../api/chat';
import {SafeAreaContainer, Text} from '../../components';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import InboxItem from './components/InboxItem';

import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import Config from 'react-native-config';

const NotificationScreen = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await refetch();
      const {messageId, data} = remoteMessage;
      const {title, body, avatarUserSend} = data || {};

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
      });
      //  id, title, body, data, androidImage,
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          largeIcon: `${Config.BASE_URL_API}/public/${avatarUserSend}`,
          timestamp: Date.now(),
          showTimestamp: true,
        },
      });
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data: listChats, refetch} = useQuery({
    queryKey: [{url: CHAT.GET_ALL_LIST_CHAT}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res?.data;
    },
  });

  useRefreshOnFocus(async () => {
    await refetch();
  });

  const renderItem = ({item, index}) => {
    return <InboxItem item={item} key={index} />;
  };

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <Text type="bold-15">Your Mail Box</Text>
      </View>

      <FlatList
        data={listChats || []}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__, index) => `${index}`}
      />
    </SafeAreaContainer>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    padding: 20,
  },
});
