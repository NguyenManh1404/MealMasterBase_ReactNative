import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList} from 'react-native';
import {commonQueryDetailFunction} from '../../../api/appApi';
import {SafeAreaContainer} from '../../../components';
import PopularCategory from './PopularCategory';

const ListViewPopularCategory = ({route}) => {
  const {url: tabViewUrl} = route || {};

  const queryKeys = [{url: tabViewUrl}];
  const {data: listRecipe, isLoading} = useQuery({
    queryKey: queryKeys,
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.recipes;
    },
    cacheTime: 0,
  });

  const renderItem = ({item, index}) => {
    return (
      <PopularCategory
        id={item?._id}
        key={index}
        name={item?.name}
        images={item?.images}
        cookTime={item?.cookTime}
        isFavorite={item?.isFavorite}
      />
    );
  };
  return (
    <SafeAreaContainer isLoading={isLoading}>
      <FlatList
        data={listRecipe}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(__, index) => `${index}`}
      />
    </SafeAreaContainer>
  );
};

export default ListViewPopularCategory;
