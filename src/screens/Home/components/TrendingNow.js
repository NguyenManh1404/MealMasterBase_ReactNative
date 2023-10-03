import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {LocalImage, Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
import {
  checkValidYoutubeLink,
  getRandomColorHex,
  getYouTubeThumbnail,
  handleOpenLink,
} from '../../../utils/helpers';

const getRandomColorHe = getRandomColorHex();

const TrendingNow = ({
  id,
  name,
  images,
  isFavorite,
  count,
  linkVideo,
  authorFirstName,
  authorAvatar,
}) => {
  const {navigate} = useNavigation();
  const [isHeart, setIsHeart] = useState(isFavorite);
  const onChangeHeart = () => {
    setIsHeart(!isHeart);
  };

  const onVideoPress = () => {
    if (checkValidYoutubeLink(linkVideo)) {
      handleOpenLink({link: linkVideo});
    } else {
      return;
    }
  };

  const onPressCard = () => {
    navigate('DetailRecipe', {id});
  };
  return (
    <View style={styles.trendingCardView}>
      <TouchableOpacity onPress={onPressCard}>
        <Image
          source={{
            uri: getYouTubeThumbnail(linkVideo),
          }}
          style={styles.imageCard}
        />
        <View style={styles.ratingView}>
          <LocalImage
            imageKey={'icStar'}
            style={styles.icStar}
            tintColor={'yellow'}
          />
          <Text
            style={styles.numberRating}
            color={APP_COLORS.white}
            type="bold-14">
            {count}
          </Text>
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
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.playButtonView}
        onPress={() => onVideoPress()}>
        <LocalImage imageKey={'icPlayButton'} style={styles.icPlayButton} />
      </TouchableOpacity>
      <View style={styles.titleCardView}>
        <Text style={styles.titleCard} type={'bold-16'} numberOfLines={2}>
          {name}
        </Text>
      </View>
      <View style={styles.authorCardView}>
        {authorAvatar ? (
          <Image
            source={{
              uri: `${Config.BASE_URL_API}/public/${authorAvatar}`,
            }}
            style={styles.avatarAuthor}
          />
        ) : (
          <View
            style={[styles.avatarAuthor, {backgroundColor: getRandomColorHe}]}>
            <Text type={'bold-20'} color={APP_COLORS.white}>
              {authorFirstName?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.titleCard} color={APP_COLORS.greyL2}>
          {authorFirstName}
        </Text>
      </View>
    </View>
  );
};

export default TrendingNow;

const styles = StyleSheet.create({
  authorCardView: {
    flexDirection: 'row',
    alignItems: 'center',
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
  icStar: {
    width: 16,
    height: 16,
  },
  ratingView: {
    position: 'absolute',
    height: 28,
    width: 58,
    backgroundColor: APP_COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    left: 8,
    top: 8,
    borderRadius: 8,
  },
  trendingCardView: {
    width: 280,
    height: 190,
    borderRadius: 10,
    marginRight: 20,
  },

  avatarAuthor: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    width: 280,
    height: 180,
    borderRadius: 10,
  },
  playButtonView: {
    position: 'absolute',
    top: 70,
    right: 115,
  },
  icPlayButton: {
    height: 48,
    width: 48,
  },
  titleCardView: {
    padding: 5,
  },
});
