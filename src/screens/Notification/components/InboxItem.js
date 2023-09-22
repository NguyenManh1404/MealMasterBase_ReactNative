import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
import {getRandomColorHex} from '../../../utils/helpers';

// const getRandomColorHe = getRandomColorHex();

function formatRelativeTime(isoDate) {
  const currentDate = new Date();
  const date = new Date(isoDate);
  const timeDifference = currentDate - date;
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return secondsDifference + ' seconds ago';
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return minutes + (minutes === 1 ? ' minute' : ' minutes') + ' ago';
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return hours + (hours === 1 ? ' hour' : ' hours') + ' ago';
  } else {
    const days = Math.floor(secondsDifference / 86400);
    return days + (days === 1 ? ' day' : ' days') + ' ago';
  }
}

const InboxItem = ({item}) => {
  const {navigate} = useNavigation();

  const navigateToChat = () => {
    navigate('ChatScreen', {
      idUserReceive: item?.idUserReceive,
    });
  };
  return (
    <TouchableOpacity style={styles.inboxItem} onPress={navigateToChat}>
      <View>
        {item?.otherUserAvatar ? (
          <Image
            source={{
              uri: `${Config.BASE_URL_API}/public/${item?.otherUserAvatar}`,
            }}
            style={styles.avatarImage}
          />
        ) : (
          <View
            style={[
              styles.defaultAvatar,
              {backgroundColor: getRandomColorHex()},
            ]}>
            <Text type={'bold-20'} color={APP_COLORS.white}>
              {item?.otherUserFullName?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.inboxContent}>
        <View style={styles.titleInbox}>
          <Text type="bold-14">{item?.otherUserFullName}</Text>
          <View style={styles.viewTimeSent}>
            <Text color={APP_COLORS.gray} style={styles.timeCreate}>
              {formatRelativeTime(item?.timeCreate)}
            </Text>
            <Icon name="bell" size={20} color={APP_COLORS.error} solid />
          </View>
        </View>

        <View style={styles.desInbox}>
          <Text color={APP_COLORS.gray} style={styles.textDes}>
            {item?.lastMessage?.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InboxItem;

const styles = StyleSheet.create({
  inboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: APP_COLORS.white,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  titleInbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewTimeSent: {
    flexDirection: 'row',
  },
  timeCreate: {
    marginRight: 10,
  },
  textDes: {
    // flex: 1,
  },
  inboxContent: {
    flex: 1,
    marginLeft: 10,
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  defaultAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.blue,
  },
});
