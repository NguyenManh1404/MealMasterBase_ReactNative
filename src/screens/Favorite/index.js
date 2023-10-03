import {useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonQueryDetailFunction} from '../../api/appApi';
import {FAVORITE_ENDPOINTS} from '../../api/favorite';
import {SafeAreaContainer, Text} from '../../components';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import FavoriteCard from './components/FavoriteCard';

const FavoriteScreen = () => {
  const {
    data: listFavorites,
    isFetching: isFetchingFavorite,
    isLoading,
  } = useQuery({
    queryKey: [{url: FAVORITE_ENDPOINTS.LIST_FAVORITE}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.recipes;
    },
  });
  const queryClient = useQueryClient();

  useRefreshOnFocus(() => {
    queryClient.invalidateQueries({
      queryKey: [{url: FAVORITE_ENDPOINTS.LIST_FAVORITE}],
    });
  });
  const renderItem = ({item, index}) => {
    return <FavoriteCard item={item} key={index} />;
  };
  return (
    <SafeAreaContainer loading={isLoading}>
      <View style={styles.container}>
        <Text type="bold-20">My Favorite</Text>
        <FlatList
          data={listFavorites}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(__, index) => `${index}`}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
