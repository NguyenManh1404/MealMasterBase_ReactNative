import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {FAVORITE_ENDPOINTS, unFavorite} from '../../../api/favorite';
import {LocalImage, Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {showSystemAlert} from '../../../utils/helpers';

const FavoriteCard = ({item}) => {
  const {name, images, _id} = item;
  const {navigate} = useNavigation();
  const [isHeart, setIsHeart] = useState(true);
  const queryClient = useQueryClient();

  const onChangeHeart = () => {
    if (isHeart) {
      unFavoriteMutate({id: _id});
    }
    setIsHeart(!isHeart);
  };

  const {mutateAsync: unFavoriteMutate} = useMutation(unFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries([{url: FAVORITE_ENDPOINTS.LIST_FAVORITE}]);
    },
    onError: error => {
      showSystemAlert({
        message: JSON.stringify(error.error),
      });
    },
  });
  return (
    <TouchableOpacity
      style={styles.viewCard}
      onPress={() => {
        navigate('DetailRecipe', {id: item._id});
      }}>
      <Image
        source={{
          uri: `${Config.BASE_URL_API}/public/${images[0]}`,
        }}
        style={styles.imgCardViewAll}
      />
      <TouchableOpacity style={styles.favoriteView} onPress={onChangeHeart}>
        <LocalImage
          imageKey={'icHeartCardActive'}
          style={styles.icHeartCardActive}
        />
      </TouchableOpacity>

      <View style={styles.viewTitle}>
        <Text type={'bold-20'} color={APP_COLORS.white} numberOfLines={3}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  imgCardViewAll: {
    width: SCREEN_WIDTH - 40,
    height: 209,
    borderRadius: 10,
  },
  viewCard: {
    marginBottom: 24,
  },
  viewTitle: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  favoriteView: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: APP_COLORS.white,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  icHeartCardActive: {
    width: 13,
    height: 13,
  },
});
