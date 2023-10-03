import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RECIPE, deleteRecipeByID} from '../../../api/recipe';
import {Text} from '../../../components';
import {ROUTE_NAMES} from '../../../navigation/routes';
import {APP_COLORS} from '../../../themes/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utils/constants';
import {showSystemAlert} from '../../../utils/helpers';

const YourRecipeItem = ({item}) => {
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  const onPressCard = () => {
    navigate(ROUTE_NAMES.DetailRecipe, {id: item?._id});
  };

  const onEdit = () => {
    navigate(ROUTE_NAMES.EditRecipe, {data: item});
  };

  const {mutateAsync: deleteRecipe, isLoading: deleteRecipeLoading} =
    useMutation(deleteRecipeByID, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [{url: RECIPE.GET_RECIPE_CURRENT_USER}],
        });
      },
      onError: error => {
        showSystemAlert({
          message: error,
        });
      },
    });

  const onDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete', [
      {
        text: 'Cancel',
        // eslint-disable-next-line no-console
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteRecipe(item?._id);
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.yourRecipeItem} onPress={onPressCard}>
      <Image
        source={{
          uri: `${Config.BASE_URL_API}/public/${item?.images[0]}`,
        }}
        style={styles.imageYourRecipeItem}
      />

      <View style={styles.viewEditDelete}>
        <TouchableOpacity onPress={onEdit}>
          <Icon
            name="edit"
            size={16}
            color={APP_COLORS.primary}
            solid
            style={styles.imageSocial}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon
            name="trash"
            size={16}
            color={APP_COLORS.error}
            solid
            style={styles.imageSocial}
          />
        </TouchableOpacity>
      </View>

      <Text
        color={APP_COLORS.white}
        style={styles.nameYourRecipe}
        type="bold-18"
        numberOfLines={2}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default YourRecipeItem;

const styles = StyleSheet.create({
  yourRecipeItem: {
    width: SCREEN_WIDTH / 2 - 30,
    margin: 10,
  },
  imageYourRecipeItem: {
    width: SCREEN_WIDTH / 2 - 30,
    borderRadius: 20,
    height: SCREEN_HEIGHT / 3,
  },
  nameYourRecipe: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  viewEditDelete: {
    position: 'absolute',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    margin: 20,
    paddingHorizontal: 10,
  },
  imageSocial: {
    marginHorizontal: 2,
  },
});
