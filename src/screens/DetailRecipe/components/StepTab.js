import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonQueryDetailFunction} from '../../../api/appApi';
import {HOME_ENDPOINTS} from '../../../api/home';
import {Text} from '../../../components';
import RecentRecipe from '../../Home/components/RecentRecipe';
import StepsCard from './StepsCard';

const StepTab = ({data, updateTabHeight}) => {
  const {data: listRecipeRecent} = useQuery({
    queryKey: [{url: HOME_ENDPOINTS.RECENT}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.recipes;
    },
  });

  const renderRecentItem = ({item, index}) => {
    return (
      <RecentRecipe
        id={item?._id}
        key={index}
        name={item?.name}
        images={item?.images}
        creatorName={item?.creatorName}
      />
    );
  };

  return (
    <View onLayout={updateTabHeight}>
      <View>
        {data?.steps.map((step, index) => {
          return (
            <StepsCard
              number={step?.number}
              content={step?.content}
              key={index}
            />
          );
        })}
      </View>
      <View>
        <Text style={styles.TEXT1} type="bold-16">
          Recent recipes
        </Text>

        <FlatList
          data={listRecipeRecent}
          renderItem={renderRecentItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(__, index) => `${index}`}
        />
      </View>
    </View>
  );
};

export default StepTab;

const styles = StyleSheet.create({
  TEXT1: {
    marginTop: 20,
    marginBottom: 10,
  },
});
