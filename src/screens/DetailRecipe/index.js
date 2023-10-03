import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {commonQueryDetailFunction} from '../../api/appApi';
import {FAVORITE_ENDPOINTS, addFavorite, unFavorite} from '../../api/favorite';
import {RECIPE} from '../../api/recipe';
import {LocalImage, SafeAreaContainer, Text} from '../../components';
import {ROUTE_NAMES} from '../../navigation/routes';
import {APP_COLORS} from '../../themes/colors';
import {SCREEN_WIDTH} from '../../utils/constants';
import {
  checkValidYoutubeLink,
  getYouTubeThumbnail,
  handleOpenLink,
  isEmpty,
  showSystemAlert,
} from '../../utils/helpers';
import DetailRecipeTabView from './DetailRecipeTabView';

const DetailRecipe = () => {
  const route = useRoute();
  const {id} = route.params || {};

  const {goBack, navigate} = useNavigation();
  const queryClient = useQueryClient();

  const {data: recipeInfoData, isFetching: isFetchingDetail} = useQuery({
    queryKey: [{url: RECIPE.DETAIL.replace('ID', id)}],
    queryFn: commonQueryDetailFunction,
    onSuccess: res => {
      setIsHeart(res?.isFavorite);
    },
    cacheTime: 0,
    enabled: true,
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

  const recipeInfo = recipeInfoData?.recipe[0];

  const displayedImages = recipeInfo?.images.slice(0, 3);
  const [isHeart, setIsHeart] = useState(recipeInfo?.isFavorite);
  const onChangeHeart = () => {
    setIsHeart(!isHeart);
    if (isHeart === false) {
      addFavoriteMutate({id});
    } else {
      unFavoriteMutate({id});
    }
  };

  const onVideoPress = () => {
    if (checkValidYoutubeLink(recipeInfo?.linkVideo)) {
      handleOpenLink({link: recipeInfo?.linkVideo});
    } else {
      return;
    }
  };

  const onPressImage = index => () => {
    navigate(ROUTE_NAMES.ViewImage, {
      data: recipeInfo?.images,
      defaultIndex: index,
    });
  };

  return (
    <SafeAreaContainer loading={isFetchingDetail}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.viewBackIcon} onPress={goBack}>
          <LocalImage
            imageKey={'icCaretLeftx24'}
            style={styles.backIconLogin}
          />
        </TouchableOpacity>
        <Text type="bold-16">Your Message</Text>
        <View />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.flexGrow}>
        <View style={styles.videoView}>
          <Image
            source={{
              uri: getYouTubeThumbnail(recipeInfo?.linkVideo),
            }}
            style={styles.videoImage}
          />
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
          <TouchableOpacity
            style={styles.playButtonView}
            onPress={() => onVideoPress()}>
            <LocalImage imageKey={'icPlayButton'} style={styles.icPlayButton} />
          </TouchableOpacity>
        </View>
        {!isEmpty(recipeInfo?.images) && (
          <View style={styles.viewAddImage}>
            {displayedImages?.map((image, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.imageItem}
                  onPress={onPressImage(index)}>
                  <Image
                    source={{
                      uri: `${Config.BASE_URL_API}/public/${image}`,
                    }}
                    style={styles.imageFood}
                  />
                  {index === 2 && (
                    <View style={styles.viewNumberMoreImage}>
                      <Text type="bold-24" color={APP_COLORS.white}>
                        {recipeInfo?.images.length - 3} +
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <Text type="bold-20" numberOfLines={2}>
          {recipeInfo?.name}
        </Text>
        <DetailRecipeTabView recipeInfo={recipeInfo} />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default DetailRecipe;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 700,
  },
  flexGrow: {flexGrow: 1},
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIconLogin: {width: 26, height: 26},
  videoImage: {
    width: SCREEN_WIDTH - 40,
    height: 185,
    borderRadius: 20,
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

  playButtonView: {
    position: 'absolute',
    top: 70,
    right: 150,
  },
  icPlayButton: {
    height: 48,
    width: 48,
  },
  imageFood: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  imageItem: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  viewAddImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: APP_COLORS.white,
    marginVertical: 10,
  },
  viewNumberMoreImage: {
    position: 'absolute',
    height: 100,
    width: 100,
    backgroundColor: APP_COLORS.modalFadeModify,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
