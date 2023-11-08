import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
const RecentRecipe = ({id, name, images, creatorName}) => {
  const {navigate} = useNavigation();

  const onPressCard = () => {
    navigate('DetailRecipe', {id});
  };
  return (
    <View style={styles.recentRecipeView}>
      <TouchableOpacity onPress={onPressCard}>
        <Image
          source={{
            uri: `${Config.BASE_URL_API}/public/${images[0]}`,
          }}
          style={styles.imageCardRecentView}
        />
        <View style={styles.titleCardView}>
          <Text style={styles.titleCard} numberOfLines={2} type={'bold-16'}>
            {name}
          </Text>
        </View>
        <Text style={styles.titleCard} color={APP_COLORS.greyText}>
          {creatorName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecentRecipe;

const styles = StyleSheet.create({
  imageCardRecentView: {
    height: 124,
    width: 124,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  recentRecipeView: {
    width: 150,
    marginRight: 16,
    backgroundColor: APP_COLORS.white,
    padding: 10,
    borderRadius: 5,
  },
});
