import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {commonQueryDetailFunction} from '../../../api/appApi';
import {RECIPE} from '../../../api/recipe';
import YourRecipeItem from './YourRecipeItem';

const YourRecipes = ({updateTabHeight}) => {
  const {data: listRecipeRecent} = useQuery({
    queryKey: [{url: RECIPE.GET_RECIPE_CURRENT_USER}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.data;
    },
  });

  return (
    <View onLayout={updateTabHeight} style={styles.container}>
      {listRecipeRecent?.map((item, index) => {
        return <YourRecipeItem item={item} key={index} />;
      })}
    </View>
  );
};

export default YourRecipes;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
