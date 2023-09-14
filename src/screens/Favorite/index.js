import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonQueryDetailFunction} from '../../api/appApi';
import {FAVORITE_ENDPOINTS} from '../../api/favorite';
import {SafeAreaContainer, Text} from '../../components';
import FavoriteCard from './components/FavoriteCard';

const FavoriteScreen = () => {
  const {data: listFavorites, isFetching: isFetchingFavorite} = useQuery({
    queryKey: [{url: FAVORITE_ENDPOINTS.LIST_FAVORITE}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.recipes;
    },
  });
  const renderItem = ({item, index}) => {
    return <FavoriteCard item={item} key={index} />;
  };
  return (
    <SafeAreaContainer loading={isFetchingFavorite}>
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
