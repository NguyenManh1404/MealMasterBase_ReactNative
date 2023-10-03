import messaging from '@react-native-firebase/messaging';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonQueryDetailFunction} from '../../api/appApi';
import {CHAT} from '../../api/chat';
import {SafeAreaContainer, Text} from '../../components';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import InboxItem from './components/InboxItem';

const NotificationScreen = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      refetch();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: listChats,
    isLoading: isFetchingListChats,
    refetch,
  } = useQuery({
    queryKey: [{url: CHAT.GET_ALL_LIST_CHAT}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res?.data;
    },
    // refetchInterval: 5000,
  });

  useRefreshOnFocus(() => {
    refetch();
  });

  const renderItem = ({item, index}) => {
    return <InboxItem item={item} key={index} />;
  };

  return (
    <SafeAreaContainer loading={isFetchingListChats}>
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
