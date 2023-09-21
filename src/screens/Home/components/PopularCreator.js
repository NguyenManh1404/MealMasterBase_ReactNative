import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
import {getRandomColorHex} from '../../../utils/helpers';
const getRandomColorHe = getRandomColorHex() || 'black';
const PopularCreator = ({item}) => {
  const {navigate} = useNavigation();

  const navigateToChat = () => {
    navigate('ChatScreen', {
      idUserReceive: item?._id,
    });
  };
  return (
    <TouchableOpacity
      style={styles.popularCreatorsCardView}
      onPress={navigateToChat}>
      {item?.avatar ? (
        <Image
          source={{
            uri: `${Config.BASE_URL_API}/public/${item?.avatar}`,
          }}
          style={styles.imageAvatarChef}
        />
      ) : (
        <View
          style={[
            styles.avatarAuthor,
            styles.imageAvatarChef,
            {backgroundColor: getRandomColorHe},
          ]}>
          <Text type={'bold-20'} color={APP_COLORS.white}>
            {item.firstName?.charAt(0)?.toUpperCase()}
          </Text>
        </View>
      )}

      <View style={styles.titleCardView}>
        <Text style={styles.titleCard} numberOfLines={2} type={'bold-16'}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularCreator;

const styles = StyleSheet.create({
  popularCreatorsCardView: {
    width: 75,
    alignItems: 'center',
    marginRight: 16,
  },
  imageAvatarChef: {
    width: 75,
    height: 75,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCardView: {
    marginVertical: 6,
  },
});
