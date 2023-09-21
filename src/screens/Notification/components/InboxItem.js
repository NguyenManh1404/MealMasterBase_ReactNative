import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';

const InboxItem = () => {
  return (
    <View style={styles.inboxItem}>
      <View>
        <Image
          source={{
            uri: 'https://picsum.photos/700',
          }}
          style={styles.avatarImage}
        />
      </View>

      <View style={styles.inboxContent}>
        <View style={styles.titleInbox}>
          <Text type="bold-14">Hồ Văn Tảo</Text>
          <View style={styles.viewTimeSent}>
            <Text color={APP_COLORS.gray}>16 Minutes ago</Text>
            <Icon name="bell" size={20} color={APP_COLORS.error} solid />
          </View>
        </View>

        <View style={styles.desInbox}>
          <Text color={APP_COLORS.gray} style={styles.textDes}>
            Ngay mai anh đi mua siêu xe, em có muốn đi mua con xịn hơn ko?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InboxItem;

const styles = StyleSheet.create({
  inboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: APP_COLORS.backGroundPrimary,
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
});
