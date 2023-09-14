// import React from 'react';
// import {TouchableOpacity} from 'react-native';
// import {shallow} from 'zustand/shallow';
// import WSafeAreaView from '../../components/SafeAreaContainer';
// import Text from '../../components/Text';
// import {useStore} from '../../zustand';

// const FavoriteScreen = () => {
//   const {number, counterNumber} = useStore(
//     state => ({
//       number: state.number,
//       counterNumber: state.counterNumber,
//     }),
//     shallow,
//   );

//   const increaseNumber = () => {
//     counterNumber(number + 1);
//   };
//   return (
//     <WSafeAreaView>
//       <Text>FavoriteScree{number}</Text>
//       <TouchableOpacity onPress={increaseNumber}>
//         <Text>Count</Text>
//       </TouchableOpacity>
//     </WSafeAreaView>
//   );
// };

// export default FavoriteScreen;

// // const styles = StyleSheet.create({});

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
