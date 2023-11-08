import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {
  FAVORITE_ENDPOINTS,
  addFavorite,
  unFavorite,
} from '../../../api/favorite';
import {LocalImage, Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
import {showSystemAlert} from '../../../utils/helpers';

const PopularCategory = ({id, name, images, cookTime, isFavorite}) => {
  const {navigate} = useNavigation();
  const [isHeart, setIsHeart] = useState(isFavorite);
  const queryClient = useQueryClient();
  const onChangeHeart = () => {
    setIsHeart(!isHeart);

    if (isHeart === false) {
      addFavoriteMutate({id});
    } else {
      unFavoriteMutate({id});
    }
  };

  const onPressCard = () => {
    navigate('DetailRecipe', {id});
  };

  //call api addFavorite

  const {mutateAsync: addFavoriteMutate} = useMutation(addFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries([{url: FAVORITE_ENDPOINTS.LIST_FAVORITE}]);
    },
    onError: error => {
      showSystemAlert({
        message: JSON.stringify(error.error),
      });
    },
  });

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
    <TouchableOpacity style={styles.cardContainer} onPress={onPressCard}>
      <Image
        source={{
          uri: `${Config.BASE_URL_API}/public/${images[0]}`,
        }}
        style={styles.imagePopularCategory}
      />
      <View style={styles.bodyContent}>
        <Text type={'bold-14'} numberOfLines={2} style={styles.name}>
          {name}
        </Text>

        <View style={styles.bottomContent}>
          <View style={styles.timeView}>
            <Text type={'bold-12'}>Time</Text>
            <Text type={'bold-16'}>{cookTime} Mins</Text>
          </View>
          <TouchableOpacity style={styles.favoriteView} onPress={onChangeHeart}>
            {isHeart ? (
              <LocalImage
                imageKey={'icHeartCardActive'}
                style={styles.icHeartCardActive}
              />
            ) : (
              <LocalImage
                imageKey={'icHeartCard'}
                style={styles.icHeartCardActive}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularCategory;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    padding: 8,
    width: 150,
    marginRight: 16,
  },
  imagePopularCategory: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    zIndex: 1,
    top: 20,
  },
  bodyContent: {
    justifyContent: 'flex-end',
    height: 176,
    width: 150,
    marginTop: 75,
    borderRadius: 12,
    backgroundColor: APP_COLORS.white,
  },
  name: {
    marginBottom: 50,
    marginHorizontal: 5,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  icHeartCardActive: {
    width: 13,
    height: 13,
    zIndex: 1,
  },
  favoriteView: {
    backgroundColor: APP_COLORS.white,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
